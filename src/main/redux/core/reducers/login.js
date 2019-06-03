import types from '../actions/types/login'

const STATE = {
}

export default (state = STATE, action) => {
    switch (action.type) {
        case types.SET_AUTH_RESULT:
            return action.payload
        default:
            return state
    }
}