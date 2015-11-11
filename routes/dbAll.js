/**
 * Created by Zhi_LI on 2015/10/28.
 */
var express = require('express');
var router = express.Router();
var dbMongo = require('../lib/dbMongo');
var dbUtil = require('../lib/dbUtil');

var dbAdderss = '10.15.194.25';
var dbName = 'student';

var db = dbMongo(dbAdderss, dbName);
var dbCollection = 'info';

/* GET home page. */
router.get('/', function(req, res, next) {
    //console.log(req);
    //console.log('1111');
    var data = [];

    db.open(function(err, db) {
        if(!err) {
            console.log("db Student are connected");
            dbUtil.selectEle(db, dbCollection,{}, sendData);
        }
    });

    function sendData (data) {
        res.send(data);
        console.log('sent');
        res.end();
    }

});

module.exports = router;