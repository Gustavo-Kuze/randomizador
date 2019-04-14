import 'firebaseui/dist/firebaseui.css'
import React, { useEffect, useState } from 'react'
import firebase from '../../services/firebase/'
import * as firebaseui from 'firebaseui'
import Template from '../../components/Template/'
import If from '../utils/If'
import { Redirect } from 'react-router-dom'

const Login = () => {

    const [isLoadingUi, setIsLoadingUi] = useState(true)
    const [isSigningInDone, setIsSigningInDone] = useState(false)

    useEffect(() => { initializeFirebaseUi() }, [])

    const signInSuccessful = (authResult, resirectUrl) => setIsSigningInDone(true)

    const initializeFirebaseUi = () => {
        var uiConfig = {
            signInSuccessUrl: '/',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            callbacks: {
                uiShown: () => setIsLoadingUi(false),
                signInSuccessWithAuthResult: signInSuccessful
            }
        }

        var ui = new firebaseui.auth.AuthUI(firebase.auth())
        ui.start('#firebaseui-auth-container', uiConfig)
    }

    return (
        <>
            <If c={isSigningInDone}>
                <Redirect to="/" />
            </If>
            <If c={!isSigningInDone}>
                <Template>
                    <div id="firebaseui-auth-container"></div>
                </Template>
            </If>
        </>
    )

}
export default Login
