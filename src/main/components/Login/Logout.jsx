import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../../redux/core/actions/user'
import { Spinner, Container, Col, Row } from 'reactstrap'
import firebase from '../../services/firebase/'
import { toastr } from 'react-redux-toastr'
import { log } from '../../services/logger/'
import { setUserChanged } from '../../redux/core/actions/feedbacks'

const Logout = (props) => {

    const [isLogoutComplete, setLogoutComplete] = useState()

    useEffect(() => {
        firebase.auth().signOut().then(() => {
            toastr.success('Sucesso', 'Você saiu de sua conta. Clique no botão login, no menu, para entrar novamente!')
            props.logout()
            setLogoutComplete(true)
            props.setUserChanged()
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
                ) : <Container fluid className="mt-5">
                        <Row>
                            <Col xs={{ size: 2, offset: 5 }} className="d-flex justify-content-center align-items-center flex-column">
                                <Spinner className="mx-0 px-0" color="warning" /> <span>Saindo...</span>
                            </Col>
                        </Row >
                    </Container >
            }
        </>
    )
}

const mapStateToProps = state => ({
    login: state.login,
    uid: state.user.uid
})

const mapDispatchToProps = dispatch => bindActionCreators({
    logout, setUserChanged
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Logout)