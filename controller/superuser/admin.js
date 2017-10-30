var Joi = require('joi');
const mongoose = require('mongoose');
const db = mongoose.connection;
const School = mongoose.model('School');
const Admin = mongoose.model('Admin');

const path = 'backend/superuser/';

/**
 * 添加管理员（Get）
 * @param req
 * @param res
 * @param next
 */
exports.addAdminGet = function (req, res, next) {
    School.find({}, function (err, docs) {
        if (err) {
            res.render(path + 'admin_op', {title: '管理员管理'});
        }

        res.render(path + 'admin_op', {title: '管理员管理', schoolList: docs});

    })
}

/**
 * 添加管理员post请求
 * @param req
 * @param res
 * @param next
 */
exports.addAdminPost = function (req, res, next) {
    let info = {};
    info.username = req.body.username;
    info.password = req.body.password;
    info.school = req.body.school;

    let schema = Joi.object().keys({
        username: Joi.string().regex(/^[a-zA-Z0-9]{6,18}$/).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,18}$/).required(),
        school: Joi.string().required()
    });

    Joi.validate(info, schema, function (err, value) {
        if (err) {
            let error = {};
            error.message = err.details[0].message;
            error.field = err.details[0].path;
            res.render(path + 'admin_op', {user: info, error: {message: '不要跳过js校验哦!'}, title: title});
        } else {
            Admin.find({username: info.username}, function (err, docs) {
                if (err) {
                    res.end(err)
                } else {
                    if (docs.length == 0) {
                        let admin = new Admin(info);

                        admin.save(function (err) {
                            if (err) {
                                res.end(err);
                            } else {
                                res.redirect('/rooter/admin')
                            }
                        })
                    } else {
                        res.render(path + 'admin_op', {error: {message: '用户名已被使用'}, title: title});
                    }
                }
            })
        }
    });
}

/**
 * 管理员信息
 * @param req
 * @param res
 * @param next
 */
exports.adminInfo = function (req, res, next) {
    let page = ~~req.query.page;//将字符串变成整数
    let rows = ~~req.query.limit;
    let adminName = req.query.name;
    let query = Admin.find();
    query.skip((page - 1) * rows);
    query.limit(rows);
    query.populate('school', 'name');
    query.where({
        username: new RegExp(adminName),
        // school:{ $exists: false }
    });
    query.exec(function (err, result) {
        if (err) {
            res.end(err)
        } else {
            if (result.length > 0) {
                Admin.find({name: new RegExp(adminName)}, function (err, docs) {

                    let data = result;
                    data.forEach(function (item) {
                        item._doc.schoolName = item.school.name;
                    });
                    res.json({
                        code: 0,
                        msg: "",
                        count: docs.length,
                        data: data
                    });
                });
            }
        }
    });

}

exports.updateAadminGet = async function (req, res, next) {

    let schoollist;
    await School.find({}, function (err, docs) {
        if (err) {
            res.render(path + 'admin_op', {title: '管理员管理'});
        }
        schoollist = docs;
    });
    let exec = Admin.findOne({_id: req.params.id});
    exec.populate('school');
    exec.exec(function (err, doc) {
        if (err) {
            res.end(err);
        }
        res.render(path + 'admin_op', {title: '管理员管理', adminModify: doc, schoolList: schoollist});
    })
}

exports.updateAdminPost =async function (req, res, next) {
    let info = {};
    info.username = req.body.username;
    info.password = req.body.password;
    info.school = req.body.school;

    let schema = Joi.object().keys({
        username: Joi.string().regex(/^[a-zA-Z0-9]{6,18}$/).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,18}$/).required(),
        school: Joi.string().required()
    });

    let schoollist;
    await School.find({}, function (err, docs) {
        if (err) {
            res.render(path + 'admin_op', {title: '管理员管理'});
        }
        schoollist = docs;
    });

    Joi.validate(info, schema, function (err, value) {
        if (err) {
            let error = {};
            error.message = err.details[0].message;
            error.field = err.details[0].path;
            res.render(path + 'admin_op', {adminModify: info, error: error, title: '管理员管理',schoolList: schoollist});
        } else {
            Admin.find({username: info.username}, function (err, doc) {
                if (err) {
                    res.end(err)
                } else {
                    Admin.update({username: info.username}, {
                        $set: info
                    }, function (err, next) {
                        if (err) {
                            res.end(err);
                            return next();
                        }
                        res.redirect('/rooter/admin')
                    })
                }
            });
        }
    });
}

exports.delAdmin = function (req, res, next) {
    Admin.findOne({_id: req.body.id}, function (err, doc) {
        if (err) {
            res.end(err);
            next();
        } else {
            doc.remove();
            res.status(200).send(doc);
        }
    });
}

exports.delSelectAdmin = function (req, res, next) {

    let list = [];
    for (let i = 0; i < req.body.length; i++) {
        list.push(req.body[i]._id);
    }
    Admin.remove({_id: {$in: list}}, function (err, doc) {
        if (err) {
            res.end(err);
            next();
        } else {
            res.status(200).send(doc);
        }
    });
}
