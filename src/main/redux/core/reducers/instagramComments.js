import types from '../actions/types/instagramComments'

const STATE = {
    id: '',
    medias: [],
    selectedMedia: {},
    comments: []
}

export default (state = STATE, action) => {
    switch (action.type) {
        case types.SET_BUSINESS_ID:
            return { ...state, id: action.payload }
        case types.SET_MEDIAS:
            return { ...state, medias: action.payload }
        case types.SET_SELECTED_MEDIA:
            return { ...state, selectedMedia: action.payload }
        case types.SET_COMMENTS:
            return { ...state, comments: action.payload }
        case types.RESET_STATE:
            return STATE
        default:
            return state
    }
}