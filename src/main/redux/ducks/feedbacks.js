export const types = {
    USER_LIKED: 'USER_LIKED',
    USER_CHANGED: 'USER_CHANGED',
}

const INITIAL_STATE = {
    userLiked: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.USER_LIKED:
            return { ...state, userLiked: true }
        case types.USER_CHANGED:
            return { ...state, userLiked: false }
        default:
            return state
    }
}

export const creators = {
    setUserLiked: () => ({
        type: types.USER_LIKED
    }),
    setUserChanged: () => ({
        type: types.USER_CHANGED
    }),
}