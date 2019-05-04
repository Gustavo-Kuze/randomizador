import types from './types/privateResultsTypes'

export const setPrivateResultOnState = result => {
    return {
        type: types.SET_PRIVATE_RESULT,
        payload: result
    }
}