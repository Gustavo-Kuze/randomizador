export const types = {
    SET_AUTH_RESULT: "SET_AUTH_RESULT",
}

const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SET_AUTH_RESULT:
            return action.payload
        default:
            return state
    }
}

export const creators = {
    setAuthResult: authResult => ({
        type: types.SET_AUTH_RESULT,
        payload: authResult
    })
}