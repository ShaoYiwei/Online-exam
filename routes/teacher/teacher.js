var express = require('express');
var router = express.Router();

router.get('/index', function (req, res, next) {
    res.render('teacher/home', {title: '录入题目'});
});

module.exports = router;