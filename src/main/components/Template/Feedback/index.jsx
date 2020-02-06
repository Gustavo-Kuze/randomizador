import '../../../../css/components/Template/Feedback/Feedback.css';
import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import If from '../../utils/If';
import FilePicker from '../../utils/FilePicker';
import {
  saveFeedback,
  saveFeedbackImage,
  like,
} from '../../../services/firebase/feedback';
import { setUserLiked as setUserLikedAction } from '../../../redux/core/actions/feedbacksActions';
import { log } from '../../../services/logger';

const Feedback = ({
  setUserLiked,
  userLiked,
  email,
  uid,
  authResult,
  isMenuOpen,
}) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [description, setDescription] = useState();
  const [file, setFile] = useState();

  const renderButtons = () => {
    return (
      <Row className="feedback-buttons">
        <If c={isFeedbackOpen}>
          <Col>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setIsFeedbackOpen(false);
              }}
              outline
              block
              color="danger"
              className="text-light"
            >
              <i className="far fa-thumbs-down fa-md" />
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => {
                if (isFeedbackOpen) {
                  if (!userLiked) {
                    like().then(() => {
                      toastr.success(
                        'Obrigado!',
                        'Seu feedback é muito importante para nós!',
                      );
                      setUserLiked();
                    });
                  }
                  setIsFeedbackOpen(false);
                } else {
                  setIsFeedbackOpen(true);
                }
              }}
              outline
              block
              color="success"
              className="text-light"
            >
              <i className="far fa-thumbs-up fa-md" />
            </Button>
          </Col>
        </If>
        <If c={!isFeedbackOpen}>
          <Col>
            <Button outline block color="danger" className="text-light">
              <i className="far fa-thumbs-down fa-md" />
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => {
                setIsFeedbackOpen(true);
              }}
              outline
              block
              color="success"
              className="text-light"
            >
              <i className="far fa-comment-alt" />
            </Button>
          </Col>
        </If>
      </Row>
    );
  };

  const sendFeedback = () => {
    if (description) {
      const feedback = {
        description,
        hasFile: !!file,
        email,
      };
      saveFeedback(feedback)
        .then(feedbackId => {
          console.log(`Feedback salvo com o id ${feedbackId}`);
          toastr.success(
            'Sucesso!',
            'Recebemos seu feedback e tentaremos resolver assim que possível. Agradecemos sua colaboração!',
          );
          if (file) {
            saveFeedbackImage(feedbackId, file)
              .then(() => {
                toastr.success('Sucesso!', 'A captura de tela foi enviada');
              })
              .catch(err => {
                log(
                  `[ERRO] SALVAR uma imagem de feedback em Feedback: ${err.message}`,
                  uid,
                  authResult,
                )
                  .then(logId => {
                    toastr.error('Error logged', `Log ID: ${logId}`);
                  })
                  .catch(logErr => {
                    console.error(logErr);
                    toastr.error(
                      'LOG ERROR',
                      `O seguinte erro ocorreu ao tentar salvar a imagem do feedback: ${err.message}`,
                    );
                  });
              });
          }
        })
        .catch(err => {
          console.log(
            `O seguinte erro ocorreu ao tentar enviar o feedback: ${err.message}`,
          );
        });
    } else {
      toastr.warning(
        'Atenção!',
        'Você precisa fornecer uma descrição para relatar um problema!',
      );
    }
    setIsFeedbackOpen(false);
    setIsModalOpen(false);
  };

  return (
    <>
      {!isMenuOpen && (
        <>
          <Container
            className={`feedback-${
              isFeedbackOpen ? 'open' : 'closed'
            }-container`}
            onMouseEnter={() => {
              setTimeout(() => {
                setIsFeedbackOpen(true);
              }, 20);
            }}
            onMouseLeave={() => setIsFeedbackOpen(false)}
          >
            <If c={isFeedbackOpen}>
              <Row>
                <Col>
                  <p
                    className="feedback-label h3"
                    onTouchStart={() => setIsFeedbackOpen(false)}
                  >
                    O que você achou do Randomizador?
                  </p>
                </Col>
              </Row>
            </If>
            {renderButtons()}

            <Modal
              isOpen={isModalOpen}
              toggle={() => setIsModalOpen(!isModalOpen)}
              centered
              size="lg"
            >
              <ModalHeader
                className="bg-danger text-center text-light"
                toggle={() => setIsModalOpen(false)}
              >
                Relatar um problema
              </ModalHeader>
              <ModalBody className="">
                <Container>
                  <Row>
                    <Col>
                      <p className="h4">
                        Use o campo abaixo para descrever seu problema
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Input
                        type="textarea"
                        className="mb-3"
                        rows="3"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Descreva seu problema aqui"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="h4">Envie uma captura de tela (opcional)</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FilePicker
                        onPicked={pickedFile => {
                          setFile(pickedFile);
                        }}
                        accept=",.jpg"
                        isPictureUpload
                      />
                    </Col>
                  </Row>
                  <If c={file}>
                    <Row>
                      <Col>
                        <p className="text-success lead">
                          <span>O arquivo foi selecionado </span>
                          <span>
                            <i className="fas fa-check" />
                          </span>
                        </p>
                      </Col>
                    </Row>
                  </If>
                  <Row>
                    <Col>
                      <Button
                        block
                        color="success"
                        onClick={() => sendFeedback()}
                      >
                        Enviar
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </ModalBody>
            </Modal>
          </Container>
        </>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  email: state.user.email,
  userLiked: state.feedbacks.userLiked,
  isMenuOpen: state.global.isMenuOpen,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUserLiked: setUserLikedAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
