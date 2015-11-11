/**
 * Created by Zhi_LI on 2015/10/8.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    //console.log(req.body.name);
    res.render('register', { title: 'Register' });
});

module.exports = router;