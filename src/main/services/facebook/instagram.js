import { apiAsync } from './index'

const getBusinessAccountId = async (pageId, accessToken) => {
    let response = await apiAsync(`/${pageId}`, { "fields": "instagram_business_account", "access_token": accessToken })
    return response.instagram_business_account ? response.instagram_business_account.id : null
}

const getMedia = async (businessId, accessToken) => {
    let response = await apiAsync(`/${businessId}/media`, { "fields": "media_url,permalink,caption", "access_token": accessToken })
    return response
}

export {
    getBusinessAccountId, getMedia
}
