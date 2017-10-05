var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: String, //登录名
    password: String, //登录密码
    name:String, //真实姓名
    type:Number,//用户种类
    subject:[],//教师所教科目
    remarks:String,//备注
});

mongoose.model('User', UserSchema);