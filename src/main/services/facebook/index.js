const apiAsync = (path, params, fields) => {
    return new Promise((res, rej) => {
        try {
            window.Fabebook.api(
                path,
                fields,
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
            if (loginResponse.authResult) {
                res(loginResponse.authResult)
            } else {
                rej('Aconteceu um problema ao recuperar a chave de acesso, por favor tente novamente mais tarde.')
            }
        }, { scope: 'public_profile,email,manage_pages', return_scopes: true });
    })
}

const getPagePosts = async (pageId, pageAccessToken) =>
    await apiAsync(`/${pageId}/posts`, { "access_token": pageAccessToken })

const getPageAccessToken = async (pageId) =>
    await apiAsync(`/${pageId}`, null, { "fields": "access_token" })

const getUserPages = async (accessToken) =>
    await apiAsync(`/me/accounts`, null, { "access_token": accessToken })

export {
    apiAsync, getPageAccessToken, getPagePosts, getUserPages, facebookLogin
}