import React, { useState, useEffect } from 'react'
import Template from '../../Template/'
import If from '../../utils/If'
import { toastr } from 'react-redux-toastr'
import ChoosePostSteps from "../subcomponents/Facebook/ChoosePostSteps";

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
                       <ChoosePostSteps face={face}/>
                    </div>
                </div>
            </div>
        </Template>
    )
}

export default FacebookDraw