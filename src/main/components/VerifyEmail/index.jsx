import React from 'react';
import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  CardText,
  CardImg,
} from 'reactstrap';
import Template from '../Template';

const index = () => {
  return (
    <Template>
      <div className="section">
        <Container>
          <Row>
            <Col xs={{ size: 6, offset: 3 }} className="text-center">
              <h1>Ops...</h1>
              <h3>
                Você esqueceu de verificar seu e-mail!{' '}
                <span role="img" aria-label="Rosto triste">
                  😯
                </span>
              </h3>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col
              xs={{ size: 10, offset: 1 }}
              lg={{ size: 6, offset: 3 }}
              className="text-center"
            >
              <Card className="w-auto" style={{ width: '18rem' }}>
                <CardImg
                  top
                  className="img-fluid"
                  src="/img/verify_email.png"
                  alt="Verifique seu e-mail"
                />
                <CardBody>
                  <h3>Verifique sua caixa de entrada</h3>
                  <CardText className="lead">
                    Por favor clique no link do e-mail de verificação que nós
                    lhe enviamos.
                  </CardText>
                  <CardText className="lead">
                    <strong>Dica:</strong> Se o e-mail não estiver em sua caixa
                    de entrada, verifique a caixa de spam (lixo eletrônico).
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Template>
  );
};

export default index;
