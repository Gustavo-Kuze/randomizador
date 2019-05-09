import React, { useState, useEffect } from 'react'
import Template from '../../Template/'
import If from '../../utils/If'
import { toastr } from 'react-redux-toastr'

const FacebookDraw = () => {

    let [loginStatus, setLoginStatus] = useState()

    useEffect(() => {
        if (window.Facebook) {
            window.Facebook.getLoginStatus(function (resp) {
                setLoginStatus(resp.status)

            })
        } else {
            toastr.error('Erro', 'Não foi possível carregar as ferramentas do Facebook, por favor recarregue a página.')
        }

    }, [])

    const facebookLogin = () => {
        window.Facebook.login(function (response) {
            console.log(response)
            window.Facebook.api(
                "/GustavoKuzeTI",
                {
                    "fields": "access_token"
                },
                function (response) {
                    if (response && !response.error) {
                        window.Facebook.api(
                            `/${response.id}/posts`,
                            {
                                "fields": "access_token"
                            },
                            {
                                "access_token": response.access_token
                            },
                            function (response) {
                                // if (response && !response.error) {
                                console.log(response)
                                // }
                            }
                        );
                    }
                }
            );

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