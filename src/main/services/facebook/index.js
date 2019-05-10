const apiAsync = (path, fields = { "fields": "access_token" }, params = { "access_token": pageAccessToken }) => {
    return new Promise((res, rej) => {
        face.api(
            path,
            fields,
            params,
            (resp) => res(resp)
        );
    })
}

const facebookLogin = () => {
    props.face.login((loginResponse) => {
        if (loginResponse.authResult) {
            setAuthResult(loginResponse.authResult)
        } else {
            toastr.error('Erro', 'Aconteceu um problema ao recuperar a chave de acesso, por favor tente novamente mais tarde.')
        }
    }, { scope: 'public_profile,email,manage_pages', return_scopes: true });
}

const getPagePosts = async (pageId) => await apiAsync(`/${pageId}/posts`)

const getPageAccessToken = async (pageId) => await apiAsync(`/${pageId}`, { "fields": "access_token" }, null)

const getUserPages = async () => {
    let response = await apiAsync(`/me/accounts`, null, { "access_token": authResult.accessToken })
    console.log(response)
}


export {
    apiAsync
}