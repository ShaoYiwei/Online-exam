layui.use(['layer', 'table'], function () {
    var table = layui.table, //表格
        layer = layui.layer; //弹层
    //监听工具条

    var tabObj = table.render({
        elem: '#demo' //指定原始表格元素选择器（推荐id选择器）
        ,height: 600 //容器高度
        ,url: '/rooter/admininfo'
        ,checkbox:true
        ,page:true
        ,cols: [[
            {checkbox:true, fixed: true},
            {field:'_id', width:240,title:'ID'},
            {field:'username', width:240,title:'用户名'},
            {field:'password', width:240, title:'密码'},
            {field:'schoolName', width:240, title:'学校'},
            {fixed: 'right', width:200, align:'center', toolbar: '#barDemo'}
        ]], //设置表头
        done:function (result) {
            result.data.forEach(function (res) {
                res.school = res.school.name;
            })
            console.log(result.data)
        }
    });

    $('.searchBtn').click(function () {
        let data = {
            name:$('#name').val()
        }
        reload(tabObj,data);
    });

    //批量删除
    $('.batchDel').click(function () {
        var checkStatus = table.checkStatus('idTest')
            ,data = checkStatus.data;
        console.log(table)
        layer.confirm('真的删除行么', function (index) {
            //向服务端发送删除指令
            delete_all(layer,index,'/rooter/delseladmin',JSON.stringify(data),function () {
                let data = {
                    name:$('#name').val()
                }
                reload(tabObj,data);
            });
        });
    });
    
    table.on('tool(test)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'del') {
            layer.confirm('真的删除行么', function (index) {
                var data = {
                    id:obj.data._id
                }
                //向服务端发送删除指令
                delete_obj(obj,layer,index,'/rooter/deladmin',JSON.stringify(data));
            });
        } else if (layEvent === 'edit') {
            window.location.href = "/rooter/updateadmin/" + obj.data._id;
        }
    });
});