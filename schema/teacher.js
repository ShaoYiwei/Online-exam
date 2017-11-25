var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeacherSchema = mongoose.Schema({
    username: String, //登录名
    password: String, //登录密码
    name:String, //真实姓名
    subject:[],//教师所教科目
    subject_name:String,
    school_id:{type:Schema.Types.ObjectId,ref:'School'},
    remarks:String,//备注
    createTime:{
        type:Date,
        default:Date.now
    },//创建时间
    updateTime:{
        type:Date,
        default:Date.now
    },//更新时间
},{
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

mongoose.model('Teacher', TeacherSchema);