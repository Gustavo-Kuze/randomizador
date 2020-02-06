import '../../../../css/components/Template/Header/Header.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  Col,
  Row,
  Button,
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Menu from './Menu';
import { setIsMenuOpen as setIsMenuOpenAction } from '../../../redux/core/actions/globalActions';

const Header = ({ setIsMenuOpen }) => {
  const [openMenu, toggleMenu] = useState(false);

  const callToggleMenu = () => {
    toggleMenu(!openMenu);
    setIsMenuOpen(!openMenu);
  };

  return (
    <>
      <nav className="navbar fixed-top navbar-dark bg-warning ">
        <div className="mx-auto flex-grow-1">
          <Container fluid>
            <Row>
              <Col
                xs={{ size: 6 }}
                sm={{ size: 10, offset: 1 }}
                className="text-center"
              >
                <Link to="/" className="text-decoration-none">
                  <h1 className="brand-title sofia">Randomizador</h1>
                </Link>
              </Col>
              <Col xs={{ size: 6 }} sm={{ size: 1 }}>
                <Button
                  color="link"
                  onClick={callToggleMenu}
                  className="text-light bg-warning float-right"
                >
                  <span className="navbar-toggler-icon" />
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </nav>
      <Modal isOpen={openMenu} toggle={callToggleMenu} centered size="sm">
        <ModalHeader
          className="bg-warning text-center text-light"
          toggle={() => callToggleMenu(false)}
        >
          Menu
        </ModalHeader>
        <ModalBody className="">
          <Menu />
        </ModalBody>
      </Modal>
    </>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setIsMenuOpen: setIsMenuOpenAction,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(Header);
