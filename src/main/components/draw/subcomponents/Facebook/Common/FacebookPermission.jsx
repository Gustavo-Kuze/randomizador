import React, {useEffect} from 'react'
import { Collapse } from 'reactstrap'
import { facebookLogin } from "../../../../../services/facebook";
import { setAuthResponse } from '../../../../../redux/core/actions/facebookLoginActions'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'

const FacebookPermission = (props) => {

    useEffect(() => {
        let fbbutton = document.querySelector('.fb-login-button').setAttribute('data-onlogin', 'onLogin')
    }, [])

    const callFacebookLogin = async () => {
        facebookLogin().then((loginResponse) => {
            props.setAuthResponse(loginResponse)
            props.onLogin(loginResponse)
        }).catch(err => {
            props.onError('O servidor do Facebook pode estar fora do ar')
            console.log(err)
        })
    }

    const onLogin = resp => {
debugger
    }

    return (
        <>
            <button className={`btn btn-outline-${props.isInstagram ? 'info' : 'primary'} btn-block text-left mt-3 ${props.enabled ? '' : 'disabled'}`}
                disabled={!props.enabled}
                onClick={() => props.setIsOpen(props.enabled && !props.isOpen)}>1- Permitir que o Randomizador gerencie suas páginas</button>
            <Collapse isOpen={(props.enabled && props.isOpen) || props.isOpen}>
                <div className="card p-5 my-3 ">
                    <div className="card-body d-flex justify-content-center align-items-center flex-column">
                        <p className="lead text-center">Clique no botão abaixo para fazer login com sua conta do Facebook e permitir o acesso do Randomizador</p>
                        {/* <button className="btn btn-primary btn-sm mt-3 d-flex justify-content-center align-items-center" onClick={() => callFacebookLogin()}><i className="fab fa-facebook-square fa-3x pr-3"></i> <span> Continuar com Facebook</span></button> */}
                        <div class="fb-login-button"
                            data-width=""
                            data-size="large"
                            data-button-type="continue_with"
                            data-auto-logout-link="true"
                            data-use-continue-as="false"
                            data-scope="manage_pages,instagram_basic,instagram_manage_comments,pages_show_list"
                            
                            ></div>
                    </div>
                </div>
            </Collapse>
        </>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setAuthResponse
}, dispatch)

export default connect(null, mapDispatchToProps)(FacebookPermission)