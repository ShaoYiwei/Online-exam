var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = mongoose.Schema({
    username: String, //登录名
    password: String, //登录密码
    role:Number,//管理员权限 0为超级管理员，1为学校管理员，
    school:{type:Schema.Types.ObjectId,ref:'School'},//管理员对应学校
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

mongoose.model('Admin', AdminSchema);