var express = require('express');
var router = express.Router();

/* Sustituido
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

var mongoose = require ('mongoose');
var Article = mongoose.model ('Article');

router.get('/articles', function (req, res, next) {

	//res.end ('Get details of all articles');
	Article.find (function (err, articles) {
		if (err) {
			return res.send (500, err);
		}
		return res.send (articles);
	});
});

router.post('/articles', function (req, res, next) {

	//res.end ('Store the details of submitted article in the database');
	var article = new Article ();

	article.username = req.body.username;
	article.title = req.body.title;
	article.text = req.body.text;

	article.save (function (err, article) {
		if (err) {
			return res.send (500, err);
		}
		return res.json (article);
	})
});

router.get('/articles/:id', function (req, res, next) {

	//res.end ('Get details of article with id: ' + req.params.id);
	Article.findById(req.params.id, function (err, article) {
		if (err)
			res.send (err);
		res.json(article);
	})
});

router.post('/articles/:id', function (req, res, next) {

	res.end ('Store the details of article with id: ' + req.params.id);
});

router.put('/articles/:id', function (req, res, next) {

	res.end ('Update the details of article with id: ' + req.params.id);
});

module.exports = router;
