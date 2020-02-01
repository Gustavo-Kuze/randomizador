/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import caraSvg from '../../../../img/cara.svg';
import coroaSvg from '../../../../img/coroa.svg';
import If from '../../utils/If';
import DrawResults from './DrawResults';
import drawTypes from '../drawUtils/drawTypes';

class HeadOrTails extends Component {
  constructor(props) {
    super(props);
    this.drawTimeOut = null;
    this.resultsTimeOut = null;

    this.state = {
      showResult: false,
      headOrTails: '',
    };
  }

  componentWillUnmount = () => {
    clearTimeout(this.drawTimeOut);
    clearTimeout(this.resultsTimeOut);
  };

  flip = () => {
    const moeda = document.getElementById('moeda');
    this.setState({ showResult: false });
    const result = Math.random();
    moeda.className = '';

    this.drawTimeOut = setTimeout(() => {
      if (result <= 0.5) {
        moeda.classList.add('gira-cara');
        this.setState({ headOrTails: 'Cara!' });
      } else {
        moeda.classList.add('gira-coroa');
        this.setState({ headOrTails: 'Coroa!' });
      }
    }, 15);

    this.resultsTimeOut = setTimeout(() => {
      this.setState({ showResult: true });
    }, 3000);
  };

  render() {
    const { headOrTails, showResult } = this.state;

    return (
      <>
        <div className="section">
          <Container>
            <Row className="mb-5">
              <Col>
                <h1 className="sofia">
                  <strong>Cara ou Coroa</strong>
                </h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <h1 className="h3 text-center mb-5">
                  Clique na moeda para jogar
                </h1>
              </Col>
            </Row>
          </Container>
        </div>
        <div id="moeda" onClick={this.flip}>
          <div className="cara">
            <img src={caraSvg} alt="Cara" />
          </div>
          <div className="coroa">
            <img src={coroaSvg} alt="Coroa" />
          </div>
        </div>
        <div className="section mt-5">
          <Container>
            <If c={showResult}>
              <DrawResults
                title="O resultado foi:"
                date={`${new Date().toLocaleString()}`}
                drawType={drawTypes.HEAD_OR_TAILS}
                result={headOrTails}
              >
                <h3 className="display-4 text-center my-5 lobster h2 text-weight-bold">
                  {headOrTails}
                </h3>
              </DrawResults>
            </If>
          </Container>
        </div>
      </>
    );
  }
}

export default HeadOrTails;
