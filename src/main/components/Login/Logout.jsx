import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Spinner } from 'reactstrap'
import firebase from '../../services/firebase/'

const Logout = () => {

    const [isLogoutComplete, setLogoutComplete] = useState()

    useEffect(() => {
        firebase.auth().signOut().then(() => setLogoutComplete(true))
    }, [])

    return (
        <>
            {
                isLogoutComplete ? (
                    <Redirect to="/" />
                ) : <><Spinner className="mx-0 px-0" color="warning" /> <span>Saindo...</span></>
            }
        </>
    )
}

export default Logout
