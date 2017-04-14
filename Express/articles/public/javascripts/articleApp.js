// Se agrega la dependencia a Route
// Se agrega la dependencia a Resouce
var app = angular.module ('articleApp', ['ngRoute', 'ngResource']);

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

/*
// Crea el servicio
app.factory ('articleService', function ($http) {

	var factory = {};
	factory.getArticles = function () {

		return $http.get ('/api/articles');
	}

	return factory;
});
*/

// Se sustituye $http por $resource
app.factory ('articleService', function ($resource) {

	return $resource('/api/articles');
});

// Se agregó $http para indicar la dependencia
app.controller('mainController', function ($scope, $http, articleService) {

	$scope.articles = [];
	$scope.newArticle = {

		username: '',
		title: '',
		timestamp: ''
	};

	/*
	Operación en memoria
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

	/*
	// Obtiene los artículos insertados
	$http.get ('/api/articles').then (function (response) {

		$scope.articles = response.data;
	});
	*/

	/*
	Se elimina la llamada al servicio que empleaba $http
	articleService.getArticles().then (function(response) {

		$scope.articles = response.data;
	});
	*/

	$scope.articles = articleService.query ();

	// inserta el artículo
	$scope.post = function () {

		$scope.newArticle.timestamp = Date.now ();

		/*
		Se elimina la llamda http al post
		$http.post ('/api/articles', $scope.newArticle).then (function (response) {

			$scope.articles.push (response.data);
			$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};
		});
		*/

		articleService.save ($scope.newArticle, function () {

			$scope.articles.push ($scope.newArticle);
			$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};
		})
	}

});
