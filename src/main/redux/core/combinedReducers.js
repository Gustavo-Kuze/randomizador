import { combineReducers } from 'redux'
import userReducer from './reducers/userReducer'
import { reducer as toastrReducer } from 'react-redux-toastr'

export default combineReducers({
    toastr: toastrReducer,
    user: userReducer
})