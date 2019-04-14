import React from 'react'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ListGroup,
    ListGroupItem
} from 'reactstrap'

class Header extends React.Component {
    state = {
        modal: false
    }

    toggle = () => this.setState(prevState => ({ modal: !prevState.modal }))

    render() {

        return (
            <>
                <nav className="navbar navbar-expand-sm fixed-top navbar-dark bg-warning px-5">
                    <a className="navbar-brand" href="#">
                        <img src="/favicon.ico" alt="Brand" />
                    </a>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent"></div>
                    <button
                        onClick={this.toggle}
                        className="btn btn-link btn-warning float-right">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </nav>
                <Modal isOpen={this.state.modal} toggle={this.toggle} centered size="sm">
                    <ModalHeader className="bg-warning text-center text-light">Menu</ModalHeader>
                    <ModalBody className="">
                        <ListGroup className="text-center">
                            <ListGroupItem tag="button" action>Cras justo odio</ListGroupItem>
                            <ListGroupItem tag="button" action>Dapibus ac facilisis in</ListGroupItem>
                            <ListGroupItem tag="button" action>Morbi leo risus</ListGroupItem>
                            <ListGroupItem tag="button" action>Porta ac consectetur ac</ListGroupItem>
                            <ListGroupItem tag="button" action>Vestibulum at eros</ListGroupItem>
                        </ListGroup>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

export default Header
