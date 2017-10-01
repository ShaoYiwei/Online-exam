var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'hotdgo123222' });
});


router.get('/admin/login',function (req, res, next) {
    res.render('back/login')
});

router.post('/admin/login',function (req, res, next) {

})
module.exports = router;
