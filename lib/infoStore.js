/**
 * Created by Zhi_LI on 2015/11/7.
 */

var dbMongo = require('./dbMongo');
var dbUtil = require('./dbUtil');
var excel = require('./parseExcel');
var util = require('./util');
function doStore(db, collectionName, jsonArr, callback) {
    dbUtil.delAll(db, collectionName);

    jsonArr.forEach(function (ele) {
        dbUtil.addEle(db,collectionName,ele)
    });

    if (callback) {
        callback();
    }
}

function infoStore (fileDir, dbAddress, dbName, dbCollection) {
    var db = dbMongo(dbAddress, dbName);
    db.open(function (err, db) {
        if (!err) {
            console.log('dbMongo Connected and Open');

            var excelData = excel(fileDir);
            var content = excelData.data;
            var colName = excelData.colName;
            //console.log(colName);

            var excelJson = util.matrix2json(colName, content);
            //console.log('excel2json',excelJson);
            doStore(db, dbCollection, excelJson, function () {
                console.log('stored');
            });

        }
    });
}

module.exports = infoStore;