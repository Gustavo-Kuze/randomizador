const apiAsync = (path, params, fields) => {
    return new Promise((res, rej) => {
        try {
            face.api(
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

const getPagePosts = async (pageId, pageAccessToken) =>
    await apiAsync(`/${pageId}/posts`, { "access_token": pageAccessToken })

const getPageAccessToken = async (pageId) =>
    await apiAsync(`/${pageId}`, null, { "fields": "access_token" })

const getUserPages = async (accessToken) =>
    await apiAsync(`/me/accounts`, null, { "access_token": accessToken })

export {
    apiAsync, getPageAccessToken, getPagePosts, getUserPages
}