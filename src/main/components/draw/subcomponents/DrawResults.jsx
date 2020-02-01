import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';
import { savePublicResult } from '../../../services/firebase/publicDraws';
import { savePrivateResult } from '../../../services/firebase/privateDraws';
import If from '../../utils/If';
import { Input } from 'reactstrap';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { log } from '../../../services/logger/';
import { Row, Col, Button } from 'reactstrap';

const DrawResults = props => {
  let [shouldRedirect, setRedirect] = useState(false);
  const [isTooltipOpen, toggleTooltip] = useState();
  let [drawDescription, setDrawDescription] = useState('');

  const savePublicly = () => {
    savePublicResult({
      description: drawDescription,
      drawType: props.drawType,
      date: props.date,
      result: props.result,
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
          props.uid,
          props.authResult,
        )
          .then(logId => {
            toastr.error('Error logged', `Log ID: ${logId}`);
          })
          .catch(err =>
            toastr.error(
              'LOG ERROR',
              'Não foi possível criar o log de ERRO. SALVAR um resultado público em DrawResults',
            ),
          );
      });
  };

  const savePrivately = () => {
    if (props.emailVerified) {
      savePrivateResult({
        description: drawDescription,
        drawType: props.drawType,
        date: props.date,
        result: props.result,
      })
        .then(id => {
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
            props.uid,
            props.authResult,
          )
            .then(logId => {
              toastr.error('Error logged', `Log ID: ${logId}`);
            })
            .catch(err =>
              toastr.error(
                'LOG ERROR',
                'Não foi possível criar o log de ERRO. SALVAR um resultado privado em DrawResults',
              ),
            );
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
            <div className={props.colClasses || 'col-12'}>
              <h1 className={props.titleClasses || 'text-center lobster my-3'}>
                {props.title || 'Confira os resultados'}
              </h1>
            </div>
          </Row>
          <Row>
            <div className={props.colClasses || 'col-12'}>{props.children}</div>
          </Row>
          <Row className="mt-5">
            <div className={props.colClasses || 'col-12'}>
              <h4 className="text-center sofia">
                Sorteio realizado em:{' '}
                {props.date || new Date().toLocaleString()}
              </h4>
            </div>
          </Row>
          <If c={!props.viewMode}>
            <Row className="mt-5">
              <div className={props.colClasses || 'col-10 offset-1'}>
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
