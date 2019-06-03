import { combineReducers } from 'redux'
import userReducer from './reducers/user'
import listsReducer from './reducers/lists'
import privateResultsReducer from './reducers/privateResults'
import facebookReducer from './reducers/facebookLogin'
import loginReducer from './reducers/login'
import facebookCommentsReducer from './reducers/facebookComments'
import instagramCommentsReducer from './reducers/instagramComments'
import feedbacksReducer from './reducers/feedbacks'
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