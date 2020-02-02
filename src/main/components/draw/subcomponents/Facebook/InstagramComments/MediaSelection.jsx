import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Collapse, Container, Col, Row, Button, Card } from 'reactstrap';
import { setSelectedMedia as setSelectedMediaAction } from '../../../../../redux/core/actions/instagramCommentsActions';
import If from '../../../../utils/If';

import randomizadorIconSvg from '../../../../../../img/randomizador_icon_64.svg';

const MediaSelection = ({
  enabled,
  medias,
  setSelectedMedia,
  onMediaSelected,
  selectedMedia,
  isOpen,
  setIsOpen,
  previous,
  paginateTo,
  next,
}) => {
  const setMediaAndCallback = mediaItem => {
    const postCopy = { ...mediaItem };
    setSelectedMedia(postCopy);
    onMediaSelected(mediaItem);
  };

  const renderMediaRadio = mediaItem => {
    const id = `media-radio--${mediaItem.id}`;
    return (
      <>
        <input
          type="radio"
          id={id}
          className="custom-control-input"
          checked={selectedMedia ? selectedMedia.id === mediaItem.id : false}
          onChange={() => setMediaAndCallback(mediaItem)}
        />
        <label className="custom-control-label" htmlFor={id}>
          <img
            className="img-thumbnail mt-4"
            src={mediaItem.media_url || randomizadorIconSvg}
            alt="Post sem imagem"
            style={{ maxWidth: '160px' }}
          />
          <span
            className={`text-truncate d-block mt-2 mb-5 ${
              mediaItem.caption ? 'lead' : 'text-secondary'
            }`}
            style={{ maxWidth: 'calc(50vw)' }}
          >
            {mediaItem.caption || 'Post sem mensagem'}
          </span>
        </label>
      </>
    );
  };

  return (
    <>
      <Button
        color="info"
        outline
        block
        className={`text-left mt-3 ${enabled ? '' : 'disabled'}`}
        disabled={!enabled}
        onClick={() => setIsOpen(enabled && !isOpen)}
      >
        2- Escolher o post
      </Button>
      <Collapse isOpen={enabled && isOpen}>
        <Card className="p-5 my-3">
          {medias ? (
            <>
              <If c={medias.length > 0}>
                <p className="lead text-center">Escolha o post para sortear!</p>
                {medias
                  ? medias.map((p, i) => (
                      <div
                        key={`page-posts-radio-key--${i}`}
                        className="custom-control custom-radio"
                      >
                        {renderMediaRadio(p)}
                      </div>
                    ))
                  : ''}
                <Container>
                  <Row>
                    <Col xs={{ size: 6 }}>
                      <If c={previous}>
                        <Button
                          color="success"
                          outline
                          onClick={() => paginateTo(previous)}
                          className="float-right"
                        >
                          Anteriores
                        </Button>
                      </If>
                    </Col>
                    <Col xs={{ size: 6 }}>
                      <If c={next}>
                        <Button
                          color="success"
                          outline
                          onClick={() => paginateTo(next)}
                          className=""
                        >
                          Próximos
                        </Button>
                      </If>
                    </Col>
                  </Row>
                </Container>
              </If>
              <If c={!medias.length > 0}>Você não tem nenhum post</If>
            </>
          ) : (
            <p>
              Não foi possível recuperar seus posts. Por favor, tente sair de
              sua conta e fazer login com o Facebook novamente.
            </p>
          )}
        </Card>
      </Collapse>
    </>
  );
};

const mapStateToProps = state => ({
  medias: state.instagramComments.medias,
  selectedMedia: state.instagramComments.selectedMedia,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSelectedMedia: setSelectedMediaAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MediaSelection);
