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
  getPagePostsFromPagination
} from "../../../../../services/facebook";

import FacebookPermission from '../Common/FacebookPermission'
import PageSelection from './PageSelection'
import PostSelection from './PostSelection'
import FbCommentsDraw from './FbCommentsDraw'

const FacebookSteps = (props) => {

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
    getUserPages(authResponse.userID, authResponse.accessToken).then(pagesResponse => {
      props.setUserPages(pagesResponse.data)
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

  const onFacebookLogin = response => {
    setStepOneOpen(false)
    setStepTwoOpen(true)
    fulfillUserPages(response)
  }

  const toastOnError = err => toastr.error('Erro', err)

  const onPageSelected = page => {
    getPagePosts(page.id, page.access_token)
      .then(preparePagePosts)
      .catch(err => {
        toastr.error('Erro', err)
      })
    setStepTwoOpen(false)
    setStepThreeOpen(true)
  }

  const onPostSelected = post => {
    getPostComments(post.id, props.accessToken).then(resp => {
      props.setPostComments(resp.data)
      setStepThreeOpen(false)
      setStepFourOpen(true)
    }).catch(err => {
      console.log(err)
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