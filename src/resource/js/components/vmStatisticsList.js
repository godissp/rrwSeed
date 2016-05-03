/**
 * Created by 束蓬 on 2015/9/7.
 */
/**故障暂时去掉
 <div className="checkbox" onClick={this.changeStatus}>
 <input className="crStatus" data-status="4" type="checkbox"/>
 <img src={require("../imgs/new/status-4.png")} width="30" height="30" />
 <span className="color5">{'主机故障（'+data[4]+'）'}</span>
 <div className="triangle5"></div>
 <img src={require("../imgs/new/tick.png")} className="tick-icon"/>
 </div>
 */
import $ from 'jquery';
import React from 'react';
import ComputerList from './computerList.js';
var StatisticsList = React.createClass({
    changeStatus:function(event){
        $(event.currentTarget).find("input").trigger("click");
    },
    /***
     * 自定义属性以及方法
     */
    componentDidMount:function(){
        $(document).on("click","input[type='checkbox']",function(e){
            this.props.doSomething();
        }.bind(this));
    },
    render: function() {
        var data =  this.props.listData;
        return(
        <div>
            <div className="filter-1">
                <div className="text">
                主机状态：
                </div>
                <div className="checkbox" onClick={this.changeStatus}>
                    <input className="crStatus" data-status="0" type="checkbox"/>
                    <img src={require("../../imgs/new/status-0.png")} width="30" height="30" />
                    <span className="color1">{'负载正常（'+data[0]+'）'}</span>
                    <div className="triangle1"></div>
                    <img src={require("../../imgs/new/tick.png")} className="tick-icon"/>
                </div>
                <div className="checkbox" onClick={this.changeStatus}>
                    <input className="crStatus" data-status="2" type="checkbox"/>
                    <img src={require("../../imgs/new/status-2.png")} width="30" height="30"/>
                    <span className="color2">{'负载偏高（'+data[2]+'）'}</span>
                    <div className="triangle2"></div>
                    <img src={require("../../imgs/new/tick.png")} className="tick-icon"/>
                </div>
                <div className="checkbox" onClick={this.changeStatus}>
                    <input className="crStatus" data-status="3" type="checkbox"/>
                    <img src={require("../../imgs/new/status-3.png")} width="30" height="30" />
                    <span className="color4">{'负载告警（'+data[3]+'）'}</span>
                    <div className="triangle4"></div>
                    <img src={require("../../imgs/new/tick.png")} className="tick-icon" />
                </div>
                <div className="checkbox" onClick={this.changeStatus}>
                    <input className="crStatus" data-status="1" type="checkbox"/>
                    <img src={require("../../imgs/new/status-1.png")} width="30" height="30" />
                    <span className="color3">{'主机下线（'+data[1]+'）'}</span>
                    <div className="triangle3"></div>
                    <img src={require("../../imgs/new/tick.png")} className="tick-icon"/>
                </div>
                <div className="checkbox" onClick={this.changeStatus}>
                    <input className="crStatus" data-status="5" type="checkbox"/>
                    <img src={require("../../imgs/new/status-5.png")} width="30" height="30" />
                    <span className="color6">{'新入网主机（'+data[5]+'）'}</span>
                    <div className="triangle6"></div>
                    <img src={require("../../imgs/new/tick.png")} className="tick-icon"/>
                </div>
                <div className="clearfix"></div>
            </div>
            <div className="filter-3">
                <div className="text">
                    分配状态：
                </div>
                <div className="checkbox" onClick={this.changeStatus}>
                    <input className="usrId" data-status="20" type="checkbox"/>
                    <img src={require("../../imgs/new/status-0-wn.png")} width="30" height="30" />
                    <span className="color9">{'可分配虚拟主机（'+data[20]+'）'}</span>
                    <div className="triangle9"></div>
                    <img src={require("../../imgs/new/tick.png")} className="tick-icon"/>
                </div>
                <div className="checkbox" onClick={this.changeStatus}>
                    <input className="usrId" data-status="21" type="checkbox"/>
                    <img src={require("../../imgs/new/status-1-wn.png")} width="30" height="30"/>
                    <span className="color10">{'已分配虚拟主机（'+data[21]+'）'}</span>
                    <div className="triangle10"></div>
                    <img src={require("../../imgs/new/tick.png")} className="tick-icon"/>
                </div>
                <div className="checkbox" onClick={this.changeStatus}>
                    <input className="usrId" data-status="22" type="checkbox"/>
                    <img src={require("../../imgs/new/status-2-wn.png")} width="30" height="30" />
                    <span className="color11">{'待回收虚拟主机（'+data[22]+'）'}</span>
                    <div className="triangle11"></div>
                    <img src={require("../../imgs/new/tick.png")} className="tick-icon"/>
                </div>
                <div className="clearfix"></div>
            </div>
        </div>
        )
    }
}) ;
export default StatisticsList;