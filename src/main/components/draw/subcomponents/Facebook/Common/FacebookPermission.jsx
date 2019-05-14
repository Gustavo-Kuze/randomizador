import React, { useState } from 'react'
import { Collapse } from 'reactstrap'
import { facebookLogin } from "../../../../../services/facebook";
import { setAuthResponse } from '../../../../../redux/core/actions/facebookLoginActions'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'

const FacebookPermission = (props) => {

    const callFacebookLogin = async () => {
        facebookLogin().then((loginResponse) => {
            props.setAuthResponse(loginResponse)
            props.onLogin(loginResponse)
            
        }).catch(err => {
            props.onError(err)
        })
    }

    return (
        <>
            <button className={`btn btn-outline-primary btn-block text-left mt-3 ${props.enabled ? '' : 'disabled'}`}
                disabled={!props.enabled}
                onClick={() => props.setIsOpen(props.enabled && !props.isOpen)}>1- Permitir que o Randomizador gerencie suas páginas</button>
            <Collapse isOpen={(props.enabled && props.isOpen) || props.isOpen}>
                <div className="card p-5 my-3">
                    <p className="lead text-center">Clique no ícone para fazer login com sua conta do Facebook e permitir o acesso do Randomizador</p>
                    <button className="btn btn-link text-decoration-none" onClick={() => callFacebookLogin()}><i className="fab fa-facebook-square fa-3x"></i></button>
                </div>
            </Collapse>
        </>
    )
}
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    setAuthResponse
  }, dispatch)
  
  export default connect(null, mapDispatchToProps)(FacebookPermission)