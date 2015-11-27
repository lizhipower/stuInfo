/**
 * Created by Zhi_LI on 2015/10/16.
 */
var infoStore = require('../lib/infoStore');

var dbAddress = "10.15.194.25";
var dbName = 'student';
var fileDir = '../public/upload/uploadTar.xlsx';
var dbCollection = 'info';

//infoStore(fileDir, dbAddress, dbName, dbCollection);

var masterCollection = 'master';
var masterDir = '../public/upload/master.xlsx';
infoStore(masterDir, dbAddress, dbName, masterCollection);

var phdCollection = 'phd';
var phdDir = '../public/upload/phd.xlsx';
infoStore(phdDir, dbAddress, dbName, phdCollection);
