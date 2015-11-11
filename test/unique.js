/**
 * Created by Zhi_LI on 2015/11/7.
 */
var arr = [112,112,34,'你好',112,112,34,'你好','str','str1'];

function unique (arr) {
    var res = [];
    var json = {};
    for (var i=0; i<arr.length; i++){
        if(!json[arr[i]]) {
            res.push(arr[i]);
            json[arr[i]] = 1;
        }
    }
    return res;
}

console.log(unique(arr));