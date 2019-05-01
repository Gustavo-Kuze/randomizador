import types from '../actions/types/listsTypes'

const STATE = []

export default (state = STATE, action) => {
    switch (action.type) {
        case types.SET_LISTS:
            return [...action.payload]
        default:
            return state
    }
}