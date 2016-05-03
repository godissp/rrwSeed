/**
 * Created by Administrator on 2015/12/16.
 */
import {INIT_PAGE_REGION,GET_REGION_DATA,GET_STATISTICS_DATA,GET_VMSTATISTICS_DATA,GET_PHYSICSCOMPUTER_DATA,GET_VMCOMPUTER_DATA,GET_VMLIST_DATA} from './constants'
import {renderRegion,renderStatistics,renderVmstatistics,renderPhysicscomputer,renderVmcomputer,renderVmlist} from './reduceAction'
import pageEvent from '../pageEvent/pageEvent'


export function initPageRegion(url) {
    return {
        type: INIT_PAGE_REGION,
        ajax:true,
        ajaxParam:{
            url: url,
            type: 'get',
            dataType: 'json'
        },
        callBack(v,dispatch){
            dispatch(renderRegion(v))
            pageEvent.fire({ type: 'regionDataDone'})
        },
        failCallBack(v,dispatch){
            // console.log('try')
            // console.log(require('../../json/initPageRegion.json'))
            //alert(JSON.stringify(require('../../json/initPageRegion.json')))
            dispatch(renderRegion(require('../../json/initPageRegion.json')))
            pageEvent.fire({ type: 'regionDataDone'})
        }
    }
}

export function getRegionData(url) {
    return {
        type: GET_REGION_DATA,
        ajax:true,
        ajaxParam:{
            url: url,
            type: 'get',
            dataType: 'json'
        },
        callBack(v,dispatch){
            debugger
            dispatch(renderRegion(v))
        },
        failCallBack(v,dispatch){
            debugger
            dispatch(renderRegion(require('../../json/getRegionData.json')))
        }
    }
}

export function getStatisticsData(url) {
    return {
        type: GET_STATISTICS_DATA,
        ajax:true,
        ajaxParam:{
            url: url,
            type: 'get',
            dataType: 'json'
        },
        callBack(v,dispatch){
            debugger
            dispatch(renderStatistics(v))
        },
        failCallBack(v,dispatch){
            dispatch(renderStatistics(require('../../json/getStatisticsData.json')))
        }
    }
}

export function getVmstatisticsData(url) {
    return {
        type: GET_VMSTATISTICS_DATA,
        ajax:true,
        ajaxParam:{
            url: url,
            type: 'get',
            dataType: 'json'
        },
        callBack(v,dispatch){
            debugger
            dispatch(renderVmstatistics(v))
        },
        failCallBack(v,dispatch){
            dispatch(renderVmstatistics(require('../../json/getVmstatisticsData.json')))
        }
    }
}

export function getPhysicscomputerData(url) {
    return {
        type: GET_PHYSICSCOMPUTER_DATA,
        ajax:true,
        ajaxParam:{
            url: url,
            type: 'get',
            dataType: 'json'
        },
        callBack(v,dispatch){
            debugger
            dispatch(renderPhysicscomputer(v))
        },
        failCallBack(v,dispatch){
            dispatch(renderPhysicscomputer(require('../../json/getPhysicscomputerData.json')))
        }
    }
}
export function getVmcomputerData(url) {
    return {
        type: GET_VMCOMPUTER_DATA,
        ajax:true,
        ajaxParam:{
            url: url,
            type: 'get',
            dataType: 'json'
        },
        callBack(v,dispatch){
            debugger
            dispatch(renderVmcomputer(v))
        },
        failCallBack(v,dispatch){
            dispatch(renderVmcomputer(require('../../json/getVmcomputerData.json')))
        }
    }
}
export function getVmlistData(url) {
    return {
        type: GET_VMLIST_DATA,
        ajax:true,
        ajaxParam:{
            url: url,
            type: 'get',
            dataType: 'json'
        },
        callBack(v,dispatch){
            debugger
            dispatch(renderVmlist(v))
        },
        failCallBack(v,dispatch){
            dispatch(renderVmlist(require('../../json/getVmlistData.json')))
        }
    }
}