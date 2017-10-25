var mongoose = require('mongoose');

var SchoolSchema = mongoose.Schema({
    name: String, //学校名称
    content:String,//学校信息
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

mongoose.model('School', SchoolSchema);