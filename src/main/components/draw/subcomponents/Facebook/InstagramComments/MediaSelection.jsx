import randomizadorIconSvg from '../../../../../../img/randomizador_icon_64.svg';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';
import { setSelectedMedia } from '../../../../../redux/core/actions/instagramCommentsActions';
import If from '../../../../utils/If';
import { Container, Col, Row, Button, Card } from 'reactstrap';

const MediaSelection = props => {
  const setMediaAndCallback = media => {
    let postCopy = { ...media };
    props.setSelectedMedia(postCopy);
    props.onMediaSelected(media);
  };

  const renderMediaRadio = media => {
    let id = `media-radio--${media.id}`;
    return (
      <>
        <input
          type="radio"
          id={id}
          className="custom-control-input"
          checked={
            props.selectedMedia ? props.selectedMedia.id === media.id : false
          }
          onChange={e => setMediaAndCallback(media)}
        />
        <label className="custom-control-label" htmlFor={id}>
          <img
            className="img-thumbnail mt-4"
            src={media.media_url || randomizadorIconSvg}
            alt="Post sem imagem"
            style={{ maxWidth: '160px' }}
          />
          <span
            className={`text-truncate d-block mt-2 mb-5 ${
              media.caption ? 'lead' : 'text-secondary'
            }`}
            style={{ maxWidth: 'calc(50vw)' }}
          >
            {media.caption || 'Post sem mensagem'}
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
        className={`text-left mt-3 ${props.enabled ? '' : 'disabled'}`}
        disabled={!props.enabled}
        onClick={() => props.setIsOpen(props.enabled && !props.isOpen)}
      >
        2- Escolher o post
      </Button>
      <Collapse isOpen={props.enabled && props.isOpen}>
        <Card className="p-5 my-3">
          {props.medias ? (
            <>
              <If c={props.medias.length > 0}>
                <p className="lead text-center">Escolha o post para sortear!</p>
                {props.medias
                  ? props.medias.map((p, i) => (
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
                      <If c={props.previous}>
                        <Button
                          color="success"
                          outline
                          onClick={() => props.paginateTo(props.previous)}
                          className="float-right"
                        >
                          Anteriores
                        </Button>
                      </If>
                    </Col>
                    <Col xs={{ size: 6 }}>
                      <If c={props.next}>
                        <Button
                          color="success"
                          outline
                          onClick={() => props.paginateTo(props.next)}
                          className=""
                        >
                          Próximos
                        </Button>
                      </If>
                    </Col>
                  </Row>
                </Container>
              </If>
              <If c={!props.medias.length > 0}>Você não tem nenhum post</If>
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
      setSelectedMedia,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MediaSelection);
