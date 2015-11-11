/**
 * Created by Zhi_LI on 2015/11/7.
 */

function matrix2json(colName, colContent) {
    var tempJson = [];
    colContent.forEach(function (ele) {
        var tempObj = {};
        ele.forEach( function (e, key) {
            //console.log(e);
            //console.log(colName[key]);
            tempObj[colName[key]] = e;
        });
        tempJson.push(tempObj);
    });
    //console.log(tempJson);
    return tempJson;
}

exports.matrix2json = matrix2json;