/**
 * Created by Zhi_LI on 2015/11/7.
 */

var mongodb = require('mongodb');
var Server = mongodb.Server,Db = mongodb.Db;

function dbMongo(dbAddress, dbName) {
    var server = new Server(dbAddress,27017,{auto_reconnect: true});
    console.log('dbMongo Created');
    return new Db(dbName,server);
}
module.exports = dbMongo;
