import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { Input, Container, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import caraSvg from '../../../../img/cara.svg';
import coroaSvg from '../../../../img/coroa.svg';
import Template from '../../Template';
import DrawResults from '../subcomponents/DrawResults';
import drawTypes from '../drawUtils/drawTypes';
import { getPublicResult } from '../../../services/firebase/publicDraws';
import If from '../../utils/If';
import ListsDrawResult from '../subcomponents/CommonViewStructures/ListsDrawResult';
import NumbersDrawResult from '../subcomponents/CommonViewStructures/NumbersDrawResult';
import FacebookCommentsDrawResult from '../subcomponents/CommonViewStructures/FacebookCommentsDrawResult';
import InstagramCommentsDrawResult from '../subcomponents/CommonViewStructures/InstagramCommentsDrawResult';
import { log } from '../../../services/logger';

const ViewSavedDraw = props => {
  const [drawResult, setDrawResult] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (props.match.params.id > 0) {
      getPublicResult(props.match.params.id)
        .then(result => {
          if (result.drawType !== undefined) {
            setDrawResult(result);
          } else {
            toastr.error('Erro', 'Não foi possível encontrar o sorteio');
            setShouldRedirect(true);
          }
        })
        .catch(error => {
          log(
            `[ERRO] ao tentar OBTER resultados públicos em ViewSavedDraw: ${error.message}`,
            props.uid,
            props.authResult,
          )
            .then(logId => {
              toastr.error('Error logged', `Log ID: ${logId}`);
            })
            .catch(err => {
              console.error(err);
              toastr.error(
                'LOG ERROR',
                'Não foi possível criar o log de ERRO. OBTER resultados públicos em ViewSavedDraw',
              );
            });
        });
    } else {
      setDrawResult(props.resultOnState);
    }
  }, []);

  return (
    <>
      <If c={shouldRedirect}>
        <Redirect to="/" />
      </If>
      <If c={!shouldRedirect}>
        <Template>
          <div className="section">
            <Container>
              <Row>
                <Col xs={{ size: 10, offset: 1 }}>
                  {drawResult.drawType ? (
                    <If c={drawResult.drawType}>
                      <If c={drawResult.description}>
                        <h3 className="sofia">Descrição: </h3>
                        <p>{drawResult.description}</p>
                      </If>
                      <DrawResults
                        title="O resultado do sorteio foi:"
                        colClasses="col-lg-10 col-12 offset-lg-1"
                        date={drawResult.date}
                        drawType={drawResult.drawType}
                        result={drawResult.result}
                        viewMode
                      >
                        <If c={drawResult.drawType === drawTypes.NUMBERS}>
                          <NumbersDrawResult items={drawResult.result} />
                        </If>
                        <If c={drawResult.drawType === drawTypes.HEAD_OR_TAILS}>
                          <div id="moeda">
                            <If c={drawResult.result === 'Cara!'}>
                              <div>
                                <img src={caraSvg} alt="Cara" />
                              </div>
                            </If>
                            <If c={drawResult.result === 'Coroa!'}>
                              <div>
                                <img src={coroaSvg} alt="Coroa" />
                              </div>
                            </If>
                          </div>
                          <h3 className="display-4 text-center my-5 lobster h2 text-weight-bold">
                            {drawResult.result}
                          </h3>
                        </If>
                        <If c={drawResult.drawType === drawTypes.SHUFFLE}>
                          <div className="d-flex justify-content-betweend align-items-center flex-column">
                            <Input
                              id="input-resultado"
                              type="textarea"
                              className="sort-textarea bg-light"
                              value={drawResult.result}
                              rows="10"
                              readOnly="readonly"
                            />
                          </div>
                        </If>
                        <If c={drawResult.drawType === drawTypes.LISTS}>
                          <ListsDrawResult items={drawResult.result} />
                        </If>
                        <If
                          c={
                            drawResult.drawType === drawTypes.INSTAGRAM_COMMENTS
                          }
                        >
                          <InstagramCommentsDrawResult
                            items={drawResult.result}
                          />
                        </If>
                        <If
                          c={
                            drawResult.drawType === drawTypes.FACEBOOK_COMMENTS
                          }
                        >
                          <FacebookCommentsDrawResult
                            items={drawResult.result}
                          />
                        </If>
                      </DrawResults>
                    </If>
                  ) : (
                    ''
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        </Template>
      </If>
    </>
  );
};

const mapStateToProps = state => ({
  resultOnState: state.privateResults.currentPrivateResult,
  uid: state.user.uid,
  authResult: state.login,
});

export default connect(mapStateToProps)(ViewSavedDraw);
