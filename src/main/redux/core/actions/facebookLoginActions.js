import types from './types/facebookLoginTypes'

export const setStatus = status => {
    return {
        type: types.SET_STATUS,
        payload: status
    }
}

export const setAuthResponse = authResponse => {
    return {
        type: types.SET_AUTH_RESPONSE,
        payload: authResponse
    }
}
