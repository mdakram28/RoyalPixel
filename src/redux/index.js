import { combineReducers } from 'redux'
import commonReducer from './commonReducer'
import espReducer from './espReducer'

export default combineReducers({
    common: commonReducer,
    esp: espReducer
})