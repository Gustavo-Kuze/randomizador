import types from '../actions/types/facebookCommentsTypes'

const STATE = {
    userPages: [],
    pagePosts: [],
    selectedPage: null,
    selectedPost: null,
}

export default (state = STATE, action) => {
    switch (action.type) {
        case types.SET_USER_PAGES:
            return { ...state, userPages: action.payload }
        case types.SET_PAGE_POSTS:
            return { ...state, pagePosts: action.payload }
        case types.SET_SELECTED_PAGE:
            return { ...state, selectedPage: action.payload }
        case types.SET_SELECTED_POST:
            return { ...state, selectedPost: action.payload }
        default:
            return state
    }
}