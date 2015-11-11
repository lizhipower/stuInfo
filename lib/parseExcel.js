/**
 * Created by Zhi_LI on 2015/11/7.
 */
var fs = require('fs');
var xlsx = require('node-xlsx');

//var srcFileDir = '../public/upload/uploadTar.xlsx';


function parseExcel(srcFileDir) {
    var srcObj = xlsx.parse(srcFileDir)[0];
    var srcData = srcObj.data;
    console.log(srcObj.name);

    var colNameArr = srcData[0];//array
//console.log(colNameArr);

    var rowLength, colLength;
    rowLength = srcData.length;
    colLength = colNameArr.length;
    console.log('row '+ rowLength, 'col ' + colLength);

    var excelData = {};
    srcData.splice(0,1);
    excelData.data = srcData;
    excelData.colName = colNameArr;
    return excelData;
}

module.exports = parseExcel;