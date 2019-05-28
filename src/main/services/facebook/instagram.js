import { apiAsync } from './index'

const getBusinessAccountId = async (FB, pageId, accessToken) => {
    let response = await apiAsync(FB, `/${pageId}`, { "fields": "instagram_business_account", "access_token": accessToken })
    return response.instagram_business_account ? response.instagram_business_account.id : null
}

const getMedia = async (FB, businessId, accessToken) => {
    let response = await apiAsync(FB, `/${businessId}/media`, { "fields": "media_url,permalink,caption", "access_token": accessToken })
    return response
}

export {
    getBusinessAccountId, getMedia
}
