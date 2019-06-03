import { combineReducers } from 'redux'
import userReducer from './user'
import listsReducer from './lists'
import privateResultsReducer from './privateResults'
import facebookReducer from './facebookLogin'
import loginReducer from './login'
import facebookCommentsReducer from './facebookComments'
import instagramCommentsReducer from './instagramComments'
import feedbacksReducer from './feedbacks'
import { reducer as toastrReducer } from 'react-redux-toastr'

export default combineReducers({
    toastr: toastrReducer,
    user: userReducer,
    lists: listsReducer,
    privateResults: privateResultsReducer,
    login: loginReducer,
    facebookLogin: facebookReducer,
    facebookComments: facebookCommentsReducer,
    instagramComments: instagramCommentsReducer,
    feedbacks: feedbacksReducer,
})