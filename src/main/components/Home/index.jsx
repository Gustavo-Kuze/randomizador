import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import randomizadorIconSvg from '../../../img/randomizador_icon_1024.svg';
import '../../../css/components/Home/Home.css';
import Template from '../Template';
import ToolsSection from './ToolsSection';
import CheckResultsSection from './CheckResultsSection';
import { getLikesCount } from '../../services/firebase/feedback';
import { setIsMenuOpen as setIsMenuOpenAction } from '../../redux/core/actions/globalActions';

const Home = ({ setIsMenuOpen }) => {
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    getLikesCount().then(count => {
      setLikesCount(count);
    });
    setIsMenuOpen(false);
  }, []);

  return (
    <Template>
      <div className="section mb-5">
        <Container fluid className="mb-5">
          <Row className="my-3">
            <Col
              xs={{ size: 6, offset: 3 }}
              className="d-flex justify-content-center align-items-center"
            >
              <img
                src={randomizadorIconSvg}
                alt="Logo"
                className="img-fluid"
                style={{ maxHeight: '200px' }}
              />
            </Col>
          </Row>
          <Row>
            <Col
              xs={{ size: 12 }}
              md={{ size: 8, offset: 2 }}
              className="text-center"
            >
              <h1>
                Bem-vindo ao{' '}
                <span className="sofia font-weight-bold">Randomizador</span> !
              </h1>
              <h2 className="text-muted my-4 h3">
                Entre com sua conta, ou crie uma <strong>gratuitamente</strong>,
                para começar a criar listas personalizadas e salvar os
                resultados dos sorteios
              </h2>
            </Col>
          </Row>
          <Row>
            <Col
              xs={{ size: 6, offset: 3 }}
              className="d-flex justify-content-center align-items-center"
            >
              <Link to="/user/lists" className="btn btn-primary btn-block">
                Vamos lá!
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
      <hr className="my-5" />
      <div className="section">
        <ToolsSection />
      </div>
      <div className="section bg-warning text-white py-5 mt-5">
        <CheckResultsSection />
      </div>
      <div className="section bg-light text-white py-5 mt-5">
        <Container>
          <Row>
            <Col xs={{ size: 10, offset: 1 }}>
              <p className="h2 text-success text-center">Contador de likes:</p>
              <p className="display-4 text-success text-center mt-2">
                {likesCount}
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={{ size: 10, offset: 1 }}>
              <p className="lead text-dark text-center mt-5">
                Obrigado pelo feedback!{' '}
                <span role="img" aria-label="Yay!">
                  🎉
                </span>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </Template>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setIsMenuOpen: setIsMenuOpenAction,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(Home);
