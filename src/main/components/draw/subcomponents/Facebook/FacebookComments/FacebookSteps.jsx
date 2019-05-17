import React, { useState, useEffect } from 'react'
import { toastr } from 'react-redux-toastr'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import { setAuthResponse } from '../../../../../redux/core/actions/facebookLoginActions'
import {
  setPagePosts, setUserPages, setPostComments
} from "../../../../../redux/core/actions/facebookCommentsActions";

import {
  getUserPages, getPagePosts, getPostComments,
  getPaginationResult, getAllComments
} from "../../../../../services/facebook";

import FacebookPermission from '../Common/FacebookPermission'
import PageSelection from './PageSelection'
import PostSelection from './PostSelection'
import FbCommentsDraw from './FbCommentsDraw'
import { Spinner } from 'reactstrap'
import If from '../../../../utils/If'

const FacebookSteps = (props) => {

  let [isLoading, setIsLoading] = useState(false)

  let [isStepOneOpen, setStepOneOpen] = useState(true)
  let [isStepTwoOpen, setStepTwoOpen] = useState(false)
  let [isStepThreeOpen, setStepThreeOpen] = useState(false)
  let [isStepFourOpen, setStepFourOpen] = useState(false)

  let [isStepOneEnabled, setStepOneEnabled] = useState(true)
  let [isStepTwoEnabled, setStepTwoEnabled] = useState(false)
  let [isStepThreeEnabled, setStepThreeEnabled] = useState(false)
  let [isStepFourEnabled, setStepFourEnabled] = useState(false)

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
    setIsLoading(true)
    getUserPages(authResponse.userID, authResponse.accessToken).then(pagesResponse => {
      props.setUserPages(pagesResponse.data)
      setIsLoading(false)
    })
  }

  const paginateTo = (href) => {
    setIsLoading(true)
    getPaginationResult(href).then(response => {
      preparePagePosts(response)
      window.scrollTo(0, 0)
      setIsLoading(false)
    }).catch(err => {
      toastr.error('Erro', err)
      setIsLoading(false)
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
    setIsLoading(false)
  }

  const onFacebookLogin = response => {
    setStepOneOpen(false)
    setStepTwoOpen(true)
    fulfillUserPages(response)
  }

  const toastOnError = err => toastr.error('Erro', err)

  const onPageSelected = page => {
    setIsLoading(true)
    getPagePosts(page.id, page.access_token)
      .then(preparePagePosts)
      .catch(err => {
        toastr.error('Erro', err)
        setIsLoading(false)
      })
    setStepTwoOpen(false)
    setStepThreeOpen(true)
  }

  const onPostSelected = post => {
    setIsLoading(true)
    getAllComments(`/${post.id}/comments?fields=id,message,permalink_url&access_token=${props.accessToken}`)
      .then(data => {
        props.setPostComments(data)
        setStepThreeOpen(false)
        setStepFourOpen(true)
        setIsLoading(false)
      }).catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }

  const onCommentsDrawn = () => {
    setStepOneEnabled(false)
    setStepTwoEnabled(false)
    setStepThreeEnabled(false)
    setStepFourEnabled(false)
    setStepOneOpen(false)
    setStepTwoOpen(false)
    setStepThreeOpen(false)
    setStepFourOpen(true)
  }

  return <>
    <If c={isLoading} cssHide>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <Spinner color="warning" />
        <p className="mt-3">Carregando, por favor aguarde...</p>
      </div>
    </If>
    <FacebookPermission onLogin={onFacebookLogin} onError={toastOnError} enabled={isStepOneEnabled}
      isOpen={isStepOneOpen} setIsOpen={setStepOneOpen} />
    <PageSelection onPageSelected={onPageSelected} enabled={isStepTwoEnabled}
      isOpen={isStepTwoOpen} setIsOpen={setStepTwoOpen} />
    <PostSelection paginateTo={paginateTo} next={nextPostsHref} previous={prevPostsHref}
      isOpen={isStepThreeOpen} enabled={isStepThreeEnabled} setIsOpen={setStepThreeOpen}
      onPostSelected={onPostSelected} />
    <FbCommentsDraw
      isOpen={isStepFourOpen} enabled={isStepFourEnabled}
      setIsOpen={setStepFourOpen}
      onCommentsDrawn={onCommentsDrawn} />
  </>
}

const mapStateToProps = state => ({
  loginStatus: state.facebook.status,
  authResponse: state.facebook.authResponse,
  accessToken: state.facebookComments.selectedPage.access_token,
  pagePosts: state.facebookComments.pagePosts,
  userPages: state.facebookComments.userPages
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setAuthResponse, setPagePosts, setUserPages, setPostComments
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FacebookSteps)