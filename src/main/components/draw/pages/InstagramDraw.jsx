import React, { useEffect } from 'react'
import Template from '../../Template'
import { toastr } from 'react-redux-toastr'
import InstagramSteps from "../subcomponents/Facebook/InstagramComments/InstagramSteps";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import { setAuthResponse, setStatus } from '../../../redux/core/actions/facebookLoginActions'

let face = null

const InstagramDraw = (props) => {

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
                <div className="row mb-5">
                    <div className="col">
                        <h1 className="sofia"><strong>Sorteio de Comentários do Instagram</strong></h1>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12 col-md-10 offset-md-1">
                        <h2 className="h4 mb-4">Siga os passos a seguir para fazer o sorteio</h2>
                        <InstagramSteps />
                    </div>
                </div>
            </div>
        </Template>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setAuthResponse, setStatus
}, dispatch)

export default connect(null, mapDispatchToProps)(InstagramDraw)