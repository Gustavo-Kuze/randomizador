import '../css/Header.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../services/firebase/'

import {
    Modal,
    ModalHeader,
    ModalBody,
    ListGroup,
} from 'reactstrap'

const Header = props => {
    const [openMenu, toggleMenu] = useState(false)
    const [userName, setUserName] = useState('Convidado')

    const callToggleMenu = () => toggleMenu(!openMenu)

    useEffect(() => {
        if (firebase.auth().currentUser) {
            if (firebase.auth().currentUser.displayName) {
                setUserName(firebase.auth().currentUser.displayName)
            }
        }
    })

    return (
        <>
            <nav className="navbar fixed-top navbar-dark bg-warning ">
                <div className="mx-auto flex-grow-1">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-6 col-sm-10 offset-sm-1 text-center">
                                <Link to="/" className="text-decoration-none">
                                    <h1 className="brand-title sofia">Randomizador</h1>
                                </Link>
                            </div>
                            <div className="col-6 col-sm-1">
                                <button
                                    onClick={callToggleMenu}
                                    className="btn btn-link btn-warning float-right">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <Modal isOpen={openMenu} toggle={callToggleMenu} centered size="sm">
                <ModalHeader className="bg-warning text-center text-light">Menu</ModalHeader>
                <ModalBody className="">
                    <p className="lead">{`Bem-vindo, ${userName}`}</p>
                    <ListGroup className="text-center">
                        <Link to="/user/lists" className="list-group-item list-group-item-action" >Minhas listas</Link>
                        <Link to="/numbers" className="list-group-item list-group-item-action" >Sorteio de números</Link>
                        <Link to="/shuffle" className="list-group-item list-group-item-action" >Embaralhador de frases</Link>
                        <Link to="/headortails" className="list-group-item list-group-item-action" >Cara ou Coroa</Link>
                        <hr />
                        <Link to="/about" className="list-group-item list-group-item-action" >Sobre</Link>
                        <hr />
                        <Link to="/login" className="list-group-item list-group-item-action bg-primary text-light" >Login</Link>
                        <Link to="/logout" className="list-group-item list-group-item-action bg-danger text-light" >Sair</Link>
                    </ListGroup>
                </ModalBody>
            </Modal>
        </>
    )
}

export default Header
