/**
 *
 * 权限验证中间件
 * */
//--需要admin权限
exports.adminRequired = function (req,res,next) {
    if (!req.session.user) {
        res.redirect('/admin/login');
        return;
    }
    next();
}

//-- 需要有用户
exports.userRequired = function (req, res, next) {}

//-- 需要有用户并登录
exports.signinRequired = function (req, res, next) {
    if (!req.session.user) {
        res.render('index', {title:"请登录"});
        return;
    }
    next();
}

//-- 屏蔽用户 -_-
exports.blockUser = function (req, res, next) {}