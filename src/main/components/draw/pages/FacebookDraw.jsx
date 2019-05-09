import React, { useState, useEffect } from 'react'
import Template from '../../Template/'
import If from '../../utils/If'
import { toastr } from 'react-redux-toastr'
import { Collapse } from "reactstrap";

let face = null

const FacebookDraw = () => {

    let [loginStatus, setLoginStatus] = useState()
    let [authResult, setAuthResult] = useState()
    let [pageAccessToken, setPageAccessToken] = useState()

    let [stepOneOpen, setStepOneOpen] = useState(true)
    let [stepTwoOpen, setStepTwoOpen] = useState(false)
    let [stepThreeOpen, setStepThreeOpen] = useState(false)
    let [stepFourOpen, setStepFourOpen] = useState(false)

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
            face.api(
                path,
                fields,
                params,
                (resp) => res(resp)
            );
        })
    }

    const getPagePosts = async (pageId) => await apiAsync(`/${pageId}/posts`)

    const getPageAccessToken = async (pageId) => await apiAsync(`/${pageId}`, { "fields": "access_token" }, null)

    const getUserPages = async () => {
        let response = await apiAsync(`/me/accounts`, null, { "access_token": authResult.accessToken })
        console.log(response)
    }

    const facebookLogin = () => {
        face.login((loginResponse) => {
            if (loginResponse.authResult) {
                setAuthResult(loginResponse.authResult)
            } else {
                toastr.error('Erro', 'Aconteceu um problema ao recuperar a chave de acesso, por favor tente novamente mais tarde.')
            }
        }, { scope: 'public_profile,email,manage_pages', return_scopes: true });
    }

    return (
        <Template>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-10 offset-md-2">
                        <h1 className="h2">Sorteio de Comentário do Facebook</h1>
                        <h2 className="h3">Siga os passos a seguir para fazer o sorteio</h2>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12 col-md-10 offset-md-2">
                        <button className="btn btn-outline-primary btn-block text-left"
                            onClick={() => setStepOneOpen(!stepOneOpen)}>1- Permitir que o Randomizador gerencie suas páginas</button>
                        <Collapse isOpen={stepOneOpen}>
                            <div className="card p-5 my-3">
                                <p className="lead">Clique no ícone para fazer login com sua conta do Facebook e permitir o acesso do Randomizador</p>
                                <button className="btn btn-link text-decoration-none" onClick={() => facebookLogin()}>
                                    <i className="fab fa-facebook-square fa-3x"></i>
                                </button>
                            </div>
                        </Collapse>
                        <button className="btn btn-outline-primary btn-block text-left mt-3"
                            onClick={() => setStepTwoOpen(!stepTwoOpen)}>2- Escolher sua página</button>
                        <Collapse isOpen={stepTwoOpen}>
                            <div className="card p-5 my-3">
                            </div>
                        </Collapse>
                        <button className="btn btn-outline-primary btn-block text-left mt-3"
                            onClick={() => setStepThreeOpen(!stepThreeOpen)}>3- </button>
                        <Collapse isOpen={stepThreeOpen}>
                            <div className="card p-5 my-3">
                            </div>
                        </Collapse>
                        <button className="btn btn-outline-primary btn-block text-left mt-3"
                            onClick={() => setStepFourOpen(!stepFourOpen)}>4- </button>
                        <Collapse isOpen={stepFourOpen}>
                            <div className="card p-5 my-3">
                            </div>
                        </Collapse>
                    </div>
                </div>
            </div>
        </Template>
    )
}

export default FacebookDraw