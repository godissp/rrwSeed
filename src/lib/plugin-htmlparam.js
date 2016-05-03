/**
 * Created by sp on 2015/10/9.
 */
var paramObj = {};
var url = location.href.split("?")[0];
if(url!=location.href){
    var paramString = location.href.split("?")[1];
    paramString = decodeURIComponent(paramString);
    var paramArray = paramString.split("&");
    paramArray.forEach(function(v,i){
        var key = v.split("=")[0];
        var value = v.split("=")[1];
        paramObj[key] = value;
    });
}
export default paramObj;