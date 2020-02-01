import React, { useEffect } from 'react';
import { Container, Col, Row } from 'reactstrap';

const Footer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <footer className="footer bg-light text-dark fixed-bottom py-3 border border-secondary">
      <Container>
        <Row>
          <Col xs={{ size: 6, offset: 3 }} className="text-center">
            <span className="h5 text-muted">Desenvolvido por </span>{' '}
            <a
              className="text-decoration-none h5"
              href="https://www.gustavokuze.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gustavo Kuze
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
