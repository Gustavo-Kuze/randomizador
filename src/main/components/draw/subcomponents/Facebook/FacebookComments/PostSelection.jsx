import React from 'react'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import { Collapse } from 'reactstrap'
import { setSelectedPost } from "../../../../../redux/core/actions/facebookCommentsActions";
import If from '../../../../utils/If'
import { Container, Row, Col, Card, Button } from 'reactstrap'

const PostSelection = (props) => {

    const setPostAndCallback = (post) => {
        let postCopy = { ...post }
        props.setSelectedPost(postCopy)
        props.onPostSelected(post)
    }

    const renderPostRadio = (post) => {
        let id = `post-radio--${post.id}`
        return <>
            <input type="radio" id={id} className="custom-control-input"
                checked={props.selectedPost ? props.selectedPost.id === post.id : false}
                onChange={e => setPostAndCallback(post)} />
            <label className="custom-control-label" htmlFor={id}>
                <img className="img-thumbnail mt-4" src={post.full_picture || '/img/randomizador_icon_64.png'} alt="Post sem imagem" style={{ maxWidth: '160px' }} />
                <span className={`text-truncate d-block mt-2 mb-5 ${post.message ? 'lead' : 'text-secondary'}`} style={{ maxWidth: 'calc(50vw)' }}>{post.message || 'Post sem mensagem'}</span>
            </label>
        </>
    }

    return (
        <>
            <Button
                color="primary"
                outline block
                className={`text-left mt-3 ${props.enabled ? '' : 'disabled'}`}
                disabled={!props.enabled}
                onClick={() => props.setIsOpen(props.enabled && !props.isOpen)}>2- Escolher o post</Button>
            <Collapse isOpen={props.enabled && props.isOpen}>
                <Card className="p-5 my-3">
                    {
                        props.pagePosts ? (
                            <>
                                <If c={props.pagePosts.length > 0}>
                                    <p className="lead text-center">Escolha o post para sortear!</p>
                                    {
                                        props.pagePosts ? props.pagePosts.map((p, i) => <div key={`page-posts-radio-key--${i}`} className="custom-control custom-radio">{renderPostRadio(p)}</div>)
                                            : ''}
                                    <Container>
                                        <Row>
                                            <Col xs={{ size: 6 }}>
                                                <If c={props.previous}>
                                                    <Button
                                                        outline
                                                        color="success"
                                                        onClick={() => props.paginateTo(props.previous)}
                                                        className=" float-right"
                                                    >Anteriores</Button>
                                                </If>
                                            </Col>
                                            <Col xs={{ size: 6 }}>
                                                <If c={props.next}>
                                                    <Button
                                                        outline
                                                        color="success"
                                                        onClick={() => props.paginateTo(props.next)}
                                                        className=""
                                                    >Próximos</Button>
                                                </If>
                                            </Col>
                                        </Row>
                                    </Container>
                                </If>
                                <If c={!props.pagePosts.length > 0}>Você não tem nenhum post</If>
                            </>
                        ) : (
                                <p>Não foi possível recuperar seus posts. Por favor, tente sair de sua conta e fazer login com o Facebook novamente.</p>
                            )
                    }
                </Card>
            </Collapse>
        </>
    )
}

const mapStateToProps = state => ({
    pagePosts: state.facebookComments.pagePosts,
    selectedPost: state.facebookComments.selectedPost,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setSelectedPost
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PostSelection)