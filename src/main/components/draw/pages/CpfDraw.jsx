import React, { useState } from 'react';
import Template from '../../Template/';
import { Container, Row, Col, Card, CardBody, Input, Button } from 'reactstrap';

import Chance from 'chance';
let chance = new Chance();

const CpfDraw = () => {
  let [cpf, setCpf] = useState();
  let [shouldGeneratePulse, setShouleGeneratePulse] = useState(true);
  let [shouldCopyPulse, setShouleCopyPulse] = useState(false);
  const [resultCopied, setResultCopied] = useState(false);

  const generateCpf = () => {
    setCpf(chance.cpf());
    setShouleGeneratePulse(false);
    setShouleCopyPulse(true);
  };

  const copyResult = () => {
    let input = document.getElementById('input-resultado');
    input.select();
    document.execCommand('copy');
    setResultCopied(true);
    setShouleCopyPulse(false);
  };

  return (
    <Template>
      <Container className="mt-3">
        <Row className="mb-5">
          <Col>
            <h1 className="sofia">
              <strong>Gerador de CPF</strong>
            </h1>
          </Col>
        </Row>
        <Row>
          <Col xs={{ size: 10, offset: 1 }}>
            <Card>
              <CardBody>
                <Container>
                  <Row>
                    <Col xs={{ size: 12 }} md={{ size: 9 }}>
                      <Input
                        type="text"
                        className="mb-md-3 text-center"
                        rows="3"
                        value={cpf}
                        onChange={e => setCpf(e.target.value)}
                        placeholder="Clique no botão abaixo para gerar um CPF"
                        style={{ fontSize: '1.8em' }}
                        id="input-resultado"
                      />
                    </Col>
                    <Col xs={{ size: 12 }} md={{ size: 3 }}>
                      <Button
                        outline
                        color="success"
                        className={`my-3 my-md-0 mt-md-3 ${
                          shouldCopyPulse ? 'btn-pulse-success' : ''
                        }`}
                        onClick={copyResult}
                      >
                        {resultCopied && !shouldCopyPulse
                          ? 'Copiado'
                          : 'Copiar'}{' '}
                        <i
                          className={`${
                            resultCopied && !shouldCopyPulse
                              ? 'fas fa-clipboard-check'
                              : 'far fa-clipboard'
                          } fa-lg`}
                        ></i>
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        block
                        color="warning"
                        className={`${
                          shouldGeneratePulse ? 'btn-pulse-warning' : ''
                        }`}
                        onClick={generateCpf}
                      >
                        Gerar CPF
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Template>
  );
};

export default CpfDraw;
