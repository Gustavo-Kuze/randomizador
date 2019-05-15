import React, { useState, useEffect } from 'react'
import { toastr } from 'react-redux-toastr'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import { setAuthResponse } from '../../../../../redux/core/actions/facebookLoginActions'
import { getPaginationResult } from '../../../../../services/facebook/'
import { getBusinessAccount, getMedia, getMediaComments } from '../../../../../services/facebook/instagram'

import FacebookPermission from '../Common/FacebookPermission'

const InstagramSteps = (props) => {

  let [isStepOneOpen, setStepOneOpen] = useState(true)
  let [isStepTwoOpen, setStepTwoOpen] = useState(false)
  let [isStepThreeOpen, setStepThreeOpen] = useState(false)

  let [isStepOneEnabled, setStepOneEnabled] = useState(true)
  let [isStepTwoEnabled, setStepTwoEnabled] = useState(false)
  let [isStepThreeEnabled, setStepThreeEnabled] = useState(false)

  let [nextPostsHref, setNextPostsHref] = useState()
  let [prevPostsHref, setPrevPostsHref] = useState()

  useEffect(() => {
    if (props.loginStatus === 'connected' && !isStepTwoEnabled && isStepOneEnabled)
      setStepTwoEnabled(true)
    if (props.userPages.length > 0 && !isStepThreeEnabled && isStepTwoEnabled && isStepOneEnabled)
      setStepThreeEnabled(true)
  })

  const fulfillMedias = (businessId, authResponse) => {
    getMedia(businessId, authResponse.accessToken).then(response => {
      props.setUserPages(response.data)
    })
  }

  const paginateTo = (href) => {
    getPaginationResult(href).then(response => {
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
    fulfillMedias(response)
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
    }).catch(err => {
      console.log(err)
    })
  }

  const onCommentsDrawn = () => {
    setStepOneEnabled(false)
    setStepTwoEnabled(false)
    setStepThreeEnabled(false)
    setStepOneOpen(false)
    setStepTwoOpen(false)
    setStepThreeOpen(false)
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
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setAuthResponse
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(InstagramSteps)