const STATE = {
    displayName: '',
    email: '',
    photoURL: '',
    emailVerified: false,
    uid: ''
}

export default (state = STATE, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return action.payload
        case 'USER_LOGOUT':
            return STATE
        default:
            return state
    }
}