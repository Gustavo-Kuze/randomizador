export const types = {
    SET_USER_PAGES: 'SET_USER_PAGES',
    SET_PAGE_POSTS: 'SET_PAGE_POSTS',
    SET_SELECTED_PAGE: 'SET_SELECTED_PAGE',
    SET_SELECTED_POST: 'SET_SELECTED_POST',
    SET_POST_COMMENTS: 'SET_POST_COMMENTS',
    RESET_STATE: 'RESET_STATE',
}

const INITIAL_STATE = {
    userPages: [],
    pagePosts: [],
    selectedPage: {},
    selectedPost: {},
    comments: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SET_USER_PAGES:
            return { ...state, userPages: action.payload }
        case types.SET_PAGE_POSTS:
            return { ...state, pagePosts: action.payload }
        case types.SET_SELECTED_PAGE:
            return { ...state, selectedPage: action.payload }
        case types.SET_SELECTED_POST:
            return { ...state, selectedPost: action.payload }
        case types.SET_POST_COMMENTS:
            return { ...state, comments: action.payload }
        case types.RESET_STATE:
            return INITIAL_STATE
        default:
            return state
    }
}

export const creators = {
    setUserPages: (pages) => ({
        type: types.SET_USER_PAGES,
        payload: pages
    }),
    setPagePosts: (posts) => ({
        type: types.SET_PAGE_POSTS,
        payload: posts
    }),
    setSelectedPage: (page) => ({
        type: types.SET_SELECTED_PAGE,
        payload: page
    }),
    setSelectedPost: (post) => ({
        type: types.SET_SELECTED_POST,
        payload: post
    }),
    setPostComments: (comments) => ({
        type: types.SET_POST_COMMENTS,
        payload: comments
    }),
    resetFacebookComments: () => ({ type: types.RESET_STATE })
}