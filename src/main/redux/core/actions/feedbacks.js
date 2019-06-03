import types from './types/feedbacks'

export const setUserLiked = () => {
    return {
        type: types.USER_LIKED
    }
}

export const setUserChanged = () => {
    return {
        type: types.USER_CHANGED
    }
}