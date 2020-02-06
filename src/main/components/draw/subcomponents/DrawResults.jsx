import React, { useState } from 'react';
import { Tooltip, Input, Row, Col, Button } from 'reactstrap';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { savePublicResult } from '../../../services/firebase/publicDraws';
import { savePrivateResult } from '../../../services/firebase/privateDraws';
import If from '../../utils/If';

import { log } from '../../../services/logger';

const DrawResults = ({
  drawType,
  date,
  result,
  uid,
  authResult,
  emailVerified,
  colClasses,
  titleClasses,
  title,
  children,
  viewMode,
}) => {
  const [shouldRedirect, setRedirect] = useState(false);
  const [isTooltipOpen, toggleTooltip] = useState();
  const [drawDescription, setDrawDescription] = useState('');

  const savePublicly = () => {
    savePublicResult({
      description: drawDescription,
      drawType,
      date,
      result,
    })
      .then(number => {
        const toastrConfirmOptions = {
          disableCancel: true,
          onOk: () => setRedirect(true),
        };
        toastr.confirm(
          `Sorteio salvo com sucesso, guarde o número para que possa consultar mais tarde: ${number}`,
          toastrConfirmOptions,
        );
      })
      .catch(error => {
        log(
          `[ERRO] ao tentar SALVAR um resultado público em DrawResults: ${error.message}`,
          uid,
          authResult,
        )
          .then(logId => {
            toastr.error('Error logged', `Log ID: ${logId}`);
          })
          .catch(err => {
            console.error(err);
            toastr.error(
              'LOG ERROR',
              'Não foi possível criar o log de ERRO. SALVAR um resultado público em DrawResults',
            );
          });
      });
  };

  const savePrivately = () => {
    if (emailVerified) {
      savePrivateResult({
        description: drawDescription,
        drawType,
        date,
        result,
      })
        .then(() => {
          const toastrConfirmOptions = {
            disableCancel: true,
            onOk: () => setRedirect(true),
          };
          toastr.confirm(
            `Sorteio salvo com sucesso, navegue até "meus sorteios" para acessar os resultados salvos.`,
            toastrConfirmOptions,
          );
        })
        .catch(err => {
          toastr.error(
            'Erro!',
            'Ocorreu um erro ao tentar salvar, teste fazer login novamente.',
          );
          log(
            `[ERRO] ao tentar SALVAR resultado privado em DrawResults: ${err.message}`,
            uid,
            authResult,
          )
            .then(logId => {
              toastr.error('Error logged', `Log ID: ${logId}`);
            })
            .catch(logError => {
              console.error(logError);
              toastr.error(
                'LOG ERROR',
                'Não foi possível criar o log de ERRO. SALVAR um resultado privado em DrawResults',
              );
            });
        });
    } else {
      toastr.error(
        'Erro!',
        'Você precisa estar logado com um e-mail verificado para salvar resultados de sorteio!',
      );
    }
  };

  return (
    <>
      {shouldRedirect ? (
        <Redirect to="/" />
      ) : (
        <>
          <Row className="mt-5">
            <div className={colClasses || 'col-12'}>
              <h1 className={titleClasses || 'text-center lobster my-3'}>
                {title || 'Confira os resultados'}
              </h1>
            </div>
          </Row>
          <Row>
            <div className={colClasses || 'col-12'}>{children}</div>
          </Row>
          <Row className="mt-5">
            <div className={colClasses || 'col-12'}>
              <h4 className="text-center sofia">
                Sorteio realizado em: {date || new Date().toLocaleString()}
              </h4>
            </div>
          </Row>
          <If c={!viewMode}>
            <Row className="mt-5">
              <div className={colClasses || 'col-10 offset-1'}>
                <Row>
                  <Col>
                    <Input
                      className="text-center bg-light"
                      type="text"
                      placeholder="Dê uma descrição para salvar o sorteio (opcional)"
                      onChange={e => setDrawDescription(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ size: 12 }} sm={{ size: 6 }} className="my-1">
                    <Tooltip
                      placement="bottom"
                      isOpen={isTooltipOpen}
                      target="btn-save-publicly"
                      toggle={() => toggleTooltip(!isTooltipOpen)}
                    >
                      O resultado ficará acessível para quem possuir seu número.
                      Isso não pode ser desfeito!
                    </Tooltip>
                    <Button
                      id="btn-save-publicly"
                      outline
                      block
                      color="warning"
                      className=""
                      onClick={savePublicly}
                    >
                      Salvar publicamente
                    </Button>
                  </Col>
                  <Col xs={{ size: 12 }} sm={{ size: 6 }} className="my-1">
                    <Button outline block color="info" onClick={savePrivately}>
                      Salvar apenas para mim
                    </Button>
                  </Col>
                </Row>
              </div>
            </Row>
          </If>
        </>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  emailVerified: state.user.emailVerified,
  uid: state.user.uid,
  authResult: state.login,
});

export default connect(mapStateToProps)(DrawResults);
