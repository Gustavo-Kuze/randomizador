import types from './types/login'

export const setAuthResult = authResult => {
    return {
        type: types.SET_AUTH_RESULT,
        payload: authResult
    }
}
