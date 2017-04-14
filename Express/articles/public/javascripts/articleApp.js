// Se indica la referencia a route
var app = angular.module ('articleApp', ['ngRoute']);

// función de proveedor de ruteo
app.config (function ($routeProvider) {
	$routeProvider
		.when ('/', {
			templateUrl: 'main.html',
			controller: 'mainController'
		})
		.when ('/about', {
			templateUrl: "about.html",
			// no hay controlador
		})
});

// Se agregó $http para indicar la dependencia
app.controller('mainController', function ($scope, $http) {

	$scope.articles = [];
	$scope.newArticle = {

		username: '',
		title: '',
		timestamp: ''
	};

	/*
	Quita la operación en memoria
	$scope.post = function () {
		$scope.newArticle.timestamp = Date.now();
		$scope.articles.push ($scope.newArticle);
		$scope.newArticle = {

			username: '',
			title: '',
			timestamp: ''
		};
	};
	*/

	// Obtiene los artículos insertados
	$http.get ('/api/articles').then (function (response) {

		$scope.articles = response.data;
	});

	// inserta el artículo
	$scope.post = function () {

		$scope.newArticle.timestamp = Date.now ();
		$http.post ('/api/articles', $scope.newArticle).then (function (response) {

			$scope.articles.push (response.data);
			$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};
		});
	}

});
