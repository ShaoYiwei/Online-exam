/**
 * Created by HUI on 13/04/2017.
 */

$().ready(function() {
    var layer;
    layui.use(['layer'], function () {
        layer = layui.layer; //弹层
        const error=$('#error').text()
        if(error){
            layer.alert(error)
        }
    });
// 在键盘按下并释放及提交后验证提交表单

});