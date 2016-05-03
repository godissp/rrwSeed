/**
 * Created by 束蓬 on 2015/9/11.
 */
import $ from 'jquery';
import React from 'react';
import DropDownList from '../../../component/dropDownList/gonabe_dropDownList.js';
var VmList = React.createClass({
    /***
     * 自定义属性以及方法
     */
    //隐藏虚拟机列表
    hideVmList:function(){
        $(".item").removeClass("active");
        $(".details-wrap").height(0);
        $(".main-wrap")[0].style.height = $(window).height()-56+"px";
    },
    operation:function(i,v){
        switch(v.value){
            case "0" :
                break;
            case "4" :
                $.get(v.url,function(value){
                    var data = JSON.parse(value);
                    window.open(data.console.url,"_blank");
                    $(self).val(0);
                });
                break;
            case "5" :
                var CRID = v.id;
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
                        $.alert("获取IP失败");
                    })
                });
                break;
                default :
                    $.confirm("确定执行此操作？",function(){
                        $.get(v.url);
                        $(this).parent().parent().find(".status").text(v.text);
                        $(this).val(0);
                    });
        }
    },
/***
 * 一下为react生命周期方法
 */

    render: function() {
        var status = ["开机","待机","关机"];
        var oprationData = [];
        var widths = [100,220,150,155,170,215,435,235]
        var data = this.props.listData;
        var items = data.map(function(v,i){
            oprationData = [
                {value:"0",text:"--请选择--"},
                {value:"1",text:"开机",url:"/dbp/service/infra/startVM/"+v.crId},
                {value:"2",text:"关机",url:"/dbp/service/infra/shutdownVM/"+v.crId},
                {value:"3",text:"重启",url:"/dbp/service/infra/restartVM/"+v.crId},
                {value:"4",text:"VNC访问",url:"/dbp/service/infra/VNC/"+v.crId},
                {value:"5",text:"关联IP",id:v.crId}
            ]
            return (
                <tr>
                    <td style={{width:widths[0]}}>{++i}</td>
                    <td style={{width:widths[1]}}>{v.crName}</td>
                    <td style={{width:widths[2]}}>{v.osName}</td>
                    <td style={{width:widths[3]}}>{this.props.physicsName}</td>
                    <td style={{width:widths[4]}}>{v.ip}</td>
                    <td style={{width:widths[5]}} className="status">{status[v.comMonitorInfo.showStatus]}</td>
                    <td style={{width:widths[6]}}><span>CPU：{v.comMonitorInfo.cpuallusage}% 内存：{v.comMonitorInfo.memswap}MB/ {v.memorySize}GB 数据盘：{v.comMonitorInfo.diskusage/100* v.diskSize}GB/{v.diskSize}GB</span></td>
                    <td style={{width:widths[7]}}>
                        <DropDownList width="160" data={oprationData} callback={this.operation}/>
                    </td>
                 </tr>
            )
        }.bind(this));
        return (
            <div>
                <div className="action">
                    <span></span>
                    <span className="remove" onClick={this.hideVmList}><img src={require("../../imgs/new/close.png")} /></span>
                    <span className="refresh" onClick={this.getVmListData}><img src={require("../../imgs/new/update.png")} /></span>
                </div>
                <div className="content">
                    <table className="details-table">
                        <thead>
                            <tr>
                                <th width={widths[0]}>序号</th>
                                <th width={widths[1]}>实例ID/名称</th>
                                <th width={widths[2]}>操作系统</th>
                                <th width={widths[3]}>物理机</th>
                                <th width={widths[4]}>ip地址</th>
                                <th width={widths[5]}>状态（运转中）</th>
                                <th width={widths[6]}>配置</th>
                                <th width={widths[7]}>操作</th>
                            </tr>
                        </thead>
                        <tbody style={{height:$(window).height()*0.3-45}}>
                            {items}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
});
export default VmList;