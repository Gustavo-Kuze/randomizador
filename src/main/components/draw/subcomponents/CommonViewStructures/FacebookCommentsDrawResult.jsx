import React from 'react';
import { Container, Row, Col, Card } from 'reactstrap';

const FacebookCommentsDrawResult = props => {
  return (
    <Container>
      {props.items.map((c, i) => (
        <Row className="my-5" key={c.id}>
          <Col>
            <Card className="p-4">
              <h4>{i + 1}º item sorteado</h4>
              <h6 className="mt-2">Id do comentário</h6>
              <p className="">{c.id}</p>
              <h5>Texto do comentário</h5>
              <p className="lead">{c.message}</p>
              <h5>Link direto para o comentário</h5>
              <a
                href={c.permalink_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.permalink_url}
              </a>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default FacebookCommentsDrawResult;
