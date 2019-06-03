import types from './types/facebookLogin'

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

export const setFB = fb => {
    return {
        type: types.SET_FB,
        payload: fb
    }
}
