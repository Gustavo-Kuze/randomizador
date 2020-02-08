import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Input,
  Button,
  CustomInput,
} from 'reactstrap';
import Chance from 'chance';
import { maskCpf, unmaskCpf } from '../../utils/masks';

import Template from '../../Template';

const chance = new Chance();

const CpfDraw = () => {
  const [cpf, setCpf] = useState();
  const [shouldGeneratePulse, setShouldGeneratePulse] = useState(true);
  const [shouldCopyPulse, setShouldCopyPulse] = useState(false);
  const [resultCopied, setResultCopied] = useState(false);
  const [removeMask, setRemoveMask] = useState(false);

  const generateCpf = () => {
    setCpf(removeMask ? unmaskCpf(chance.cpf()) : chance.cpf());
    setShouldGeneratePulse(false);
    setShouldCopyPulse(true);
  };

  const copyResult = () => {
    const input = document.getElementById('input-resultado');
    input.select();
    document.execCommand('copy');
    setResultCopied(true);
    setShouldCopyPulse(false);
  };

  const onChkChange = () => {
    const isChecked = !removeMask;
    setRemoveMask(isChecked);
    if (cpf) setCpf(isChecked ? unmaskCpf(cpf) : maskCpf(cpf));
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
                    <Col>
                      <CustomInput
                        type="switch"
                        label="Remover máscara"
                        checked={removeMask}
                        onChange={onChkChange}
                        id="chk-remove-cpf-mask"
                      />
                    </Col>
                  </Row>
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
                        />
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
