/**
 * Created by Administrator on 2015/12/3.
 */

var download = function(src){
    var ele = document.createElement("a");
    ele.style.display = "none";
    ele.href = src;
    ele.download = "";
    document.body.appendChild(ele);
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click",false,false);
    ele.dispatchEvent(evt);
    ele.remove();
}

module.exports = download
