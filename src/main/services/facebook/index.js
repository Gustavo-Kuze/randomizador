const apiAsync = (path, params, method = 'get') => {
    return new Promise((res, rej) => {
        try {
            window.Facebook.api(
                path,
                method,
                params,
                (resp) => res(resp)
            );
        } catch (err) {
            rej(err)
        }
    })
}

const facebookLogin = () => {
    return new Promise((res, rej) => {
        window.Facebook.login((loginResponse) => {
            if (loginResponse.authResponse) {
                res(loginResponse.authResponse)
            } else {
                rej('Aconteceu um problema ao recuperar a chave de acesso, por favor tente novamente mais tarde.')
            }
        }, { scope: 'public_profile,email,manage_pages', return_scopes: true });
    })
}

const getPagePosts = async (pageId, pageAccessToken) =>
    await apiAsync(`/${pageId}/posts`, { "access_token": pageAccessToken })

const getUserPages = async (userId, accessToken) =>
    await apiAsync(`/${userId || 'me'}/accounts`, { "access_token": accessToken, "fields": "id,name,access_token" })

export {
    apiAsync, getPagePosts, getUserPages, facebookLogin
}