import { apiAsync } from './index'

const getBusinessAccount = async (accessToken) => {
    let response = await apiAsync(`/${accessToken}`, { "fields": "instagram_business_account", "access_token": accessToken })
    return response.instagram_business_account ? response.instagram_business_account.id : null
}

const getMedia = async (businessId, accessToken) => await apiAsync(`/${businessId}/media`, { "fields": "media_url,permalink", "access_token": accessToken })

const getMediaComments = async (mediaId, accessToken) => await apiAsync(`/${mediaId}/comments`, { "fields": "username,text", "access_token": accessToken })

export {
    getBusinessAccount, getMedia, getMediaComments
}