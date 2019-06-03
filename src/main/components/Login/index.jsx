import 'firebaseui/dist/firebaseui.css'
import React, { useEffect, useState } from 'react'
import firebase from '../../services/firebase/'
import * as firebaseui from 'firebaseui'
import Template from '../../components/Template/'
import If from '../utils/If'
import { Redirect } from 'react-router-dom'
import { Spinner, Container, Row, Col } from 'reactstrap'
import { toastr } from 'react-redux-toastr'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setAuthResult } from "../../redux/core/actions/login"
import { log } from '../../services/logger/'
import { setUserChanged } from "../../redux/core/actions/feedbacks"

const Login = (props) => {

    const [isLoadingUi, setIsLoadingUi] = useState(true)
    const [isSigningInDone, setSigningAsDone] = useState(false)

    useEffect(() => {
        initializeFirebaseUi()
    }, [])

    function signInSuccessful(authResult, resirectUrl) {
        if (!authResult.user.emailVerified) {
            firebase.auth().currentUser.sendEmailVerification().then(() => {
                toastr.success('E-mail enviado', 'Verificação de e-mail enviada com sucesso')
            })
        }
        props.setAuthResult(authResult)
        setSigningAsDone(true)
        props.setUserChanged()
        return false
    }

    function signInFailure(err) {
        log(`[ERRO] ao tentar fazer LOGIN em Login index: ${err.message}`,
            props.uid,
            props.login).then(logId => {
                toastr.error('Error logged', `Log ID: ${logId}`)
            }).catch(err => toastr.error('LOG ERROR',
                'Não foi possível criar o logde ERRO. Erro ao tentar fazer LOGIN em Login index'))
    }

    const initializeFirebaseUi = () => {
        var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())
        var uiConfig = {
            signInSuccessUrl: '/',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                {
                    provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                    scopes: [
                        'email',
                        'public_profile',
                        'pages_show_list',
                        'manage_pages'
                    ]
                }
            ],
            callbacks: {
                uiShown: () => setIsLoadingUi(false),
                signInSuccessWithAuthResult: signInSuccessful,
                signInFailure: signInFailure
            }
        }

        ui.start('#firebaseui-auth-container', uiConfig)
    }

    return (
        <>
            <If c={isSigningInDone}>
                <Redirect to={props.redirectURL || '/'} />
            </If>
            <If c={!isSigningInDone}>
                <Template>

                    <h1 className="my-5 lobster text-center h3">Escolha um método de login</h1>
                    <div id="firebaseui-auth-container" className={isLoadingUi ? 'invisible' : ''}></div>
                    <If c={isLoadingUi}>
                        <div className="row">
                            <div className="col-8 offset-2 d-flex justify-content-center align-items-center">
                                <Spinner className="mx-0 px-0" color="warning" />
                            </div>
                        </div>
                    </If>
                    <Container className="mt-5">
                        <Row>
                            <Col xs={{ size: '10', offset: '1' }}>
                                <p className="lead"><span className="text-warning"><strong>Atenção!</strong></span> Você será redirecionado para o link do provedor de login que escolher. Caso clique em um dos botões de login e nada aconteça, pode ser que uma extensão em seu navegador esteja bloqueando o redirecionamento!</p>
                            </Col>
                        </Row>
                    </Container>
                </Template>
            </If>
        </>
    )

}

const mapStateToProps = state => ({
    login: state.login,
    uid: state.user.uid
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setAuthResult, setUserChanged
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)