import '../../css/Header.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'

import {
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap'

const Header = props => {
    const [openMenu, toggleMenu] = useState(false)

    const callToggleMenu = () => toggleMenu(!openMenu)

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
                                    className="btn btn-link text-light bg-warning float-right">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <Modal isOpen={openMenu} toggle={callToggleMenu} centered size="sm" >
                <ModalHeader className="bg-warning text-center text-light" toggle={() => toggleMenu(false)}>
                Menu
                    {/* <div className="d-flex justify-content-between align-items-center">
                        <h5 className="h4">Menu</h5>
                        <button type="button" className="close" aria-label="Close" onClick={() => toggleMenu(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div> */}
                </ModalHeader>
                <ModalBody className="">
                    <Menu />
                </ModalBody>
            </Modal>
        </>
    )
}

export default Header
