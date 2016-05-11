	/**
	 *bind ie自适应
	 */
	if (!Function.prototype.bind) { 
		Function.prototype.bind = function (oThis) { 
			if (typeof this !== "function") { 
				throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable"); 
			} 
			var aArgs = Array.prototype.slice.call(arguments, 1), 
			fToBind = this, 
			fNOP = function () {}, 
			fBound = function () { 
				return fToBind.apply(this instanceof fNOP && oThis? this: oThis, 
				aArgs.concat(Array.prototype.slice.call(arguments))); 
			}; 
			fNOP.prototype = this.prototype; 
			fBound.prototype = new fNOP(); 
			return fBound; 
		}; 
	} 
	/**
	  *addEventListener ie自适应
	*/
	function DOMExtend(name, fn){
            if(typeof(HTMLElement)!="undefined"){
                eval("HTMLElement.prototype."+name+"="+fn);
            }
            else{
                var _getElementById=document.getElementById;
                window[name] = fn;
                document[name] = fn;
                document.getElementById=function(id){
                    var _elem=_getElementById(id);
                    eval("_elem."+name+"="+fn);
                    return _elem;
                }
                var _getElementByTagName=document.getElementsByTagName;
                document.getElementsByTagName=function(tag){
                    var _elem=_getElementByTagName(tag);
                    var len=_elem.length;
                    for(var i=0;i<len;i++){
                        eval("_elem["+i+"]."+name+"="+fn);
                    }
                    return _elem;
                }
                var _createElement=document.createElement;
                document.createElement=function(tag){
                    var _elem=_createElement(tag);
                    eval("_elem."+name+"="+fn);
                    return _elem;
                }
                var _documentElement=document.documentElement;
                eval("_documentElement."+name+"="+fn);
                var _documentBody=document.body;
                eval("_documentBody."+name+"="+fn);
            }
        }
	if(!document.addEventListener){
		DOMExtend("addEventListener",function(event,func){
			this.attachEvent(event,func)
		})
	}