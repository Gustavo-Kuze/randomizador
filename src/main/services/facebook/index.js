const apiAsync = (path, params, method = 'get') => {
    return new Promise((res, rej) => {
        try {
            window.Facebook.api(
                path,
                method,
                params,
                (resp) => res(resp)
            )
        } catch (err) {
            rej(err)
        }
    })
}

const getPagePosts = async (pageId, pageAccessToken, limit = 30) =>
    await apiAsync(`/${pageId}/posts`, { "access_token": pageAccessToken, "fields": "message,full_picture", "limit": limit })

const getUserPages = async (userId, accessToken) =>
    await apiAsync(`/${userId || 'me'}/accounts`, { "access_token": accessToken, "fields": "id,name,access_token" })

const getPaginationResult = async (url) => await apiAsync(url)

const getAllComments = async (url, all = []) => {
    let result = await apiAsync(url)
    if (result.data) {
        if (result.paging)
            if (result.paging.next)
                return getAllComments(result.paging.next, [...all, ...result.data])
        return [...all, ...result.data]
    } else {
        return []
    }
}

export {
    apiAsync, getPagePosts, getUserPages,
    getPaginationResult, getAllComments
}