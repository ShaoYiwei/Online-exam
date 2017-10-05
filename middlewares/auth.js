/**
 *
 * 权限验证中间件
 * */
//--需要admin权限
exports.adminRequired = function (req, res, next) {
    if (req.session.user && req.session.user.role) {
        if(req.session.user.role == "rooter"){
            next();
        }
    }else{
        res.redirect('/admin/login');
        return;
    }

}

//-- 需要学生用户
exports.studentRequired = function (req, res, next) {
    if (!req.session.user && req.session.user.role != "student") {
        res.redirect('/login');
        return;
    }
    next();
}

//-- 需要教师用户
exports.signinRequired = function (req, res, next) {
    if (!req.session.user && req.session.user.role != "teacher") {
        res.redirect('/login');
        return;
    }
    next();
}

//-- 屏蔽用户 -_-
exports.blockUser = function (req, res, next) {
}