/**
 * Created by Zhi_LI on 2015/10/16.
 */
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
router.post('/',  function(req, res, next) {
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "public/upload/";
    //保留后缀
    form.keepExtensions = true;
    //设置单文件大小限制
    form.maxFieldsSize = 2 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和

    form.parse(req, function(err, fields, files) {

        for (ele in files){
            console.log(files[ele]);
            var fileEle = files[ele];
            console.log(ele);
            var filepath = fileEle.path;
            var filename = form.uploadDir + ele.toString() + '.xlsx';
            console.log(filename);
            fs.rename(filepath,filename, function (err) {
                if(err) {
                    console.log("rename err");
                }else {
                    console.log("rename success");
                }
            });
        }

    });



});

module.exports = router;