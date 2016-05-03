/**
 * Created by Administrator on 2016/3/23.
 */
var $ = jQuery;
window.operation = function() {
    var crid = jQuery(event.currentTarget).data("id");
    debugger
    switch (event.currentTarget.selectedOptions[0].text) {
        case '请选择':
            break;
        case 'VNC访问':
            $.get($(event.currentTarget).val() + crid, function (value) {
                var data = JSON.parse(value);
                window.open(data.console.url, "_blank");
            });
            break;
        case '关联IP':
            $.loading(true)
            var ipListPromise = $.ajax({
                url: "/dbp/service/infra/getUseableIPList",
                type: 'get'
            });
            var VCRIPSPromise = $.ajax({
                url: "/dbp/service/infra/getVCRIPs/" + crid,
                type: 'get'
            });
            ipListPromise.done(function (ipList) {
                VCRIPSPromise.then(function (VCRIPS) {
                    $.loading(false)
                    var content = $.window({
                        title: "关联IP",
                        width: 350,
                        height: 140
                    });
                    ipList = JSON.parse(ipList)
                    VCRIPS = JSON.parse(VCRIPS)
                    //content.loadtemplate({url:"views/ipRelating.html",async:false,data:{ipList:ipList,VCRIPS:VCRIPS}});
                    content.empty().append(require("../../ejs/ipRelating.ejs")({ipList: ipList, VCRIPS: VCRIPS}))

                    $(".ipRelating-wrap-close").on("click", function () {
                        content.close();
                    })
                    $(".ipRelating-wrap-relate").on("click", function () {
                        $.ajax({
                            url: "/dbp/service/infra/setVCRFloatIP/" + crid + "/" + $(".ipRelating-wrap-fdip")[0].value + "/" + $(".ipRelating-wrap-gdip")[0].value + "/commit",
                            type: 'get',
                            success: function () {
                                content.close();
                            }
                        });
                    })
                }, function () {
                    $.loading(false)
                    $.alert("获取IP失败");
                })
            });
            break;
        case '扩容申请':
            var core = $(event.currentTarget).data("core");
            var memory = $(event.currentTarget).data("memory");
            var disk = $(event.currentTarget).data("disk");
            //初始化‘CPU数’
            var cpuPromise = $.ajax({
                url: '/dbp/service/ResAppPool/queryCpu',
                type: 'get',
                dataType: 'json'
            });
            //初始化‘内存’
            var memoryPromise = $.ajax({
                url: '/dbp/service/ResAppPool/queryMemory',
                type: 'get',
                dataType: 'json'
            });
            cpuPromise.done(function (cpus) {
                memoryPromise.done(function (memorys) {
                    var content = $.window({
                        title: "扩容申请", width: 600, height: 210, toolbar: true, callback: function () {
                            var v = $('.inputdisk').val();
                            if (/^\s*\d*\s*$/.test(v) && (v - 0) >= (disk - 0)) {
                                $('.inputdisk').val(v - 0);
                                submit();
                            } else {
                                $('.inputdisk').val("");
                                $.alert('磁盘空间请输入大于' + disk + '的数字！');
                            }
                            function submit() {
                                $.loading(true)
                                $.ajax({
                                    url: '/dbp/service/expansion/expansionApply',
                                    type: 'post',
                                    dataType: 'json',
                                    data: {
                                        memorySize: content.find(".line-2 li.active").data("data"),
                                        coreNum: content.find(".line-1 li.active").data("data"),
                                        diskSize: content.find(".inputdisk").val(),
                                        applyReason: content.find(".inputreason").val(),
                                        applyType: 0,
                                        hostId: crid,
                                        curdisk: disk
                                    },
                                    success: function (v) {
                                        content.close()
                                        $.alert(v ? "申请成功" : "申请失败")
                                        $.loading(false)
                                    }
                                });
                            }
                        }
                    });
                    content.empty().append(require("../../ejs/addResource.ejs")({
                        cpus: cpus,
                        memorys: memorys,
                        nowcpu: core,
                        nowdisk: disk,
                        nowmemory: memory
                    }))
                    content.find("li").not(".disable").on("click", function () {
                        $(this).siblings().removeClass("active");
                        $(this).addClass("active")
                    })
                })
            })
            break;
        case '扩展数据盘':
            var disk = $(event.currentTarget).data("disk");
            var content = $.window({title:"扩展数据盘",width:450,height:150,toolbar:true,callback:function(){
                var v = $('.inputdisk').val();
                if(/^\s*\d*\s*$/.test(v)&&(v-0)>=(disk-0)){
                    $('.inputdisk').val(v-0);
                    submit();
                }else{
                    $('.inputdisk').val("");
                    $.alert('磁盘空间请输入小于'+disk+'的数字！');
                }
                function submit(){
                    $.loading(true)
                    $.ajax({
                        url:'/dbp/service/expansion/expansionApply',
                        type:'post',
                        dataType:'json',
                        data:{
                            diskSize:content.find(".inputdisk").val(),
                            applyReason:content.find(".inputreason").val(),
                            applyType:1,
                            hostId:crid,
                            curdisk:disk
                        },
                        success:function(v){
                            content.close()
                            $.alert(v?"申请成功":"申请失败")
                            $.loading(false)
                        }
                    });
                }
            }});
            content.empty().append(require("../../ejs/addDatadisk.ejs")({nowcpu:core,nowdisk:disk,nowmemory:memory}));
            break;
        case '详情':
            //初始化弹出框，返回一个jquery对象
            $.ajax({
                url:  '/dbp/service/Administer/getDataById/' + crid,
                type: 'post',
                success: function (value) {
                    var win = $.window({id:"physicDetailMsg",title:"资源详情信息",close:true, width:1000,height:520});
                    win.empty().append(require("../../ejs/physicDetailMsg.ejs")({value:eval(value)}))
                    //win.loadtemplate({url:"physicDetailMsg.html",async:false,data:eval(value)});
                    //绘表
                    //writeDetailTable(eval(value));

                },
                error: function (value) {
                    console.log("physicDetailMsg error");
                }
            });
            break;
        default:
            var url = $(event.currentTarget).val() + crid;
            $.confirm("确定执行此操作？", function () {
                $.get(url);
            });
    }
}
