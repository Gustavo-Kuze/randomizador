import React, { useState, useEffect } from 'react'
import { toastr } from 'react-redux-toastr'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import { setAuthResponse } from '../../../../../redux/core/actions/facebookLoginActions'
import { setBusinessId, setComments, setMedias, setSelectedMedia } from '../../../../../redux/core/actions/instagramCommentsActions'
import { getUserPages, getPaginationResult } from '../../../../../services/facebook/'
import { getBusinessAccountId, getMedia, getMediaComments } from '../../../../../services/facebook/instagram'
import { setUserPages } from "../../../../../redux/core/actions/facebookCommentsActions";
import FacebookPermission from '../Common/FacebookPermission'
import PageSelection from '../FacebookComments/PageSelection'
import InstaCommentsDraw from "./InstaCommentsDraw";
import MediaSelection from "./MediaSelection";

const InstagramSteps = (props) => {

  let [isStepOneOpen, setStepOneOpen] = useState(true)
  let [isStepTwoOpen, setStepTwoOpen] = useState(false)
  let [isStepThreeOpen, setStepThreeOpen] = useState(false)
  let [isStepFourOpen, setStepFourOpen] = useState(false)

  let [isStepOneEnabled, setStepOneEnabled] = useState(true)
  let [isStepTwoEnabled, setStepTwoEnabled] = useState(false)
  let [isStepThreeEnabled, setStepThreeEnabled] = useState(false)
  let [isStepFourEnabled, setStepFourEnabled] = useState(false)

  let [nextMediasHref, setNextPostsHref] = useState()
  let [prevMediasHref, setPrevPostsHref] = useState()

  useEffect(() => {
    if (props.loginStatus === 'connected' && !isStepTwoEnabled && isStepOneEnabled)
      setStepTwoEnabled(true)
    if (props.userPages.length > 0 && !isStepThreeEnabled && isStepTwoEnabled && isStepOneEnabled)
      setStepThreeEnabled(true)
    if (props.medias.length > 0 && !isStepFourEnabled && isStepThreeEnabled && isStepTwoEnabled && isStepOneEnabled)
      setStepFourEnabled(true)
  })

  const fulfillUserPages = (authResponse) => {
    getUserPages(authResponse.userID, authResponse.accessToken).then(pagesResponse => {
      props.setUserPages(pagesResponse.data)
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
    fulfillUserPages(response)
  }

  const toastOnError = err => toastr.error('Erro', err)

  const fulfillMedias = (businessId, accessToken) => {
    getMedia(businessId, accessToken).then(response => {
      props.setMedias(response.data)
    })
  }

  const onPageSelected = page => {
    getBusinessAccountId(page.id, page.access_token).then((id) => {
      fulfillMedias(id, page.access_token)
    })
    setStepTwoOpen(false)
    setStepThreeOpen(true)
  }

  const onMediaSelected = media => {
    getMediaComments(media.id, props.accessToken).then(resp => {
      props.setComments(resp.data)
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
    <MediaSelection paginateTo={paginateTo} next={nextMediasHref} previous={prevMediasHref}
      isOpen={isStepTwoOpen} enabled={isStepTwoEnabled} setIsOpen={setStepTwoOpen}
      onMediaSelected={onMediaSelected} />
    <InstaCommentsDraw
      isOpen={isStepThreeOpen} enabled={isStepThreeEnabled}
      setIsOpen={setStepThreeOpen}
      onCommentsDrawn={onCommentsDrawn} />
  </>
}

const mapStateToProps = state => ({
  loginStatus: state.facebook.status,
  authResponse: state.facebook.authResponse,
  accessToken: state.facebookComments.selectedPage.access_token,
  userPages: state.facebookComments.userPages,
  medias: state.instagramComments.medias
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setAuthResponse, setBusinessId, setComments,
  setMedias, setSelectedMedia, setUserPages
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(InstagramSteps)