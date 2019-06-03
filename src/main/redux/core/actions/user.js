import types from './types/user'

export const login = (user) => {
    return {
        type: types.USER_LOGIN,
        payload: user
    }
}

export const logout = () => {
    return { type: types.USER_LOGOUT }
}