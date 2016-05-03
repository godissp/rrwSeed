/**
 * Created by Administrator on 2015/12/15.
 */
import {RENDER_REGION,SWITCH_REGION,RENDER_STATISTICS,RENDER_VMSTATISTICS,RENDER_PHYSICSCOMPUTER,RENDER_VMCOMPUTER,RENDER_VMLIST,RENDER_ACCORDION,SHOW_SETTING,CHANGE_STATISTICS_TYPE} from './constants'

export function renderRegion(data) {
    return {
        type: RENDER_REGION,
        data
    }
}
export function switchRegion(data) {
    return {
        type: SWITCH_REGION,
        data
    }
}
export function renderStatistics(data) {
    return {
        type: RENDER_STATISTICS,
        data
    }
}
export function renderVmstatistics(data) {
    return {
        type: RENDER_VMSTATISTICS,
        data
    }
}
export function renderPhysicscomputer(data) {
    return {
        type: RENDER_PHYSICSCOMPUTER,
        data
    }
}
export function renderVmcomputer(data) {
    return {
        type: RENDER_VMCOMPUTER,
        data
    }
}
export function renderVmlist(data) {
    return {
        type: RENDER_VMLIST,
        data
    }
}
export function renderAccordion(data) {
    return {
        type: RENDER_ACCORDION,
        data
    }
}
export function showSetting(data) {
    return {
        type: SHOW_SETTING,
        data
    }
}
export function changeStatisticsType(data) {
    return {
        type: CHANGE_STATISTICS_TYPE,
        data
    }
}

