/**
 * Created by 束蓬 on 2015/9/7.
 */
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
        var name = $(e.currentTarget).attr("data-name");
        this.props.showVmList(id,name);
    },
    detailInfo:function(e){
        debugger
        var info = $(e.currentTarget).data("info");
        var CRID = info.crId
        //初始化弹出框，返回一个jquery对象
        $.ajax({
            url:  '/dbp/service/infra/getVCRListInfoByPhyCRID/' + CRID,
            type: 'get',
            success: function (value) {
                var win = $.window({id:"physicDetailMsg",title:"物理机详情",close:true, width:750,height:300});
                //console.log(require("../../ejs/physicDetailMsgWin.ejs")({vmLists:JSON.parse(value),info:info}))
                win.empty().append(require("../../ejs/physicDetailMsgWin.ejs")({vmLists:JSON.parse(value),info:info,status:["正常","离线","偏高","告警","故障","新入网"]}));
            },
            error: function (value) {
                var win = $.window({id:"physicDetailMsg",title:"物理机详情",close:true, width:750,height:300});
                //console.log(require("../../ejs/physicDetailMsgWin.ejs")({vmLists:JSON.parse(value),info:info}))
                debugger
                win.empty().append(require("../../ejs/physicDetailMsgWin.ejs")({vmLists:require('../../json/getVmlistData.json'),info:info,status:["正常","离线","偏高","告警","故障","新入网"]}));
            }
        });
    },
    filters:{
        areaId:""
    },
    fiterDatas:filterFunc,
    transformData:function(data,num){
        if(typeof data === "number"&&!isNaN(data)){
            if(data/1000>1){
                return Math.round(data/Math.pow(10,((data/1000+"").length-num)))*Math.pow(10,((data/1000+"").length-num))/1000+"TB";
            }else{
                return data+"GB";
            }
        }else{
            return "0GB"
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
                <div className="item" key={v.crId} data-info={JSON.stringify(v)} onClick={this.detailInfo}><table border="0"  >
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
                        <td style={{verticalAlign:'top'}}>{this.transformData(v.memorySize*comMonitorInfo.memusage/100,4)}/{ this.transformData(v.memorySize,4)}</td>
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
                        <td style={{verticalAlign:'top'}}>{this.transformData(comMonitorInfo.diskusedsize,4)}/{this.transformData(v.diskSize,4)}</td>
                    </tr>
                    </tbody>
                </table>
                    {vmIcon}
                    {usrIcon}
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