/**
 * Created by 束蓬 on 2015/5/27.
 */
$.extend({
    template:function(text, data){
        /**
         * source
         * 将要被拼接，拼接完成后将被执行的字符串
         */
        var source = "__p+='";

        /**
         * render
         * 用于执行source的函数
         */
        var render;

        /**
         * escapes
         * 执行render中的js前，需要将字符串中的部分内容转义，包括在escapes中
         */
        var escapes = {
            "'":      "'",
            '\\':     '\\',
            '\r':     'r',
            '\n':     'n',
            '\t':     't',
            '\u2028': 'u2028',
            '\u2029': 'u2029'
        };

        /**
         * escaper
         * 与escapes配套使用，用于获取特殊字符的正则表达式
         */
        var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

        /**
         * settings
         * 定义模板中将要被替换的内容
         * evaluate：区域内将要被执行的js
         * interpolate:区域内将要被js替换的内容
         */
        var settings = {
            evaluate    : /<@([\s\S]+?)@>/g,
            interpolate : /<@=([\s\S]+?)@>/g
        };

        /**
         * 定义识别模板中特殊元素的正则
         */
        var matcher = new RegExp([
            (settings.interpolate).source,
            (settings.evaluate).source
        ].join('|') + '|$', 'g');

        /**
         * 已经处理过的文本的标志位
         */
        var index = 0;

        /**
         * 通过replace回调生成source
         */
        text.replace(matcher, function(match,interpolate, evaluate, offset) {
            //执行两边所以dom中内容要转义两次，要加双斜杠
            source += text.slice(index, offset)
                .replace(escaper, function(match) { return '\\' + escapes[match]; });
            if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            }
            if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='";
            }
            index = offset + match.length;
            return match;
        });
        source = "var __t,__p='',__j=Array.prototype.join," +
        "print=function(){__p+=__j.call(arguments,'');};\n" +
        source + "';\nreturn __p;\n";

        /**
         * 由source生成render函数
         */
        try {
            render = new Function( 'data',source);
        } catch (e) {
            e.source = source;
            throw e;
        }
//----------------------------------------------------------预编译结束----------------------------------------------------------------------------------
        /**
         * 如果参数中定义了data则执行render并返回结果
         */
        if (data) return render(data);

        return render;
    }
});