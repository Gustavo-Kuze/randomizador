import 'firebaseui/dist/firebaseui.css'
import React, { useEffect, useState } from 'react'
import firebase from '../../services/firebase/'
import * as firebaseui from 'firebaseui'
import Template from '../../components/Template/'
import If from '../utils/If'
import { Redirect } from 'react-router-dom'
import { Spinner } from 'reactstrap'
import { toastr } from 'react-redux-toastr'

const Login = (props) => {

    const [isLoadingUi, setIsLoadingUi] = useState(true)
    const [isSigningInDone, setSigningAsDone] = useState(false)

    useEffect(() => {
        initializeFirebaseUi()
    }, [])

    const signInSuccessful = (authResult, resirectUrl) => {
        if (!authResult.user.emailVerified) {
            firebase.auth().currentUser.sendEmailVerification().then(() => {
                toastr.success('E-mail enviado', 'Verificação de e-mail enviada com sucesso')
            })
        }
        setSigningAsDone(true)
    }

    const initializeFirebaseUi = () => {
        var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())
        var uiConfig = {
            signInSuccessUrl: '/',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID
            ],
            callbacks: {
                uiShown: () => setIsLoadingUi(false),
                signInSuccessWithAuthResult: signInSuccessful
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
                    <div id="firebaseui-auth-container" className={isLoadingUi ? 'invisible' : ''}></div>
                    <If c={isLoadingUi}>
                        <div className="row">
                            <div className="col-8 offset-2 d-flex justify-content-center align-items-center">
                                <Spinner className="mx-0 px-0" color="warning" />
                            </div>
                        </div>
                    </If>
                </Template>
            </If>
        </>
    )

}

export default Login