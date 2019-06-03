import types from './types/instagramComments'

export const setBusinessId = (id) => {
    return {
        type: types.SET_BUSINESS_ID,
        payload: id
    }
}

export const setMedias = (medias) => {
    return {
        type: types.SET_MEDIAS,
        payload: medias
    }
}

export const setSelectedMedia = (media) => {
    return {
        type: types.SET_SELECTED_MEDIA,
        payload: media
    }
}

export const setComments = (comments) => {
    return {
        type: types.SET_COMMENTS,
        payload: comments
    }
}

export const resetInstagramComments = () => ({ type: types.RESET_STATE })