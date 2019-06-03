import types from '../actions/types/feedbacks'

const STATE = {
    userLiked: false
}

export default (state = STATE, action) => {
    switch (action.type) {
        case types.USER_LIKED:
            return { ...state, userLiked: true }
        case types.USER_CHANGED:
            return { ...state, userLiked: false }
        default:
            return state
    }
}