/**
 * 获得Url地址栏的参数
 * @param variable 传入key值获得value
 * @returns {*}
 */
function getUrlParam(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let data = vars[i].split('=');
        if(data[0] === variable){
            return data[1];
        }
    }
    return false;
}

