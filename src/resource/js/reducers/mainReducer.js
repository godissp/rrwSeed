import { combineReducers } from 'redux'
import {RENDER_REGION,SWITCH_REGION,RENDER_STATISTICS,RENDER_VMSTATISTICS,RENDER_PHYSICSCOMPUTER,RENDER_VMCOMPUTER,RENDER_VMLIST,RENDER_ACCORDION,SHOW_SETTING,CHANGE_STATISTICS_TYPE} from '../actions/constants'


function tabs(state = [],action) {
    switch (action.type) {
        case RENDER_REGION:
            var titleList = action.data.filter(function(v,i){
                if(v.areaType === 1){
                    return true
                }
            });
            titleList.unshift({areaId:"", areaName: "全部"});
            titleList.push({areaId:0, areaName: "未分区"});
            return titleList
        default:
            return state
    }
}
function region(state = {areaId: "",areaName: "全部"},action) {
    switch (action.type) {
        case SWITCH_REGION:
            return action.data
        default:
            return state
    }
}
function statistics(state = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],action) {
    switch (action.type) {
        case RENDER_STATISTICS:
            return action.data
        default:
            return state
    }
}
function vmstatistics(state = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],action) {
    switch (action.type) {
        case RENDER_VMSTATISTICS:
            return action.data
        default:
            return state
    }
}
function accordion(state = [],action) {
    switch (action.type) {
        default:
            return state
    }
}
function computerLists(state = [],action) {
    switch (action.type) {
        case RENDER_PHYSICSCOMPUTER:
            return action.data
        default:
            return state
    }
}
function vmcomputerLists(state = [],action) {
    switch (action.type) {
        case RENDER_VMCOMPUTER:
            return action.data
        default:
            return state
    }
}
function vmList(state = [],action) {
    switch (action.type) {
        case RENDER_VMLIST:
            return action.data
        default:
            return state
    }
}
function accordionList(state = [{status:"plus",title:"物理机"},{status:"add",title:"虚拟机"}],action) {
    switch (action.type) {
        case RENDER_ACCORDION:
            return action.data
        default:
            return state
    }
}
function showSetting(state = true,action) {
    switch (action.type) {
        case SHOW_SETTING:
            return action.data
        default:
            return state
    }
}
function statisticsType(state = "physics",action) {
    switch (action.type) {
        case CHANGE_STATISTICS_TYPE:
            return action.data
        default:
            return state
    }
}


const rootReducer = combineReducers({
    tabs,region,statistics,vmstatistics,accordion,computerLists,vmcomputerLists,vmList,accordionList,showSetting,statisticsType
});

export default rootReducer
