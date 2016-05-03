/**
 * Created by Administrator on 2015/11/13.
 */
/**
 * 导入页面样式
 */
import  './css/bootstrap.min2.css'
import  './css/ComResourceMonitor.css'
import  './css/new.css'
import  './css/jquery-window.css'
import  '../lib/jquery/jquery-loadinger.css';


/**
 * 导入react，redux，store以及相关action
 */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './js/components/app'
import { store } from './js/store/mainStore'
import pageEvent from './js/pageEvent/pageEvent'
import { initPageRegion,getPhysicscomputerData,getVmcomputerData,getStatisticsData,getVmstatisticsData } from './js/actions/ajaxActions'
import  './lib/bootstrap.min.js';
import './js/winjs/plugin.js'

/**
 * 禁用右键按钮
 */
document.addEventListener("contextmenu",function(e){
    e.preventDefault()
})


/**
 * 获得分区列表数据后，初始化页面
 */
pageEvent.addHandler('regionDataDone',function(){
    console.log(React)
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.body
    )
    store.dispatch(getPhysicscomputerData("/dbp/service/infra/getPhyCRListInfo"))
    store.dispatch(getVmcomputerData("/dbp/service/infra/getVCRListInfo"))
    store.dispatch(getStatisticsData("/dbp/service/infra/getQuanbuAreaComCount"))
    store.dispatch(getVmstatisticsData("/dbp/service/infra/getQuanbuVCRCount"))
    debugger
    setInterval(function(){
        var areaId = store.getState().region.areaId;
        var statisticsurl = ""
        var vmstatisticsurl = ""
        var physicsurl = "";
        var vmurl = ""
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
        store.dispatch(getPhysicscomputerData(physicsurl))
        store.dispatch(getVmcomputerData(vmurl))
        store.dispatch(getStatisticsData(statisticsurl))
        store.dispatch(getVmstatisticsData(vmstatisticsurl))
    },5000);


});

/**
 * 初始化分区列表数据，在action的callback回到中触发regionDataDone自定义事件
 */
store.dispatch(initPageRegion("/dbp/service/infra/getAreaList"))





