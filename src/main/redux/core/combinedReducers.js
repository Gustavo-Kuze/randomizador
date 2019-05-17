import { combineReducers } from 'redux'
import userReducer from './reducers/userReducer'
import listsReducer from './reducers/listsReducer'
import privateResultsReducer from './reducers/privateResultsReducer'
import facebookReducer from './reducers/facebookLoginReducer'
import facebookCommentsReducer from './reducers/facebookCommentsReducer'
import instagramCommentsReducer from './reducers/instagramCommentsReducer'
import { reducer as toastrReducer } from 'react-redux-toastr'

export default combineReducers({
    toastr: toastrReducer,
    user: userReducer,
    lists: listsReducer,
    privateResults: privateResultsReducer,
    facebook: facebookReducer,
    facebookComments: facebookCommentsReducer,
    instagramComments: instagramCommentsReducer,
})