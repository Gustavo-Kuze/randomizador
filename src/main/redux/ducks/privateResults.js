export const types = {
    SET_PRIVATE_RESULT: 'SET_PRIVATE_RESULT'
}

const INITIAL_STATE = {
    currentPrivateResult: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SET_PRIVATE_RESULT:
            return { ...state, currentPrivateResult: action.payload }
        default:
            return state
    }
}

export const creators = {
    setPrivateResultOnState: result => ({
        type: types.SET_PRIVATE_RESULT,
        payload: result
    })
}