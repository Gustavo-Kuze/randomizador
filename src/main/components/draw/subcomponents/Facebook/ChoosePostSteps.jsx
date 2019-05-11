import React, { useState } from 'react'
import { Collapse } from "reactstrap";
import { toastr } from 'react-redux-toastr'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import { setAuthResult } from '../../../../redux/core/actions/facebookLoginActions'
import { facebookLogin } from "../../../../services/facebook";

const ChoosePostSteps = (props) => {

  let [stepOneOpen, setStepOneOpen] = useState(true)
  let [stepTwoOpen, setStepTwoOpen] = useState(false)
  let [stepThreeOpen, setStepThreeOpen] = useState(false)
  let [stepFourOpen, setStepFourOpen] = useState(false)

  const callFacebookLogin = async () => {
    facebookLogin().then((loginResponse) => {
      props.setAuthResult(loginResponse.authResult)
    }).catch(err => {
      toastr.error('Erro', err)
    })
  }

  return <>
    <button className="btn btn-outline-primary btn-block text-left"
      onClick={() => setStepOneOpen(!stepOneOpen)}>1- Permitir que o Randomizador gerencie suas páginas</button>
    <Collapse isOpen={stepOneOpen}>
      <div className="card p-5 my-3">
        <p className="lead">Clique no ícone para fazer login com sua conta do Facebook e permitir o acesso do Randomizador</p>
        <button className="btn btn-link text-decoration-none" onClick={() => callFacebookLogin()}>
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
  </>
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setAuthResult
}, dispatch)

export default connect(null, mapDispatchToProps)(ChoosePostSteps)