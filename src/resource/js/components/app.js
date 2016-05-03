/**
 * Created by sp on 2015/12/17.
 */
/**
 * 导入jquery，以及相关jquery插件
 */
import $ from 'jquery';
import  '../../../lib/jquery/jquery-window.js';
import  '../../../lib/jquery/jquery-loadinger.js';

/**
 * 导入react，redux，store以及相关action
 */
import React from 'react'
import { connect } from 'react-redux'
import { store } from '../store/mainStore'
import {getRegionData,getStatisticsData,getVmstatisticsData,getPhysicscomputerData,getVmcomputerData,getVmlistData} from '../actions/ajaxActions.js'
import {switchRegion,renderAccordion,showSetting,changeStatisticsType} from '../actions/reduceAction.js'


/**
 * 导入react ui组件
 */
import Tabs from '../../../component/tabs/gonabe_tabs.js';
import Accordion from '../../../component/accordion/gonabe_accordion.js';
import StatisticsList from './statisticsList.js';
import VmStatisticsList from './vmStatisticsList.js';
import ComputerList from './computerList.js';
import VmComputerList from './vmComputerList.js';
import VmList from './vmList.js';


var App = React.createClass({
    //点击物理机显示虚拟机列表
    showVmList:function(id,name){
        $(".details-wrap").height("30%");
        $(".main-wrap").height($(window).height()*0.7-56);
        $(".details-table tbody").height($(window).height()*0.3-45);
        $(".details-table").css({opacity:1});
        this.setState({physicsName:name})
        var vmurl = "/dbp/service/infra/getVCRListInfoByPhyCRID/"+id
        store.dispatch(getVmlistData(vmurl))
    },
    updateEle:function(obj){
        this.setState({areaId:obj.areaId,areaName:obj.areaName});
        var areaId = obj.areaId;
        var statisticsurl = "";
        var vmstatisticsurl = "";
        var physicsurl = "";
        var vmurl = "";

        if(areaId === ""){
            physicsurl = "/dbp/service/infra/getPhyCRListInfo" ;
            vmurl = "/dbp/service/infra/getVCRListInfo" ;
            statisticsurl = "/dbp/service/infra/getQuanbuAreaComCount" ;
            vmstatisticsurl = "/dbp/service/infra/getQuanbuVCRCount" ;
        }else if(areaId === 0){
            physicsurl = "/dbp/service/infra/getUnAllotPhyCRList" ;
            vmurl = "/dbp/service/infra/getUnAllotVCRList" ;
            statisticsurl = "/dbp/service/infra/getWeifenquAreaComCount" ;
            vmstatisticsurl = "/dbp/service/infra/getWeifenquVCRCount" ;
        }else{
            physicsurl = "/dbp/service/infra/getPhyCRListByAreaID/"+areaId;
            vmurl = "/dbp/service/infra/getVCRListByAreaID/"+areaId;
            statisticsurl = "/dbp/service/infra/getComCountByAreaID/"+areaId;
            vmstatisticsurl = "/dbp/service/infra/getVCRCountByAreaID/"+areaId+"/commit";
        }
        store.dispatch(switchRegion(obj))
        store.dispatch(getPhysicscomputerData(physicsurl))
        store.dispatch(getVmcomputerData(vmurl))
        store.dispatch(getStatisticsData(statisticsurl))
        store.dispatch(getVmstatisticsData(vmstatisticsurl))
    },
    updateFilter:function(){
        this.forceUpdate() ;
    },
    changeStatistics:function(obj){
        if(obj.title==="物理机"){
            store.dispatch(changeStatisticsType("physics"))
        }else{
            store.dispatch(changeStatisticsType("vm"))
        }
    },
    setResource:function(){
        var updateData = function(){
            this.updateEle(store.getState().region)
        }.bind(this)
        var win = $.window({id:"flow-after",title:"物理资源划分",close:true, width:1100,height:650});
        var iframe = document.createElement("iframe");
        iframe.src = "/dbp/pages/inframonitor/AreaCRUpdate.jsp?"+encodeURIComponent('areaid='+this.state.areaId+'&areaName='+this.state.areaName+'&type=physics')
        iframe.width = "99%";
        iframe.height = "99%";
        win.empty().append(iframe);
        iframe.contentWindow.win = win;
        iframe.contentWindow.updateData = updateData;
        //win.empty().append('<iframe src="/dbp/pages/inframonitor/AreaCRUpdate.jsp?'+encodeURIComponent('areaid='+this.state.areaId+'&areaName='+this.state.areaName+'&type=physics')+'" width="99%" height="99%" />');
    },
    getInitialState:function(){
        return {areaId:"",physicsName:""}
    },
    render:function(){
        var listsData = this.props.accordionList;
        listsData[0].content = <ComputerList  showVmList={this.showVmList} listData={this.props.computerLists}/>;
        listsData[1].content = <VmComputerList showVmList={this.showVmList} listData={this.props.vmcomputerLists}/>;
        return (
            <div>
                <div className="setting" onClick={this.setResource} title="资源设置" style={{display:this.state.areaId?"block":"none"}}>设置</div>
                <Tabs data={this.props.tabs} dataMap={{"name":"areaName"}} doSomething={this.updateEle}/>
                <div className="main-wrap" style={{height:$(window).height()-56+"px"}}>
                    <div className="statistics">
                        {this.props.statisticsType==="physics"?<StatisticsList doSomething = {this.updateFilter} listData={this.props.statistics}/>:<VmStatisticsList doSomething = {this.updateFilter} listData={this.props.vmstatistics}/>}
                        <div className="clearfix"></div>
                    </div>
                    <div className="lists">
                        <Accordion  data={listsData}  doSomething={this.changeStatistics}/>
                    </div>
                </div>
                <div className="details-wrap">
                    <VmList  physicsName={this.state.physicsName} listData={this.props.vmList}/>
                </div>
            </div>
        )
    }
});

//将store的state中的key，value映射到App的props中
function mapStateToProps(state){
    var props = {};
    Object.keys(state).forEach(function(key){
        props[key] = state[key]
    })
    return props
}
console.log(connect)
export default App = connect(
    mapStateToProps
)(App)

