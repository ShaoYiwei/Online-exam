//-- 需要教师用户
exports.teacherRequired = function (req, res, next) {
    if (req.session.user && req.session.user.role) {
        if(req.session.user.role === "teacher"){
            next();
        }else{
            res.redirect('/login');
            return;
        }
    } else {
        res.redirect('/login');
        return;
    }
}

exports.schadminRequired = function (req, res, next) {
    if (req.session.user && req.session.user.role) {
        if (req.session.user.role === "schrooter") {
            next();
        }else{
            res.redirect('/admin/login');
            return;
        }
    } else {
        res.redirect('/admin/login');
        return;
    }

}

/**
 *
 * 权限验证中间件
 * */
//--需要admin权限
exports.adminRequired = function (req, res, next) {
    if (req.session.user && req.session.user.role) {
        if (req.session.user.role === "rooter") {
            next();
        }else{
            res.redirect('/admin/login');
            return;
        }
    } else {
        res.redirect('/admin/login');
        return;
    }

}

/**
 *
 * @param req
 * @param res
 * @param next
 */
//-- 需要学生用户
exports.studentRequired = function (req, res, next) {
    if (req.session.user && req.session.user.role) {
        if(req.session.user.role === "student"){
            next();
        }else{
            res.redirect('/login');
            return;
        }
    } else {
        res.redirect('/login');
        return;
    }
}



//-- 屏蔽用户 -_-
exports.blockUser = function (req, res, next) {
}