import '../css/Header.css'
import React from 'react'
import { Link } from 'react-router-dom'

import {
    Modal,
    ModalHeader,
    ModalBody,
    ListGroup,
} from 'reactstrap'

class Header extends React.Component {
    state = {
        modal: false
    }

    toggle = () => this.setState(prevState => ({ modal: !prevState.modal }))

    render() {

        return (
            <>
                {/*   */}
                <nav className="navbar fixed-top navbar-dark bg-warning ">

                    <div className="mx-auto flex-grow-1">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-6 col-sm-10 offset-sm-1 text-center">
                                    <h1 className="brand-title">Randomizador</h1>
                                </div>
                                <div className="col-6 col-sm-1">
                                    <button
                                        onClick={this.toggle}
                                        className="btn btn-link btn-warning float-right">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <Modal isOpen={this.state.modal} toggle={this.toggle} centered size="sm">
                    <ModalHeader className="bg-warning text-center text-light">Menu</ModalHeader>
                    <ModalBody className="">
                        <ListGroup className="text-center">
                            <Link to="/" className="list-group-item list-group-item-action">Home</Link>
                            <Link to="/about" className="list-group-item list-group-item-action" >About</Link>
                        </ListGroup>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

export default Header
