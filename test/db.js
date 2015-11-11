/**
 * Created by Zhi_LI on 2015/10/16.
 */
var infoStore = require('../lib/infoStore');

var dbAddress = "10.15.194.25";
var dbName = 'student';
var dbCollection = 'info';
infoStore(dbAddress, dbName, dbCollection);