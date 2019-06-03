import types from './types/facebookComments'

export const setUserPages = (pages) => {
    return {
        type: types.SET_USER_PAGES,
        payload: pages
    }
}

export const setPagePosts = (posts) => {
    return {
        type: types.SET_PAGE_POSTS,
        payload: posts
    }
}

export const setSelectedPage = (page) => {
    return {
        type: types.SET_SELECTED_PAGE,
        payload: page
    }
}

export const setSelectedPost = (post) => {
    return {
        type: types.SET_SELECTED_POST,
        payload: post
    }
}

export const setPostComments = (comments) => {
    return {
        type: types.SET_POST_COMMENTS,
        payload: comments
    }
}

export const resetFacebookComments = () => ({ type: types.RESET_STATE })
