/**
 * Created by 束蓬 on 2015/9/7.
 */
import  '../../css/addResourceWin.css'
import  '../../css/detailMsg.css'
import $ from 'jquery';
import React from 'react';
import filterFunc from './filterData.js'
var ComputerList = React.createClass({
    /***
     * 自定义属性以及方法
     */
    itemsClick:function(e){
        $(".item").removeClass("active");
        $(e.currentTarget).parents(".item").addClass("active");
        var id = $(e.currentTarget).attr("data-id");
        var name = $(e.currentTarget).attr("data-name") ;
        this.props.showVmList(id,name);
    },
    filters:{
        areaId:""
    },
    fiterDatas:filterFunc,
    operation:function(e){
        var id =  $(e.currentTarget).data("index")+"";
        debugger
        switch(id){
            case "0" :
                break;
            case "4" :
                $.get($(e.currentTarget).data("url"),function(value){
                    var data = JSON.parse(value);
                    window.open(data.console.url,"_blank");
                });
                break;
            case "5" :
                var CRID = $(e.currentTarget).data("id");
                $.loading(true)
                var ipListPromise = $.ajax({
                    url: "/dbp/service/infra/getUseableIPList",
                    type: 'get'
                });
                var VCRIPSPromise  = $.ajax({
                    url: "/dbp/service/infra/getVCRIPs/"+CRID,
                    type: 'get'
                });
                ipListPromise.done(function(ipList){
                    VCRIPSPromise.then(function(VCRIPS){
                        $.loading(false)
                        var content = $.window({
                            title:"关联IP",
                            width:350,
                            height:140
                        });
                        ipList  = JSON.parse(ipList)
                        VCRIPS  = JSON.parse(VCRIPS)
                        //content.loadtemplate({url:"views/ipRelating.html",async:false,data:{ipList:ipList,VCRIPS:VCRIPS}});
                        content.empty().append(require("../../ejs/ipRelating.ejs")({ipList:ipList,VCRIPS:VCRIPS}))

                        $(".ipRelating-wrap-close").on("click",function(){
                            content.close();
                        })
                        $(".ipRelating-wrap-relate").on("click",function(){
                            $.ajax({
                                url: "/dbp/service/infra/setVCRFloatIP/"+CRID+"/"+$(".ipRelating-wrap-fdip")[0].value+"/"+$(".ipRelating-wrap-gdip")[0].value+"/commit",
                                type: 'get',
                                success:function(){
                                    content.close();
                                }
                            });
                        })
                    },function(){
                        $.loading(false)
                        $.alert("获取IP失败");
                    })
                });
                break;
            case "6" :
                var CRID = $(e.currentTarget).data("id");
                var core = $(e.currentTarget).data("core");
                var memory = $(e.currentTarget).data("memory");
                var disk = $(e.currentTarget).data("disk");
                //初始化‘CPU数’
                var cpuPromise = $.ajax({
                    url:'/dbp/service/ResAppPool/queryCpu',
                    type:'get',
                    dataType:'json'
                });
                //初始化‘内存’
                var memoryPromise = $.ajax({
                    url:'/dbp/service/ResAppPool/queryMemory',
                    type:'get',
                    dataType:'json'
                });
                cpuPromise.done(function(cpus){
                    memoryPromise.done(function(memorys){
                        var content = $.window({title:"扩容申请",width:600,height:210,toolbar:true,callback:function(){
                            var v = $('.inputdisk').val();
                            if(/^\s*\d*\s*$/.test(v)&&(v-0)>=(disk-0)){
                                $('.inputdisk').val(v-0);
                                submit();
                            }else{
                                $('.inputdisk').val("");
                                $.alert('磁盘空间请输入大于'+disk+'的数字！');
                            }

                            function submit(){
                                $.loading(true)
                                $.ajax({
                                    url:'/dbp/service/expansion/expansionApply',
                                    type:'post',
                                    dataType:'json',
                                    data:{
                                        memorySize:content.find(".line-2 li.active").data("data"),
                                        coreNum:content.find(".line-1 li.active").data("data"),
                                        diskSize:content.find(".inputdisk").val(),
                                        applyReason:content.find(".inputreason").val(),
                                        applyType:0,
                                        hostId:CRID,
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
                        content.empty().append(require("../../ejs/addResource.ejs")({cpus:cpus,memorys:memorys,nowcpu:core,nowdisk:disk,nowmemory:memory}))
                        content.find("li").not(".disable").on("click",function(){
                            $(this).siblings().removeClass("active");
                            $(this).addClass("active")
                        })
                    })
                })
                break;
            case "7" :
                var CRID = $(e.currentTarget).data("id");
                var disk = $(e.currentTarget).data("disk");
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
                                hostId:CRID,
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
            case "8":
                //var content = $.window({title:"扩展数据盘",width:800,height:450,toolbar:true});
                //var inner = "<iframe src='chrome-extension://njphiomhkjnabkjjdbmnnnkplmllinbc/html/nassh.html' width='100%' height='100%'>"
                //content.append(inner);
                debugger
                window.open('chrome-extension://njphiomhkjnabkjjdbmnnnkplmllinbc/html/nassh.html')
                break;
            case "9" :
                var CRID = $(e.currentTarget).data("id");
                debugger
                //初始化弹出框，返回一个jquery对象
                $.ajax({
                    url:  '/dbp/service/Administer/getDataById/' + CRID,
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
            default :
                var url =  $(e.currentTarget).data("url");
                $.confirm("确定执行此操作？",function(){
                    $.get(url);
                });
        }
    },
    /***
     * 一下为react生命周期方法
     */
    render: function() {
        var data = this.fiterDatas(this.props.listData);
        var items = data.map(function(v,i){
            var comMonitorInfo = v.comMonitorInfo|| {cpu_USAGE:0,mem_USAGE:0,disk_USAGE:0};
            var vmIcon = '';
            var usrIcon = '';
            if(v.vmNum){
                vmIcon = <div className="deployed">
                            <img className="cz" src={require("../../imgs/pic/cz.png")} onClick ={this.itemsClick} data-id={v.crId} data-name={v.crName}/>
                            <img src={require("../../imgs/pic/status-0-xn-small.png")} />
                        </div>;
            }else{
                if(v.usrId == "0"){
                    usrIcon = <img className="usr-1" src={require("../../imgs/pic/status-0-wn-small.png")}/>;
                }else if(v.usrId == "9999"){
                    usrIcon = <img className="usr-3" src={require("../../imgs/pic/status-2-wn-small.png")}/>;
                }else{
                    usrIcon = <img className="usr-2" src={require("../../imgs/pic/status-1-wn-small.png")}/>;
                }
            }
            return(
                <div className="item" key={v.crId}><table border="0"  >
                <tbody>
                    <tr>
                        <td>
                            <p className="Img">
                                <img src={require("../../imgs/pic/status-"+ v.comMonitorInfo.showStatus+"-big.png")} width="40" height="40" />
                            </p>
                        </td>
                        <td>
                            <span className="Name">{v.crName}</span>
                            <br/>
                            {v.ip}
                        </td>
                        <td></td>
                    </tr>
                    <tr style={{height:15}}>
                        <td style={{textAlign:'center'}}>cpu</td>
                        <td>
                            <div className="progress progress-striped" style={{height: 15, width:140, margin:"15px 0px", borderRadius: 0}}>
                                <div style={{minWidth:'10%',width:comMonitorInfo.cpuallusage+'%', display:comMonitorInfo.cpuallusage?'block':'none'}} className="bar"><span className="percent" style={{fontSize:'5px',color:'white'}}>{comMonitorInfo.cpuallusage+'%'}</span></div>
                                </div>
                         </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={{verticalAlign:'top', textAlign: 'center'}}>内存</td>
                        <td>
                            <div className="progress progress-striped" style={{height:15, width:140, marginBottom: 15, borderRadius: 0}}>
                                <div style={{minWidth:'10%', width:comMonitorInfo.memusage+'%',display:(comMonitorInfo.memusage?'block':'none')}} className="bar">
                                    <span className="percent" style={{fontSize:'5px',color:'white'}}>{ comMonitorInfo.memusage+'%'}</span>
                                </div>
                            </div>
                        </td>
                        <td style={{verticalAlign:'top'}}>{v.memorySize*comMonitorInfo.memusage}GB/{ v.memorySize}GB</td>
                    </tr>
                    <tr>
                        <td style={{verticalAlign:'top',textAlign: 'center'}}>硬盘</td>
                    <td>
                        <div className="progress progress-striped" style={{height: 15, width:140, borderRadius: 0}}>
                            <div style={{minWidth:'10%', width:comMonitorInfo.diskusage+'%',display:(comMonitorInfo.diskusage?'block':'none')}} className="bar">
                                <span className="percent" style={{fontSize:'5px',color:'white'}}>{ comMonitorInfo.diskusage+"%" }</span>
                            </div>
                        </div>
                    </td>
                    <td style={{verticalAlign:'top'}}>{comMonitorInfo.diskusedsize}GB/{ v.diskSize}GB</td>
                    </tr>
                </tbody>
                </table>
                    {vmIcon}
                    {usrIcon}
                    <div className="btn-group operation-wrap" style={{right:"40px"}}>
                        <div className="operation dropdown-toggle" data-toggle="dropdown">操作</div>
                        <ul className="dropdown-menu">
                            <li><a data-index="1" data-url={"/dbp/service/infra/startVM/"+v.crId} onClick={this.operation}>开机</a></li>
                            <li><a data-index="2" data-url={"/dbp/service/infra/shutdownVM/"+v.crId} onClick={this.operation}>关机</a></li>
                            <li><a data-index="3" data-url={"/dbp/service/infra/restartVM/"+v.crId} onClick={this.operation}>重启</a></li>
                            <li><a data-index="4" data-url={"/dbp/service/infra/VNC/"+v.crId} onClick={this.operation}>VNC访问</a></li>
                            {(v.virtualType===2)?"":(<li><a data-index="5" data-id={v.crId} onClick={this.operation}>关联IP</a></li>)}
                            {(v.virtualType===2)?"":(<li><a data-index="6" data-id={v.crId} data-memory={v.memorySize} data-core={v.coreNumber} data-disk={v.diskSize} onClick={this.operation}>扩容申请</a></li>)}
                            {(v.virtualType===2)?"":(<li><a data-index="7" data-id={v.crId} data-disk={v.diskSize} onClick={this.operation}>扩展数据盘</a></li>)}
                            {(v.virtualType===2)?"":(<li><a data-index="9" data-id={v.crId} onClick={this.operation}>详情</a></li>)}

                        </ul>
                    </div>
                </div>
            )
        }.bind(this));
        return (
            <div>
                {items}
            </div>
        )
    }
});

export default ComputerList ;