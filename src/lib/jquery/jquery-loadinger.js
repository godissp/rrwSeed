/**
 * Created by SP on 2015/5/15.
 * 加载器插件
 */
;(function($) {
    $.extend({
        loadinger: $(
            '<div class="loaddinger-mask">' +
            '<span class="loaddinger-message"></span>' +
            '</div>'
        ),
        loading: function (ing) {
            //生成文档结构
            if (ing) {
                $("body").append(this.loadinger)
            } else {
                this.loadinger.remove();
            }
            return true;
        }
    });
})(jQuery)