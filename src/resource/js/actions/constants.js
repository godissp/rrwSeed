/**
 * Created by Administrator on 2015/12/16.
 */

/**
 * actions to ajax
 */
//获得分区列表数据，并初始化页面
export const INIT_PAGE_REGION = 'INIT_PAGE_REGION'
//获取分区列表数据，并更新store
export const GET_REGION_DATA = 'GET_REGION_DATA'
//获取物理机统计数据，并更新store
export const GET_STATISTICS_DATA = 'GET_STATISTICS_DATA'
//获取虚拟机数据，并更新store
export const GET_VMSTATISTICS_DATA = 'GET_VMSTATISTICS_DATA'
//获取物理列表数据，并更新store
export const GET_PHYSICSCOMPUTER_DATA = 'GET_PHYSICSCOMPUTER_DATA'
//获取虚拟列表数据，并更新store
export const GET_VMCOMPUTER_DATA = 'GET_VMCOMPUTER_DATA'
//获取某个物理机对应的虚拟列表数据，并更新store
export const GET_VMLIST_DATA = 'GET_VMLIST_DATA'


/**
 * actions to reducers
 */
//更新分区列表
export const RENDER_REGION = 'RENDER_REGION'
//切换分区信息
export const SWITCH_REGION = 'SWITCH_REGION'
//更新物理统计数据
export const RENDER_STATISTICS = 'RENDER_STATISTICS'
//更新虚拟机统计数据
export const RENDER_VMSTATISTICS = 'RENDER_VMSTATISTICS'
//更新物理机列表
export const RENDER_PHYSICSCOMPUTER = 'RENDER_PHYSICSCOMPUTER'
//更新虚拟机列表
export const RENDER_VMCOMPUTER = 'RENDER_VMCOMPUTER'
//更新下来虚拟机列表
export const RENDER_VMLIST = 'RENDER_VMLIST'
//更新折叠窗信息
export const RENDER_ACCORDION = 'RENDER_ACCORDION'
//更新统计列表显示状态
export const CHANGE_STATISTICS_TYPE = 'CHANGE_STATISTICS_TYPE'

//暂未使用
export const SHOW_SETTING = 'SHOW_SETTING'