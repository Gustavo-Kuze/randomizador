import React, { useEffect } from 'react'
import Template from '../../Template/'
import { toastr } from 'react-redux-toastr'
import ChoosePostSteps from "../subcomponents/Facebook/ChoosePostSteps";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import { setAuthResponse, setStatus } from '../../../redux/core/actions/facebookLoginActions'

let face = null

const FacebookDraw = (props) => {

    useEffect(() => {
        if (window.Facebook) {
            face = window.Facebook
            face.getLoginStatus((loginStatusResponse) => {
                props.setStatus(loginStatusResponse.status)
                props.setAuthResponse(face.getAuthResponse())
            })
        } else {
            toastr.error('Erro interno', 'Não foi possível carregar as ferramentas do Facebook, por favor recarregue a página.')
        }

    }, [])

    return (
        <Template>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-10 offset-md-1">
                        <h1 className="h2">Sorteio de Comentário do Facebook</h1>
                        <h2 className="h3">Siga os passos a seguir para fazer o sorteio</h2>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12 col-md-10 offset-md-1">
                        <ChoosePostSteps />
                    </div>
                </div>
            </div>
        </Template>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setAuthResponse, setStatus
}, dispatch)

export default connect(null, mapDispatchToProps)(FacebookDraw)