import 'firebaseui/dist/firebaseui.css'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../../redux/core/actions/userActions'
import firebase from '../../services/firebase/'
import * as firebaseui from 'firebaseui'
import Template from '../../components/Template/'
import If from '../utils/If'
import { Redirect } from 'react-router-dom'
import { Spinner, Row, Col } from 'reactstrap'

const Login = (props) => {

    const [isLoadingUi, setIsLoadingUi] = useState(true)
    const [isSigningInDone, setSigningAsDone] = useState(false)

    useEffect(() => {
        initializeFirebaseUi()
    }, [])

    const signInSuccessful = (authResult, resirectUrl) => {
        const { displayName, email, uid, photoURL, emailVerified } = authResult.user
        props.login({ displayName, email, uid, photoURL, emailVerified })
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
                        <Row>
                            <Col className="pl-0" xs={{ size: 6, offset: 6 }}>
                                <Spinner className="mx-0 px-0" color="warning" />
                            </Col>
                        </Row>
                    </If>
                </Template>
            </If>
        </>
    )

}


const mapDispatchToProps = dispatch => bindActionCreators({
    login
}, dispatch)

export default connect(null, mapDispatchToProps)(Login)