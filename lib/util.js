/**
 * Created by Zhi_LI on 2015/11/7.
 */

function matrix2json(colName, colContent) {
    var tempJson = [];
    console.log('matrix2json');
    //console.log(colName);

    colContent.forEach(function (ele) {
        var tempObj = {};
        //console.log(ele);


        for (i=0;i<colName.length;i++){
            if (colName[i] == '序号') {
                //console.log('1111111');
                colName[i] = 'num';
                //if (ele[i] == 1) {
                //    console.log(ele);
                //}
            }else if (colName[i] == '班级') {
                colName[i] = 'class';

            }else if (colName[i] == '专业名称') {
                colName[i] = 'major';

            }else if (colName[i] == '导师') {
                colName[i] = 'teacher';

            }
            if (ele[i]) {
                tempObj[colName[i]] = ele[i];
            } else {
                tempObj[colName[i]] = 'null';

            }

        }

        tempJson.push(tempObj);
    });
    //console.log(tempJson);

    return tempJson;
}

exports.matrix2json = matrix2json;