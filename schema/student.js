var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = mongoose.Schema({
    username: String, //登录名
    password: String, //登录密码
    name: String, //真实姓名
    sex: String,//性别
    school_id: {type: Schema.Types.ObjectId, ref: 'School'},
    school_name: String,
    department: String,
    className: String,//学生班级
    score: [],//学生各科的成绩
    remarks: String,//备注
    createTime: {
        type: Date,
        default: Date.now
    },//创建时间
    updateTime: {
        type: Date,
        default: Date.now
    },//更新时间
}, {
    timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}
});

mongoose.model('Student', StudentSchema);