import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import Template from '../../Template';
import {
  getPrivateResults,
  getNextPrivateResults,
  deletePrivateResult,
  deleteAllPrivateResults,
} from '../../../services/firebase/privateDraws';
import drawTypes from '../drawUtils/drawTypes';
import { setPrivateResultOnState } from '../../../redux/core/actions/privateResults';
import firebase from '../../../services/firebase';
import If from '../../utils/If';
import { log } from '../../../services/logger';
import constants from '../drawUtils/constants';

const MyResults = props => {
  const [results, setResults] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [lastResult, setLastResult] = useState();
  const [hideLoadMore, setHideLoadMore] = useState(false);

  const prepareSnapAndSetOnState = (snap, loadMore = false) => {
    const resultsFromFirestore = [];
    if (snap) {
      snap.forEach(doc => {
        resultsFromFirestore.push({ id: doc.id, ...doc.data() });
      });
    }

    if (loadMore) {
      setResults([...results, ...resultsFromFirestore]);
    } else {
      setResults(resultsFromFirestore);
    }
    if (
      resultsFromFirestore.length === 0 ||
      resultsFromFirestore.length < constants.PRIVATE_RESULTS_GET_LIMIT
    ) {
      setHideLoadMore(true);
    }
    setLastResult(snap.docs[snap.docs.length - 1]);
  };

  const loadResults = (lastVisible = false) => {
    if (lastVisible) {
      getNextPrivateResults(lastVisible)
        .then(snap => {
          prepareSnapAndSetOnState(snap, true);
        })
        .catch(error => {
          log(
            `[ERRO] ao tentar OBTER os resultados privados em MyResults (CARREGAR MAIS): ${error.message}`,
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
                'Não foi possível criar o log. OBTER os resultados privados em MyResults',
              );
            });
        });
    } else {
      getPrivateResults()
        .then(snap => {
          prepareSnapAndSetOnState(snap);
        })
        .catch(error => {
          log(
            `[ERRO] ao tentar OBTER os resultados privados em MyResults: ${error.message}`,
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
                'Não foi possível criar o log. OBTER os resultados privados em MyResults',
              );
            });
        });
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        loadResults();
      }
    });
  }, []);

  const DrawType = ({ type }) => {
    switch (type) {
      case drawTypes.HEAD_OR_TAILS:
        return <h4>Cara ou Coroa</h4>;
      case drawTypes.LISTS:
        return <h4>Sorteio de listas</h4>;
      case drawTypes.NUMBERS:
        return <h4>Sorteio de números</h4>;
      case drawTypes.SHUFFLE:
        return <h4>Embaralhamento de frases</h4>;
      case drawTypes.FACEBOOK_COMMENTS:
        return <h4>Comentários do Facebook</h4>;
      case drawTypes.INSTAGRAM_COMMENTS:
        return <h4>Comentários do Instagram</h4>;
      default:
        return <h4>Sorteio</h4>;
    }
  };

  const setResultOnStateAndRedirect = result => {
    props.setPrivateResultOnState(result);
    setShouldRedirect(true);
  };

  const deleteResult = result => {
    const toastrConfirmOptions = {
      onCancel: () => {},
      onOk: () =>
        deletePrivateResult(result.id)
          .then(() => {
            toastr.success('Sucesso!', 'O resultado foi excluído.');
            window.location.reload();
          })
          .catch(error => {
            toastr.error(
              'Erro',
              'Ocorreu um erro ao tentar excluir o resultado',
            );
            log(
              `[ERRO] ao tentar EXCLUIR UM resultado privado em MyResults: ${error.message}`,
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
                  'Não foi possível criar o log de ERRO. EXCLUIR UM resultado privado em MyResults',
                );
              });
          }),
    };
    toastr.confirm(
      `Tem certeza de que deseja excluir esse resultado de sorteio? Isso não pode ser desfeito!`,
      toastrConfirmOptions,
    );
  };

  const deleteAllResults = () => {
    const toastrConfirmOptions = {
      onCancel: () => {},
      onOk: () => {
        deleteAllPrivateResults()
          .then(() => {
            window.location.reload();
          })
          .catch(error => {
            log(
              `[ERRO] ao tentar EXCLUIR TODOS os resultados privados em MyResults: ${error.message}`,
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
                  'Não foi possível criar o log de ERRO. EXCLUIR TODOS os resultados privados em MyResults',
                );
              });
          });
      },
    };
    toastr.confirm(
      `Tem certeza de que deseja excluir todos os resultados de sorteio salvos? Isso não pode ser desfeito!`,
      toastrConfirmOptions,
    );
  };

  return (
    <>
      <If c={shouldRedirect}>
        <Redirect push to="/drawn" />
      </If>
      <If c={!shouldRedirect}>
        <Template>
          <Container>
            <Row>
              <Col xs={{ size: 10, offset: 1 }}>
                <If c={results.length > 0}>
                  <Button
                    className="mb-5"
                    color="danger"
                    onClick={deleteAllResults}
                  >
                    Excluir todos os resultados
                  </Button>
                </If>
                <Card>
                  <If c={results.length > 0}>
                    <ListGroup>
                      {results.map(result => (
                        <ListGroupItem key={result.id}>
                          <Container>
                            <Row>
                              <Col
                                xs={{ size: 10 }}
                                onClick={() =>
                                  setResultOnStateAndRedirect(result)
                                }
                                style={{ cursor: 'pointer' }}
                              >
                                <DrawType type={result.drawType} />
                                <p>{result.date}</p>
                                <p>{result.description}</p>
                              </Col>
                              <Col xs={{ size: 2 }}>
                                <Button
                                  color="link"
                                  className="text-decoration-none float-right pop-hover"
                                  onClick={() => deleteResult(result)}
                                >
                                  <i className="fa fa-trash text-danger" />
                                </Button>
                              </Col>
                            </Row>
                          </Container>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                    <If c={!hideLoadMore}>
                      <Button
                        color="link"
                        className="text-decoration-none float-right"
                        onClick={() => loadResults(lastResult)}
                      >
                        Carregar mais
                      </Button>
                    </If>
                  </If>
                  <If c={results.length === 0}>
                    <h3 className="text-center p-5">
                      Você não tem nenhum resultado de sorteio salvo...
                    </h3>
                  </If>
                </Card>
              </Col>
            </Row>
          </Container>
        </Template>
      </If>
    </>
  );
};

const mapStateToProps = state => ({
  uid: state.user.uid,
  authResult: state.login,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setPrivateResultOnState,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MyResults);
