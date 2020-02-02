import '../../../../css/components/draw/pages/ShuffleDraw.css';
import React, { useState } from 'react';
import { Input, Container, Row, Col, Button } from 'reactstrap';
import Chance from 'chance';
import FilePicker from '../../utils/FilePicker';
import If from '../../utils/If';
import DrawResults from './DrawResults';
import drawTypes from '../drawUtils/drawTypes';

const chance = new Chance();

const Shuffle = () => {
  const [phrases, setPhrases] = useState('');
  const [shuffledPhrases, setShuffledPhrases] = useState('');
  const [resultCopied, setResultCopied] = useState(false);

  const shufflePhrases = () => {
    setResultCopied(false);
    let phrasesArr = phrases.split('\n').filter(p => p !== '');
    phrasesArr = chance.shuffle(phrasesArr);
    setShuffledPhrases(phrasesArr.join('\n'));
    setTimeout(
      () => document.getElementById('input-resultado').scrollIntoView(true),
      20,
    );
  };

  const onFilePicked = fileContent => {
    try {
      setPhrases(fileContent);
    } catch (err) {
      console.error(err);
    }
  };

  const copyResult = () => {
    const input = document.getElementById('input-resultado');
    input.select();
    document.execCommand('copy');
    setResultCopied(true);
  };

  return (
    <Container>
      <Row>
        <Col
          xs={{ size: 12 }}
          md={{ size: 8, offset: 2 }}
          className="text-center my-3"
        >
          <h3>
            Digite as frases ou nomes para sortear, separados por quebras de
            linha (Enter)
          </h3>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <p className="lead">ou clique para escolher um arquivo de texto</p>
          <FilePicker onPicked={onFilePicked} />
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: 10, offset: 1 }} md={{ size: 8, offset: 2 }}>
          <Input
            type="textarea"
            className="sort-textarea"
            rows="3"
            value={phrases}
            onChange={e => setPhrases(e.target.value)}
            placeholder="Digite as frases aqui"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }}>
          <Button
            block
            color="warning"
            className="mt-5 mb-5"
            onClick={shufflePhrases}
          >
            Embaralhar
          </Button>
        </Col>
      </Row>
      <If c={shuffledPhrases.length > 0} cssHide>
        <div>
          <hr />
          <DrawResults
            title="Resultado:"
            colClasses="col-10 offset-1 col-md-8 offset-md-2"
            date={`${new Date().toLocaleString()}`}
            drawType={drawTypes.SHUFFLE}
            result={shuffledPhrases}
          >
            <div className="d-flex justify-content-betweend align-items-center flex-column">
              <Input
                id="input-resultado"
                type="textarea"
                className="sort-textarea"
                value={shuffledPhrases}
                rows="10"
                readOnly="readonly"
              />
              <Button
                outline
                color="success"
                className="mt-3"
                onClick={copyResult}
              >
                {resultCopied ? 'Copiado' : 'Copiar'}{' '}
                <i
                  className={`${
                    resultCopied ? 'fas fa-clipboard-check' : 'far fa-clipboard'
                  } fa-lg`}
                />
              </Button>
            </div>
          </DrawResults>
        </div>
      </If>
    </Container>
  );
};

export default Shuffle;
