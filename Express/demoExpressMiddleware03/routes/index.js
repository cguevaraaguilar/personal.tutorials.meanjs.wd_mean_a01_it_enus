var express = require('express');
var router = express.Router();

router.get ('/product', function (req, res, next) {

	res.end ('Get product list');
});

router.get ('/product/:id', function (req, res, next) {

	res.end ('Get details of product with id: ' + req.params.id);
});

module.exports = router;
