/**
 * Created by Zhi_LI on 2015/10/13.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var content = {};
    content = parseQuery(req.query)
    res.render('completed', {
        title: 'Completed',
        content: content
    });
});


function parseQuery (query) {
    var content = {};
    var contentArray = [ 'name','sex','birthday','studentID','department','major','tel',
        'destination','reason','duration','approvalDep','approvalSeq'];

    contentArray.forEach(function (ele) {
        content[ele] = query[ele];
        console.log(content[ele]);
    });
    return content;
}
module.exports = router;