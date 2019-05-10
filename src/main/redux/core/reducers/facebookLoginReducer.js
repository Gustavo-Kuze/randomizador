import types from '../actions/types/facebookLoginTypes'

const STATE = {
    status: 'unknown',
    authResult: null,
    accessToken: null
}

export default (state = STATE, action) => {
    switch (action.type) {
        case types.SET_STATUS:
            return {...state, status: action.payload}
        case types.SET_AUTH_RESULT:
            return {...state, authResult: action.payload}
        case types.SET_ACCESS_TOKEN:
            return {...state, accessToken: action.payload}
        default:
            return state
    }
}