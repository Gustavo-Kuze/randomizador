import React, { useState, useEffect } from 'react'
import { Collapse } from "reactstrap";
import { toastr } from 'react-redux-toastr'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import { setAuthResponse } from '../../../../redux/core/actions/facebookLoginActions'
import {
  setPagePosts, setSelectedPage, setSelectedPost,
  setUserPages, setPostComments
} from "../../../../redux/core/actions/facebookCommentsActions";
import { facebookLogin, getUserPages, getPagePosts, getPostComments, getPagePostsFromPagination } from "../../../../services/facebook";
import If from '../../../utils/If'
import Chance from 'chance'
import { Input } from 'reactstrap'
import keycodes from '../../../utils/keycodes'
import FacebookCommentsDrawResult from '../CommonViewStructures/FacebookCommentsDrawResult'
import DrawResults from '../DrawResults'
import drawTypes from '../../drawUtils/drawTypes'

let chance = new Chance()

const ChoosePostSteps = (props) => {

  let [isStepOneOpen, setStepOneOpen] = useState(true)
  let [isStepTwoOpen, setStepTwoOpen] = useState(false)
  let [isStepThreeOpen, setStepThreeOpen] = useState(false)
  let [isStepFourOpen, setStepFourOpen] = useState(false)

  let [isStepOneEnabled, setStepOneEnabled] = useState(true)
  let [isStepTwoEnabled, setStepTwoEnabled] = useState(false)
  let [isStepThreeEnabled, setStepThreeEnabled] = useState(false)
  let [isStepFourEnabled, setStepFourEnabled] = useState(false)

  let [isQuantityInputValid, setQuantityInputValid] = useState(true)
  let [quantity, setQuantity] = useState(1)
  let [drawnComments, setDrawnComments] = useState([])

  let [nextPostsHref, setNextPostsHref] = useState()
  let [prevPostsHref, setPrevPostsHref] = useState()

  useEffect(() => {
    if (props.loginStatus === 'connected' && !isStepTwoEnabled && isStepOneEnabled)
      setStepTwoEnabled(true)
    if (props.userPages.length > 0 && !isStepThreeEnabled && isStepTwoEnabled && isStepOneEnabled)
      setStepThreeEnabled(true)
    if (props.pagePosts.length > 0 && !isStepFourEnabled && isStepThreeEnabled && isStepTwoEnabled && isStepOneEnabled)
      setStepFourEnabled(true)
  })

  const fulfillUserPages = (authResponse) => {
    getUserPages(authResponse.userID, authResponse.accessToken).then(pagesResponse => {
      props.setUserPages(pagesResponse.data)
    })
  }

  const callFacebookLogin = async () => {
    facebookLogin().then((loginResponse) => {
      props.setAuthResponse(loginResponse)
      setStepOneOpen(false)
      setStepTwoOpen(true)
      fulfillUserPages(loginResponse)
    }).catch(err => {
      toastr.error('Erro', err)
    })
  }

  const paginateTo = (href) => {
    getPagePostsFromPagination(href).then(response => {
      preparePagePosts(response)
    }).catch(err => {
      toastr.error('Erro', err)
    })
  }

  const preparePagePosts = (response) => {
    if (response.paging) {
      if (response.paging.next)
        setNextPostsHref(response.paging.next)
      if (response.paging.previous)
        setPrevPostsHref(response.paging.previous)
    }
    props.setPagePosts(response.data)
  }

  const setPageAndGetPosts = (page) => {
    props.setSelectedPage(page)
    getPagePosts(page.id, page.access_token)
      .then(preparePagePosts)
      .catch(err => {
        toastr.error('Erro', err)
      })
    setStepTwoOpen(false)
    setStepThreeOpen(true)
  }

  const setPost = (post) => {
    let postCopy = { ...post }
    props.setSelectedPost(postCopy)
    getPostComments(postCopy.id, props.accessToken).then(resp => {
      props.setPostComments(resp.data)
      setStepThreeOpen(false)
      setStepFourOpen(true)
    }).catch(err => {
      console.log(err)
    })
  }

  const renderPageRadio = (page) => <>
    <input type="radio" id={`page-radio-${page.name}`} className="custom-control-input"
      checked={props.selectedPage ? props.selectedPage.name === page.name : false}
      onChange={e => setPageAndGetPosts(page)} />
    <label className="custom-control-label" htmlFor={`page-radio-${page.name}`}>{page.name}</label>
  </>

  const renderPostRadio = (post) => {
    let id = `post-radio--${post.id}`
    return <>
      <input type="radio" id={id} className="custom-control-input"
        checked={props.selectedPost ? props.selectedPost.id === post.id : false}
        onChange={e => setPost(post)} />
      <label className="custom-control-label" htmlFor={id}>
        <img className="img-thumbnail mt-4" src={post.full_picture || '/img/randomizador_icon_64.png'} alt="Post sem imagem" style={{ maxWidth: '160px' }} />
        <span className={`text-truncate d-block mt-2 mb-5 ${post.message ? 'lead' : 'text-secondary'}`} style={{ maxWidth: 'calc(50vw)' }}>{post.message || 'Post sem mensagem'}</span>
      </label>
    </>
  }

  const drawComments = () => {
    if (isQuantityInputValid) {
      let drawn = chance.pickset(props.comments, quantity)
      setDrawnComments(drawn)

      setStepOneEnabled(false)
      setStepTwoEnabled(false)
      setStepThreeEnabled(false)
      setStepFourEnabled(false)
    } else {
      toastr.warning('Atenção!', 'Você precisa definir uma quantidade maior que zero e menor que o número de comentários do post!')
    }
  }

  const setQuantityInputValidAndDrawOnEnter = (e) => {
    let code = e.keyCode || e.which
    if (code === keycodes.ENTER) {
      drawComments()
    }
    setQuantityInputValid(quantity > 0 && quantity <= props.comments.length)
  }

  return <>
    <button className={`btn btn-outline-primary btn-block text-left mt-3 ${isStepOneEnabled ? '' : 'disabled'}`}
      disabled={!isStepOneEnabled}
      onClick={() => setStepOneOpen(!isStepOneOpen)}>1- Permitir que o Randomizador gerencie suas páginas</button>
    <Collapse isOpen={isStepOneOpen}>
      <div className="card p-5 my-3">
        <p className="lead text-center">Clique no ícone para fazer login com sua conta do Facebook e permitir o acesso do Randomizador</p>
        <button className="btn btn-link text-decoration-none" onClick={() => callFacebookLogin()}><i className="fab fa-facebook-square fa-3x"></i></button>
      </div>
    </Collapse>
    <button className={`btn btn-outline-primary btn-block text-left mt-3 ${isStepTwoEnabled ? '' : 'disabled'}`}
      disabled={!isStepTwoEnabled}
      onClick={() => setStepTwoOpen(!isStepTwoOpen)}>2- Escolher sua página</button>
    <Collapse isOpen={isStepTwoOpen}>
      <div className="card p-5 my-3">
        <If c={props.userPages.length > 0}>
          <p className="lead text-center">Escolha a página que contém o post para sortear!</p>
          {
            props.userPages ? props.userPages.map((p, i) => <div key={`page-radio-key--${i}`} className="custom-control custom-radio">{renderPageRadio(p)}</div>)
              : ''}
        </If>
        <If c={!props.userPages.length > 0}>Você não tem nenhuma página ou ainda não deu as permissões para o App</If>
      </div>
    </Collapse>
    <button className={`btn btn-outline-primary btn-block text-left mt-3 ${isStepThreeEnabled ? '' : 'disabled'}`}
      disabled={!isStepThreeEnabled}
      onClick={() => setStepThreeOpen(!isStepThreeOpen)}>3- Escolher o post</button>
    <Collapse isOpen={isStepThreeOpen}>
      <div className="card p-5 my-3">
        <If c={props.pagePosts.length > 0}>
          <p className="lead text-center">Escolha o post para sortear!</p>
          {
            props.pagePosts ? props.pagePosts.map((p, i) => <div key={`page-posts-radio-key--${i}`} className="custom-control custom-radio">{renderPostRadio(p)}</div>)
              : ''}
          <div className="container">
            <div className="row">
              <div className="col-6">
                <If c={prevPostsHref}>
                  <button onClick={() => paginateTo(prevPostsHref)} className="btn btn-outline-success float-right">Anteriores</button>
                </If>
              </div>
              <div className="col-6">
                <If c={nextPostsHref}>
                  <button onClick={() => paginateTo(nextPostsHref)} className="btn btn-outline-success">Próximos</button>
                </If>
              </div>
            </div>
          </div>
        </If>
        <If c={!props.pagePosts.length > 0}>Você não tem nenhum post</If>
      </div>
    </Collapse>
    <button className={`btn btn-outline-primary btn-block text-left mt-3 ${isStepFourEnabled ? '' : 'disabled'}`}
      disabled={!isStepFourEnabled}
      onClick={() => setStepFourOpen(!isStepFourOpen)}>4- Sorteie!</button>
    <Collapse isOpen={isStepFourOpen}>
      <div className="card p-5 my-3">

        <If c={!props.comments}>
          <p className="lead">Ocorreu um erro ao listar os comentários deste post.</p>
        </If>
        <If c={props.comments}>
          <If c={props.comments.length > 0}>
            <If c={drawnComments.length === 0}>
              <p className="lead text-center">Finalmente, você já pode sortear! <span role="img" aria-label="Positivo">👍</span></p>
              <Input className="text-center bg-light mb-3"
                type="number"
                placeholder="Quantidade"
                invalid={!isQuantityInputValid}
                valid={isQuantityInputValid}
                value={quantity}
                onChange={e => setQuantity(parseInt(e.target.value))}
                onKeyUp={setQuantityInputValidAndDrawOnEnter} />
              <button onClick={drawComments} className="btn btn-success btn-block btn-pulse-success">Sortear!</button>
            </If>
            <If c={drawnComments.length > 0}>
              <DrawResults title="Os comentários sorteados foram:" colClasses="col-lg-10 col-12 offset-lg-1"
                date={`${new Date().toLocaleString()}`}
                drawType={drawTypes.FACEBOOK_COMMENTS}
                result={drawnComments}>

                <FacebookCommentsDrawResult items={drawnComments} />
              </DrawResults>
            </If>
          </If>
          <If c={props.comments.length === 0}>
            <p className="lead">Este post não tem comentários</p>
          </If>
        </If>

      </div>
    </Collapse>
  </>
}

const mapStateToProps = state => ({
  loginStatus: state.facebook.status,
  authResponse: state.facebook.authResponse,
  accessToken: state.facebookComments.selectedPage.access_token,
  userPages: state.facebookComments.userPages,
  pagePosts: state.facebookComments.pagePosts,
  selectedPage: state.facebookComments.selectedPage,
  selectedPost: state.facebookComments.selectedPost,
  comments: state.facebookComments.comments
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setAuthResponse, setPagePosts, setSelectedPage,
  setSelectedPost, setUserPages, setPostComments
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePostSteps)