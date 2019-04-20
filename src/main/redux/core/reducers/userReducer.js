const STATE = {
    displayName: '',
    email: '',
    
}

export default (state = STATE, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return state
        default:
            return state
    }
}