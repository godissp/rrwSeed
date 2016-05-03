/**
 * Created by sp on 2015/5/19.
 * �˲��������jquery��underscore
 */
;jQuery.fn.extend({
    loadtemplate: function(params) {
        var url  = params.url||"";
        var data =  params.data||{};
        var async = params.async===undefined?true:params.async;
        var content = this;
        var success = params.success||null;
        var obj = params.obj;
        var promise_getTemplate =
            $.ajax({type: "GET",url: url,dataType: "html",async:async});
        var loaded = promise_getTemplate.done(function(temp){
            var temped = $.template(temp)(data);
            content.empty().append(temped);
            if(success){ success();}
            var getFunc = /\/([\s\S]+?).html$|^([^\/]+?).html$/
            var func = url.match(getFunc)[1];
            window[func]?window[func](content,data):1==1;
        });
        return loaded;
    }
});