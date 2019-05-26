import '../../css/Header.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'

import {
    Modal,
    ModalHeader,
    ModalBody,
    Container,
    Col,
    Row,
    Button
} from 'reactstrap'

const Header = props => {
    const [openMenu, toggleMenu] = useState(false)

    const callToggleMenu = () => toggleMenu(!openMenu)

    return (
        <>
            <nav className="navbar fixed-top navbar-dark bg-warning ">
                <div className="mx-auto flex-grow-1">
                    <Container fluid>
                        <Row>
                            <Col xs={{ size: 6 }} sm={{ size: 10, offset: 1 }} className="text-center">
                                <Link to="/" className="text-decoration-none">
                                    <h1 className="brand-title sofia">Randomizador</h1>
                                </Link>
                            </Col>
                            <Col xs={{ size: 6 }} sm={{ size: 1 }} >
                                <Button
                                    color="link"
                                    onClick={callToggleMenu}
                                    className="text-light bg-warning float-right">
                                    <span className="navbar-toggler-icon"></span>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </nav>
            <Modal isOpen={openMenu} toggle={callToggleMenu} centered size="sm" >
                <ModalHeader className="bg-warning text-center text-light" toggle={() => toggleMenu(false)}>
                    Menu
                </ModalHeader>
                <ModalBody className="">
                    <Menu />
                </ModalBody>
            </Modal>
        </>
    )
}

export default Header
