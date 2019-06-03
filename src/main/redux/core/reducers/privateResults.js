import types from '../actions/types/privateResults'

const STATE = {
    currentPrivateResult: {}
}

export default (state = STATE, action) => {
    switch (action.type) {
        case types.SET_PRIVATE_RESULT:
            return { ...state, currentPrivateResult: action.payload }
        default:
            return state
    }
}