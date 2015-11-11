/**
 * Created by Zhi_LI on 2015/10/28.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express',
        layout: 'admin'
    });
});

module.exports = router;