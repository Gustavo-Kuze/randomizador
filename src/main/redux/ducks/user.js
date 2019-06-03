export const types = {
    USER_LOGIN: "USER_LOGIN",
    USER_LOGOUT: "USER_LOGOUT",
}

const INITIAL_STATE = {
    displayName: '',
    email: '',
    photoURL: '',
    emailVerified: false,
    uid: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.USER_LOGIN:
            return action.payload
        case types.USER_LOGOUT:
            return INITIAL_STATE
        default:
            return state
    }
}

export const creators = {
    login: (user) => ({
            type: types.USER_LOGIN,
            payload: user
    }),
    logout: () => ({pe: types.USER_LOGOUT })
}
