/**
 * Created by HUI on 13/04/2017.
 */

$().ready(function() {
    var layer,form;
    layui.use(['layer','form'], function () {
        layer = layui.layer; //弹层
        form = layui.form;
        const error=$('#error').text()
        if(error){
            layer.alert(error)
        }
    });


    $("#schoolname").proschool();
// 在键盘按下并释放及提交后验证提交表单

});