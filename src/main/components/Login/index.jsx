import 'firebaseui/dist/firebaseui.css'
import React, { useEffect, useState } from 'react'
import firebase from '../../services/firebase/'
import * as firebaseui from 'firebaseui'
import Template from '../../components/Template/'
import If from '../utils/If'
import { Redirect } from 'react-router-dom'
import { Spinner, Row, Col } from 'reactstrap'

const Login = () => {

    const [isLoadingUi, setIsLoadingUi] = useState(true)
    const [isSigningInDone, setSigningAsDone] = useState(false)
    const [curUser, setCurUser] = useState({})

    useEffect(() => {
        initializeFirebaseUi()
        if (firebase.auth().currentUser) {
            setCurUser(firebase.auth().currentUser)
            console.log(firebase.auth().currentUser)
        }
    }, [])

    const signInSuccessful = (authResult, resirectUrl) => {
        setSigningAsDone(true)
    }

    const initializeFirebaseUi = () => {
        var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())
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

        ui.start('#firebaseui-auth-container', uiConfig)
    }

    return (
        <>
            {/* <If c={isSigningInDone}>
                <Redirect to="/" />
            </If>
            <If c={!isSigningInDone}> */}
            <Template>
                <div id="firebaseui-auth-container" className={isLoadingUi ? 'invisible' : ''}></div>
                <If c={isLoadingUi}>
                    <Row>
                        <Col className="pl-0" xs={{ size: 6, offset: 6 }}>
                            <Spinner className="mx-0 px-0" color="warning" />
                        </Col>
                    </Row>
                </If>
                <p>
                    <span className="text-primary text-bold">uid: </span><span className="text-secondary">{firebase.auth().currentUser ? firebase.auth().currentUser.uid : ''}</span>
                </p>
                <p>
                    <span className="text-primary text-bold">emailVerified: </span><span className="text-secondary">{firebase.auth().currentUser ? firebase.auth().currentUser.emailVerified ? 'true' : 'false' : ''}</span>
                </p>
                <p>
                    <span className="text-primary text-bold">uid: </span><span className="text-secondary">{firebase.auth().currentUser ? firebase.auth().currentUser.uid : ''}</span>
                </p>
                <p>
                    <span className="text-primary text-bold">displayName: </span><span className="text-secondary">{firebase.auth().currentUser ? firebase.auth().currentUser.displayName : ''}</span>
                </p>
                <p>
                    <span className="text-primary text-bold">email: </span><span className="text-secondary">{firebase.auth().currentUser ? firebase.auth().currentUser.email : ''}</span>
                </p>
                <p>
                    <span className="text-primary text-bold">photoUrl: </span><span className="text-secondary">{firebase.auth().currentUser ? firebase.auth().currentUser.photoUrl : ''}</span>
                </p>
                <button className="btn btn-outline-primary" onClick={() => {
                    
                     let currentUser = firebase.auth().currentUser
                     if (currentUser) {
                         currentUser.sendEmailVerification().then(() => {
                             console.log('confirmação enviada')
                         })
                     }else{
                         alert('usuario não encontrado')
                     }
                }}>Send</button>
            </Template>
            {/* </If> */}
        </>
    )

}

export default Login