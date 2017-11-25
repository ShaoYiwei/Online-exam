layui.use(['layer', 'table'], function () {
    var table = layui.table, //表格
        layer = layui.layer; //弹层
    //监听工具条

    var tabObj = table.render({
        elem: '#demo' //指定原始表格元素选择器（推荐id选择器）
        ,height: 600 //容器高度
        ,url: '/admin/teacherinfo'
        ,checkbox:true
        ,page:true
        ,id:'idTest'
        ,cellMinWidth: 100 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,cols: [[
            {checkbox:true, fixed: true},
            {field:'_id', sort: true, fixed: true,title:'ID'},
            {field:'username',title:'用户名'},
            {field:'name', sort: true,title:'真实姓名'},
            {field:'subject_name', sort: true,title:'所教学科'},
            {field:'remarks', sort: true,title:'备注'},
            {fixed: 'right', align:'center', toolbar: '#barDemo'}
        ]], //设置表头
    });

    //查询按钮
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
            delete_all(layer,index,'/admin/delteacher',JSON.stringify(data),function () {
                let data = {
                    name:$('#name').val()
                }
                reload(tabObj,data);
            });
        });
    });

    table.on('tool(test)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        console.log(obj)
        var data = obj.data //获得当前行数据
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'del') {
            layer.confirm('真的删除行么', function (index) {
                var data = {
                    id:obj.data._id
                }
                //向服务端发送删除指令
                delete_obj(obj,layer,index,'/admin/delteacher',JSON.stringify(data));
            });
        } else if (layEvent === 'edit') {
            window.location.href = "/admin/updateteacher/" + obj.data._id;
        }
    });
});