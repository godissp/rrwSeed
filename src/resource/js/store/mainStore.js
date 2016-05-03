import { createStore, applyMiddleware } from 'redux'
import ajaxMiddleware from 'redux-ajax'
import createLogger from 'redux-logger'
import rootReducer from '../reducers/mainReducer'
import {getRegionData,getStatisticsData,getVmstatisticsData,getPhysicscomputerData,getVmcomputerData} from '../actions/ajaxActions.js'

/**
 * 为store添加ajax和log的中间件
 */
const createStoreWithMiddleware = applyMiddleware(
    ajaxMiddleware
)(createStore)

/**
 * 生成新的createStore方法，为configureStore
 */
function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState)
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')
            store.replaceReducer(nextRootReducer)
        })
    }
    return store
}

/**
 * 实例化一个store并exoprt
 */
var store = configureStore()

export default configureStore
export {store}