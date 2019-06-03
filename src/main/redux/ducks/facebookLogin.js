export const types = {
    SET_STATUS: 'SET_STATUS',
    SET_AUTH_RESPONSE: 'SET_AUTH_RESPONSE',
    SET_STATUS_SAGA: 'SET_STATUS_SAGA',
    SET_AUTH_RESPONSE_SAGA: 'SET_AUTH_RESPONSE_SAGA',
    SET_FB: 'SET_FB',
}
const INITIAL_STATE = {
    status: 'unknown',
    authResponse: null,
    FB: undefined
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SET_STATUS:
            return {...state, status: action.payload}
        case types.SET_AUTH_RESULT:
            return {...state, authResponse: action.payload}
        case types.SET_FB:
            return {...state, FB: action.payload}
        default:
            return state
    }
}

export const creators = {
    setStatus: status => ({
        type: types.SET_STATUS,
        payload: status
    }),
    setAuthResponse: authResponse => ({
        type: types.SET_AUTH_RESPONSE,
        payload: authResponse
    }),
    setFB: fb => ({
        type: types.SET_FB,
        payload: fb
    }),
}