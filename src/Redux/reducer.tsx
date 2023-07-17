import { combineReducers } from 'redux'
import soReducer from './SO/reducer'

const reducer = combineReducers({
    so : soReducer,
})

export default reducer