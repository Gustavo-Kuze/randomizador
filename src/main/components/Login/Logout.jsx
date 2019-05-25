import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../../redux/core/actions/userActions'
import { Spinner } from 'reactstrap'
import firebase from '../../services/firebase/'
import { toastr } from 'react-redux-toastr'
import { log } from '../../services/logger/'

const Logout = (props) => {

    const [isLogoutComplete, setLogoutComplete] = useState()

    useEffect(() => {
        firebase.auth().signOut().then(() => {
            toastr.success('Sucesso', 'Você saiu de sua conta. Clique no botão login, no menu, para entrar novamente!')
            props.logout()
            setLogoutComplete(true)
        }).catch(err => {
            log(`[ERRO] ao tentar fazer LOGOUT em Logout: ${err.message}`,
                props.uid,
                props.login).then(logId => {
                    toastr.error('Error logged', `Log ID: ${logId}`)
                }).catch(err => toastr.error('LOG ERROR',
                    'Não foi possível criar o log de ERRO. Erro ao tentar fazer LOGOUT em Logout'))
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

const mapStateToProps = state => ({
    login: state.login,
    uid: state.user.uid
})

const mapDispatchToProps = dispatch => bindActionCreators({
    logout
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Logout)