import React, { useState, useEffect } from 'react'
import Template from '../../Template/'
import If from '../../utils/If'
import { toastr } from 'react-redux-toastr'

let face = null

const FacebookDraw = () => {

    let [loginStatus, setLoginStatus] = useState()
    let [authResult, setAuthResult] = useState()
    let [pageAccessToken, setPageAccessToken] = useState()

    useEffect(() => {
        if (window.Facebook) {
            face = window.Facebook
            face.getLoginStatus((loginStatusResponse) => {
                setLoginStatus(loginStatusResponse.status)
                setAuthResult(face.getAuthResponse())
            })
        } else {
            toastr.error('Erro interno', 'Não foi possível carregar as ferramentas do Facebook, por favor recarregue.')
        }

    }, [])

    const apiAsync = (path, fields = { "fields": "access_token" }, params = { "access_token": pageAccessToken }) => {
        return new Promise((res, rej) => {
            if (pageAccessToken) {
                face.api(
                    path,
                    fields,
                    params,
                    (resp) => res(resp)
                );
            } else {
                rej('pageAccessToken vazio')
            }
        })
    }

    const getPagePosts = async (pageId) => await apiAsync(`/${pageId}/posts`)

    const getPageAccessToken = async (pageId) => await apiAsync(`/${pageId}`, fields = { "fields": "access_token" }, null)

    const facebookLogin = () => {
        face.login((loginResponse) => {

        }, { scope: 'public_profile,email,manage_pages', return_scopes: true });
    }

    return (
        <Template>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Facebook</h1>
                        <If c={loginStatus !== 'connected'}>
                            <p>Clique no botão a seguir para entrar com sua conta do Facebook e começar a sortear comentários!</p>
                            <button className="btn btn-link text-decoration-none" onClick={() => facebookLogin()}>
                                <i className="fab fa-facebook-square fa-3x"></i>
                            </button>
                        </If>
                    </div>
                </div>
            </div>
        </Template>
    )
}

export default FacebookDraw