import React, { useState } from 'react'
import { Collapse } from "reactstrap";
import { toastr } from 'react-redux-toastr'

const ChoosePostSteps = (props) => {

  let [stepOneOpen, setStepOneOpen] = useState(true)
  let [stepTwoOpen, setStepTwoOpen] = useState(false)
  let [stepThreeOpen, setStepThreeOpen] = useState(false)
  let [stepFourOpen, setStepFourOpen] = useState(false)

  const facebookLogin = () => {
    props.face.login((loginResponse) => {
      if (loginResponse.authResult) {
        setAuthResult(loginResponse.authResult)
      } else {
        toastr.error('Erro', 'Aconteceu um problema ao recuperar a chave de acesso, por favor tente novamente mais tarde.')
      }
    }, { scope: 'public_profile,email,manage_pages', return_scopes: true });
  }

  return <>
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
  </>
}

export default ChoosePostSteps