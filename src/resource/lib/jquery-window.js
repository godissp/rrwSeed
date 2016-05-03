/**
 * Created by SP on 2015/5/15.
 * 1.弹出框插件，此插件依赖于jquery
 * 2.confirm弹出框插件，此插件依赖于jquery
 */
;(function($){
	$.extend({
		windowNum:0,
		window: function(params) {
			$.windowNum += 1;
			var id = params.id||"";
			var windowNum = $.windowNum;
			var head = params.head===undefined?true:params.head;
			var title  = params.title||"";
			var width =  params.width||450;
			var height = params.height||500;
			var downX = 0;
			var downY = 0;
			var lastChangeX = 0;
			var lastChangeY = 0;
			var changeX = 0;
			var changeY = 0;
			var windowWidth = $(window).width();
			var windowHeight = $(window).height();
			var dragging = false;
			var maskClose = false;
			var exportObj = null;
			//生成文档结构
			if(head){
				$("body").append('<div class="window-mask no'+windowNum+'">' +
				'<i class="window-ver"></i><div class="window-wrap">' +
				'<div class="window-titlePanel-window">' +
				'<span class="window-title">'+title+'</span>' +
				'<div class="window-close"></div>' +
				'</div>' +
				'<div class="window-contentPanel-window"></div>' +
				'</div>' +
				'</div>');
			}else{
				$("body").append('<div class="fix window-mask no'+windowNum+'">' +
				'<i class="window-ver"></i><div class="window-wrap">' +
				'<div class="window-contentPanel-window"></div>' +
				'</div>' +
				'</div>');
			}

			//设置window中content的宽高
			$(".window-mask.no"+windowNum).find(".window-contentPanel-window").css({width:width,height:height,overflow:"auto"});
			$(".window-mask.no"+windowNum).find(".window-wrap").animate({opacity:1},200);
			$(".window-mask.no"+windowNum).animate({opacity:1},200);

			//关闭window的事件
			$(".window-mask.no"+windowNum).on("click",".window-close",function(){
				close();
			});

			if(maskClose){
				$(".window-mask.no"+windowNum).on("click",function(e){
					if($(".window-mask.no"+windowNum).is(e.target))
						close();
				});
			}
			//设置拖拽功能
			$(".window-mask.no"+windowNum).on("mousedown",".window-titlePanel-window",function(e){
				downX = e.clientX;
				downY = e.clientY;
				lastChangeX = $(this).parents(".window-wrap").offset().left;
				lastChangeY = $(this).parents(".window-wrap").offset().top;
				dragging = true;
			});

			$(".window-mask.no"+windowNum).on("mousemove",function(e){
				//e.preventDefault();
				e.stopPropagation();
				if(dragging){
					changeX = lastChangeX + e.clientX - downX;
					changeY = lastChangeY + e.clientY - downY;
					$(this).find(".window-wrap").css({position:"absolute",left:changeX,top:changeY});
					e.preventDefault();
				}
			});
			$(".window-mask.no"+windowNum).on("mouseup",function(e){
				if(dragging){
					dragging = false;
					if(e.clientX<0||e.clientX>windowWidth||e.clientY<0||e.clientY>windowHeight){
						if(e.clientX<0){
							changeX-=e.clientX;
						}else if(e.clientX>windowWidth){
							changeX-=(e.clientX - windowWidth);
						}
						if(e.clientY<0){
							changeY-=e.clientY;
						}else if(e.clientY>windowHeight){
							changeY-=(e.clientY - windowHeight);
						}
						$(this).find(".window-wrap").css({left:changeX,top:changeY});
					}
					lastChangeX = changeX;
					lastChangeY = changeY;
				}
			});
			function close(){
				$(".window-mask.no"+windowNum).remove();
			}
			exportObj = $(".window-mask.no"+windowNum).find(".window-contentPanel-window");
			exportObj.close = close;
			if(id){
				$.window[id] = exportObj;
			}
			//返回content的框架
			return exportObj;
		},
		confirm:function(){
			var content =  arguments[0];
			var okFunc = arguments[1];
			var cancelFunc = arguments[2]

			//生成文档结构
			$("body").append(
				'<div class="fix window-mask-confirm">' +
				'<div class="window-wrap-confirm">' +
				'<div class="window-titlePanel-confirm">' +
				'<span class="window-title-confirm"">提示</span>' +
				'<div class="window-close-confirm""></div>' +
				'</div>' +
				'<div class="window-contentPanel-confirm">' +
				'<div class="confirm-content">'+content+'</div>'+
				'<div class="confirm-btns">' +
				'<div class="btn-ok">确定</div>' +
				'<div class="btn-cancel">取消</div>' +
				'</div>'+
				'</div>' +
				'</div>' +
				'</div>'
			);

			//设置confirm的宽高
			$(".window-mask-confirm").find(".window-contentPanel-confirm").css({width:300,overflow:"auto"});
			$(".window-mask-confirm").find(".window-wrap-confirm").animate({opacity:1},200);
			$(".window-mask-confirm").animate({opacity:1},200);

			//confirm点击事件
			$(".window-mask-confirm").on("click",".btn-ok,.btn-cancel",function(e){
				if($(".btn-ok").is(e.target)){
					okFunc?okFunc():1==1
				}else{
					cancelFunc?cancelFunc():1==1
				}
				close();
			});
			function close(){
				$(".window-mask-confirm").remove();
			}
			return true;
		},
		prompt:function(){
			var title = arguments[0];
			var content =  arguments[1];
			var okFunc = arguments[2];
			var cancelFunc = arguments[3]

			//生成文档结构
			$("body").append(
				'<div class="fix window-mask-prompt">' +
				'<div class="window-wrap-prompt">' +
				'<div class="window-titlePanel-prompt">' +
				'<span class="window-title-prompt"">' +title+'</span>' +
				'<div class="window-close-prompt""></div>' +
				'</div>' +
				'<div class="window-contentPanel-prompt">' +
				'<div class="prompt-content">'+
				'<span>' +content+
				'</span>'+
				'<input class="prompt-input" type="text">'+
				'</div>'+
				'<div class="prompt-btns">' +
				'<div class="btn-ok">确定</div>' +
				'<div class="btn-cancel">取消</div>' +
				'</div>'+
				'</div>' +
				'</div>' +
				'</div>'
			);

			//设置confirm的宽高
			$(".window-mask-prompt").find(".window-contentPanel-prompt").css({minWidth:300,overflow:"auto"});
			$(".window-mask-prompt").find(".window-wrap-prompt").animate({opacity:1},200);
			$(".window-mask-prompt").animate({opacity:1},200);

			//confirm点击事件
			$(".window-mask-prompt").on("click",".btn-ok,.btn-cancel",function(e){
				if($(".btn-ok").is(e.target)){
					var inputValue = $("input.prompt-input").val()
					okFunc?okFunc(inputValue):1==1
				}else{
					cancelFunc?cancelFunc():1==1
				}
				close();
			});
			function close(){
				$(".window-mask-prompt").remove();
			}
			return true;
		},
		alert:function(){
			var content =  arguments[0];

			//生成文档结构
			$("body").append(
				'<div class="fix window-mask-confirm">' +
				'<div class="window-wrap-confirm">' +
				'<div class="window-titlePanel-confirm">' +
				'<span class="window-title-confirm"">提示</span>' +
				'<div class="window-close-confirm""></div>' +
				'</div>' +
				'<div class="window-contentPanel-confirm">' +
				'<div class="confirm-content">'+content+'</div>'+
				'<div class="confirm-btns">' +
				'<div class="btn-ok">确定</div>' +
				'</div>'+
				'</div>' +
				'</div>' +
				'</div>'
			);

			//设置confirm的宽高
			$(".window-mask-confirm").find(".window-contentPanel-confirm").css({width:300,overflow:"auto"});
			$(".window-mask-confirm").find(".window-wrap-confirm").animate({opacity:1},200);
			$(".window-mask-confirm").animate({opacity:1},200);

			//confirm点击事件
			$(".window-mask-confirm").on("click",".btn-ok,.btn-cancel",function(e){
				close();
			});
			function close(){
				$(".window-mask-confirm").remove();
			}
			return true;
		}
	});
})(jQuery)
