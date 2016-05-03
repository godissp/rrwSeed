/**
 * Created by Administrator on 2015/10/9.
 */
(function(){
    var url = location.href.split("?")[0];
    if(url!=location.href){
        var paramString = location.href.split("?")[1];
        var paramArray = paramString.split("&");
        location.paramObj = {};
        paramArray.forEach(function(v,i){
            var key = v.split("=")[0];
            var value = v.split("=")[1];
            location.paramObj[key] = value;
        })
    }
})();