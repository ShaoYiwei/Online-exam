var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const db = mongoose.connection;
const School = mongoose.model('School');
const Bank = mongoose.model('Bank');
const upload = require('../../servers/upload/fileupload');


/**
 * 教师主页
 */
router.get('/index', function (req, res, next) {
    School.findOne({_id: req.session.user.school}, function (err, doc) {
        if (!err) {
            res.render('backend/teacherindex', {
                title: '教师主页', user: {
                    name: req.session.user.name,
                    school: doc.name,
                    subject: req.session.user.subject,
                    subject_default: req.session.user.subject_default
                }
            });
        }
    });
});

/**
 * 试题信息
 */
router.get('/bankinfo', function (req, res, next) {
    let user_id = req.session.user.user_id;
    let page = ~~req.query.page;
    let rows = ~~req.query.limit;
    let question = req.query.question;
    let type = req.query.type;
    let tips = req.query.tips;
    let query = Bank.find({});
    query.skip((page - 1) * rows);
    query.limit(rows);
    if (user_id) {
        let temptype;
        if (type) {
            switch (type) {
                case '0':
                    temptype = '选择题';
                    break;
                case '1':
                    temptype = '填空题';
                    break;
                case '2':
                    temptype = '判断题';
                    break;
                case '3':
                    temptype = '简答题';
                    break;
                case '4':
                    temptype = '解答题';
                    break;
                case '5':
                    temptype = '名词解释'
            }
        }
        query.where('user_id', user_id).where('subject', req.session.user.subject_default).where('question', new RegExp(question)).where('type', new RegExp(temptype)).where('tips', new RegExp(tips)).sort({_id: -1});
        //计算分页数据
        query.exec(function (err, rs) {
            if (err) {
                res.send(err);
            } else {
                // 计算数据总数
                Bank.find({
                    'user_id': user_id,
                    'subject': req.session.user.subject_default,
                    'question': new RegExp(question),
                    'type': new RegExp(temptype),
                    'tips': new RegExp(tips)
                }, function (err, result) {
                    res.json({
                        code: 0,
                        msg: "",
                        count: result.length,
                        data: rs
                    });
                });
            }
        });
    } else {
        res.json({
            code: 1,
            msg: "无权访问",
        });
    }
});

/**
 * 录入题目
 */
router.get('/entrytopic', function (req, res, next) {
    res.render('backend/teacher/entry_topic', {
        subject_default: req.session.user.subject_default
    });
});


//录入题目
router.post('/bank/create', function (req, res) {

    let bank = new Bank({
        user_id: req.session.user.user_id,
        subject: req.body.subject,
        type: req.body.type,
        tips: req.body.tips,
        level: req.body.level,
        public: req.body.public,
        question: req.body.question,
        answer: req.body.answer,
        filepath: req.body.filepath,
    });

    bank.save(function (err, next) {
        if (err) {
            res.end('error', err);
            return next();
        } else {
            res.status(200).send({message: 'create success'});
        }

    })
});

/**
 * 改变课程
 */
router.post('/changesubject', function (req, res, next) {
    let index = ~~req.body.index;
    try {
        req.session.user.subject_default = req.session.user.subject[index];
        res.json(['success', '成功']);
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 * 题目图片上传
 */
router.post('/upload',upload.array('file',6), function (req, res, next) {

    if (req.files) {
        console.log(req.files)
        res.json({
            code:200,
            message:req.files
        });
    }else{
        res.status(400).send();
    }
});

/**
 * 试题管理页面
 */
router.get('/banklist', function (req, res, next) {
    res.render('backend/teacher/bank_list');
});

/**
 * 生成试卷
 */
router.get('/makepaper', function (req, res, next) {

    Bank.find({user_id: req.session.user.user_id, subject: req.session.user.subject_default}, function (err, docs) {
        if (err) {
            res.end(err)
        }
        let M = docs.map(function (o) {
            return o.tips;
        });
        let allTips = Array.from(new Set(M));//对检索出的知识点进行去重
        res.render('backend/teacher/make_paper', {
            title: '组卷中心',
            subject: req.session.user.subject,
            subject_default: req.session.user.subject_default,
            allTips: allTips
        });
    });
});

/**
 * 试卷管理
 */
router.get('/paperlist', function (req, res, next) {
    res.render('backend/teacher/paper_list');
});

/**
 * 公开题目
 */
router.get('/publicbank', function (req, res, next) {
    res.render('backend/teacher/public_bank');
});

module.exports = router;