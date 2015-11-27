/**
 * Created by Zhi_LI on 2015/11/7.
 */

function addEle(db, collectionName, eleObj, callback) {
    db.collection(collectionName, function (err, collection) {
        if (!err) {
            collection.insert(eleObj, function (error, result) {
                if (error) {
                    console.log('error ' + error);
                    return;
                }
                //console.log('db ele added');
                if (callback) {
                    callback(result);
                }

            });
        }
    });
}
function delEle(db, collectionName, elObj, callback) {
    db.collection(collectionName, function (err, collection) {
        if (!err) {
            collection.remove(elObj, function(error, result) {
                if (err) {
                    console.log('error '+ error);
                    return;
                }
                if (callback) {
                    callback(result);
                }

            })
        }
    })
}
function delAll(db, collectionName) {
    delEle(db, collectionName, {});

}
function selectEle(db, collectionName, eleObj, callback) {
    db.collection(collectionName, function (err, collection) {
        if (!err) {
            collection.find(eleObj).toArray(function (error, result) {
                if (error) {
                    console.log('error ' + error);
                    return;
                }
                if (callback) {
                    callback(result);
                }
            })
        }
    })
}

function printAll (db, collectionName) {

    selectEle(db, collectionName, {}, showAll);
}

function showAll (content) {
    content.forEach(function (ele) {
        console.log(ele);
    })
}
function update (db, collectionName, srcObj, tarObj,callback) {
    console.log('update');
    db.collection(collectionName, function (err, collection) {
        if (!err) {
            collection.update(srcObj, tarObj,function (error, result) {
                if (error) {
                    console.log('error ' + error);
                    return;
                } else {
                    console.log(result);
                    console.log(srcObj);
                    console.log(tarObj);
                }
                //console.log(result);
                if (callback) {
                    callback(result);
                }
            })
        }
    })
}
//function shutdown (db, collectionName){
//
//}
exports.addEle = addEle;
exports.delEle = delEle;
exports.delAll = delAll;
exports.selectEle = selectEle;
exports.showAll = showAll;
exports.printAll = printAll;
exports.update = update;
