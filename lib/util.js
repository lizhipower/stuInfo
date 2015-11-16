/**
 * Created by Zhi_LI on 2015/11/7.
 */

function matrix2json(colName, colContent) {
    var tempJson = [];
    //console.log('ce',colContent);
    console.log(colName);
    colContent.forEach(function (ele) {
        var tempObj = {};
        //console.log(ele);


        for (i=0;i<ele.length;i++){
            if (ele[i]) {
                tempObj[colName[i]] = ele[i];
            } else {
                tempObj[colName[i]] = 'null';

            }

        }


        //ele.forEach( function (e, key) {
        //    if (e == 121) {
        //        console.log(ele);
        //    }
        //    //console.log(e);
        //    //console.log(colName[key]);
        //    if (e) {
        //        tempObj[colName[key]] = e;
        //    } else {
        //        tempObj[colName[key]] = 'null';
        //
        //    }
        //});
        tempJson.push(tempObj);
    });
    //console.log(tempJson);

    return tempJson;
}

exports.matrix2json = matrix2json;