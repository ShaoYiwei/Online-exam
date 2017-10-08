var express = require('express');
var router = express.Router();

router.get('student/index', function (req, res, next) {
    res.render('student/home', {title: '录入题目'});
});

module.exports = router;