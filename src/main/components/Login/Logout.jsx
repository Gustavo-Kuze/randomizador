import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../../redux/core/actions/userActions'
import { Spinner } from 'reactstrap'
import firebase from '../../services/firebase/'

const Logout = (props) => {

    const [isLogoutComplete, setLogoutComplete] = useState()

    useEffect(() => {
        firebase.auth().signOut().then(() => {
            props.logout()            
            setLogoutComplete(true)
        })
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

const mapDispatchToProps = dispatch => bindActionCreators({
    logout
}, dispatch)

export default connect(null, mapDispatchToProps)(Logout)