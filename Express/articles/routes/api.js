var express = require('express');
var router = express.Router();

/* Sustituido
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.get('/articles', function (req, res, next) {

	res.end ('Get details of all articles');
});

router.get('/articles/:id', function (req, res, next) {

	res.end ('Get details of article with id: ' + req.params.id);
});

router.post('/articles/:id', function (req, res, next) {

	res.end ('Store the details of article with id: ' + req.params.id);
});

router.put('/articles/:id', function (req, res, next) {

	res.end ('Update the details of article with id: ' + req.params.id);
});

module.exports = router;
