import types from './types/privateResults'

export const setPrivateResultOnState = result => {
    return {
        type: types.SET_PRIVATE_RESULT,
        payload: result
    }
}