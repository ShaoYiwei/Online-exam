/**
 * 删除指定obj
 * @param self
 * @param layer
 * @param index
 * @param url
 */
function delete_obj(self,layer,index,url,data) {
    $.ajax({
        url: url,
        type: 'delete',
        dataType: 'json',
        data:data,
        contentType: 'application/json',
        beforeSend: function (a) {
        },
        success: function (qd) {
            self.del(); //删除对应行（tr）的DOM结构
            layer.close(index);
        },
        error: function () {
            layer.alert('你无权限删除此条题目')
        }
    });
}


/**
 * 删除all
 * @param self
 * @param layer
 * @param index
 * @param url
 */
function delete_all(layer,index,url,data,callback) {
    $.ajax({
        url: url,
        type: 'delete',
        dataType: 'json',
        data:data,
        contentType: 'application/json',
        beforeSend: function (a) {
        },
        success: function (qd) {
            layer.close(index);
            callback();
        },
        error: function () {
            layer.alert('你无权限删除此条题目')
        }
    });
}

/**
 * 重载表格
 * @param tableObj
 * @param data
 */
function reload(tableObj,data){
    tableObj.reload({
        where:data
    });
}


