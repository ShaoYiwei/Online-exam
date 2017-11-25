/**
 * Created by HUI on 2016/10/27.
 */
var mongoose = require('mongoose');

var PaperSchema = mongoose.Schema({
    user_id: String,
    subject: String,
    tips: Array,
    level: String,
    data: Array,
    date: Date,
    filename: String,
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