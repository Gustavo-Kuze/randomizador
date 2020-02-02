import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Collapse, Container, Row, Col, Card, Button } from 'reactstrap';
import { setSelectedPost as setSelectedPostAction } from '../../../../../redux/core/actions/facebookCommentsActions';
import If from '../../../../utils/If';

import randomizadorIconSvg from '../../../../../../img/randomizador_icon_64.svg';

const PostSelection = ({
  setSelectedPost,
  onPostSelected,
  selectedPost,
  enabled,
  isOpen,
  pagePosts,
  previous,
  paginateTo,
  next,
  setIsOpen,
}) => {
  const setPostAndCallback = post => {
    const postCopy = { ...post };
    setSelectedPost(postCopy);
    onPostSelected(post);
  };

  const renderPostRadio = post => {
    const id = `post-radio--${post.id}`;
    return (
      <>
        <input
          type="radio"
          id={id}
          className="custom-control-input"
          checked={selectedPost ? selectedPost.id === post.id : false}
          onChange={() => setPostAndCallback(post)}
        />
        <label className="custom-control-label" htmlFor={id}>
          <img
            className="img-thumbnail mt-4"
            src={post.full_picture || randomizadorIconSvg}
            alt="Post sem imagem"
            style={{ maxWidth: '160px' }}
          />
          <span
            className={`text-truncate d-block mt-2 mb-5 ${
              post.message ? 'lead' : 'text-secondary'
            }`}
            style={{ maxWidth: 'calc(50vw)' }}
          >
            {post.message || 'Post sem mensagem'}
          </span>
        </label>
      </>
    );
  };

  return (
    <>
      <Button
        color="primary"
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
          {pagePosts ? (
            <>
              <If c={pagePosts.length > 0}>
                <p className="lead text-center">Escolha o post para sortear!</p>
                {pagePosts
                  ? pagePosts.map((p, i) => (
                      <div
                        key={`page-posts-radio-key--${i}`}
                        className="custom-control custom-radio"
                      >
                        {renderPostRadio(p)}
                      </div>
                    ))
                  : ''}
                <Container>
                  <Row>
                    <Col xs={{ size: 6 }}>
                      <If c={previous}>
                        <Button
                          outline
                          color="success"
                          onClick={() => paginateTo(previous)}
                          className=" float-right"
                        >
                          Anteriores
                        </Button>
                      </If>
                    </Col>
                    <Col xs={{ size: 6 }}>
                      <If c={next}>
                        <Button
                          outline
                          color="success"
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
              <If c={!pagePosts.length > 0}>Você não tem nenhum post</If>
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
  pagePosts: state.facebookComments.pagePosts,
  selectedPost: state.facebookComments.selectedPost,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSelectedPost: setSelectedPostAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(PostSelection);
