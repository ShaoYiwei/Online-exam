var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin', {title: '大家好'});
});

// router.get('/login', function (req, res, next) {
//     res.render('back/login', {});
// })

module.exports = router;