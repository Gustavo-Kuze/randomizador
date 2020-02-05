/* eslint-disable no-return-await */
const apiAsync = (FB, path, params, method = 'get') => {
  return new Promise((res, rej) => {
    try {
      FB.api(path, method, params, resp => res(resp));
    } catch (err) {
      rej(err);
    }
  });
};

const getPagePosts = async (FB, pageId, pageAccessToken, limit = 30) =>
  await apiAsync(FB, `/${pageId}/posts`, {
    access_token: pageAccessToken,
    fields: 'message,full_picture',
    limit,
  });

const getUserPages = async (FB, userId, accessToken) =>
  await apiAsync(FB, `/${userId || 'me'}/accounts`, {
    access_token: accessToken,
    fields: 'id,name,access_token',
  });

const getPaginationResult = async (FB, url) => await apiAsync(FB, url);

const getAllComments = async (FB, url, all = []) => {
  const result = await apiAsync(FB, url);
  if (result.data) {
    if (result.paging)
      if (result.paging.next)
        return getAllComments(FB, result.paging.next, [...all, ...result.data]);
    return [...all, ...result.data];
  }
  return [];
};

export {
  apiAsync,
  getPagePosts,
  getUserPages,
  getPaginationResult,
  getAllComments,
};
