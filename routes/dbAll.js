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
var masterCollection = 'master';
var phdCollection = 'phd';
console.log('dbAll');
/* GET home page. */
router.get('/', function(req, res, next) {
    //console.log(req);
    //console.log('1111');
    var data = [];

    db.open(function(err, db) {
        if(!err) {
            console.log("db Student are connected");
            dbUtil.selectEle(db, masterCollection,{}, sendData);
        }
    });

    function sendData (data) {
        res.send(data);
        console.log('sent');
        res.end();
        //dbUtil.shutdown();
    }

});

router.post('/', function(req, res, next) {
    //console.log(req.body);
    //console.log(req.body.data);
    var data = req.body.data;
    var editArr = data.editArr;
    var removeArr = data.removeArr;

    db.open(function(err, db) {
        if(!err) {
            console.log("db Student are connected");
            editArr.forEach(function (ele) {
                dbUtil.selectEle(db,dbCollection,ele.data,showData);
                dbUtil.update(db, dbCollection, ele.data, ele.newData)

            });
        }
    });
    function showData (data) {
        console.log(data);
    }
    function sendData (data) {
        res.send(data);
        console.log('post sent');
        res.end();
    }

});

module.exports = router;