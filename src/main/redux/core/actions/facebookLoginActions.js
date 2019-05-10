import types from './types/facebookLoginTypes'

export const setStatus = status => {
    return {
        type: types.SET_STATUS,
        payload: status
    }
}

export const setAuthResult = authResult => {
    return {
        type: types.SET_AUTH_RESULT,
        payload: authResult
    }
}

export const setAccessToken = accessToken => {
    return {
        type: types.SET_ACCESS_TOKEN,
        payload: accessToken
    }
}