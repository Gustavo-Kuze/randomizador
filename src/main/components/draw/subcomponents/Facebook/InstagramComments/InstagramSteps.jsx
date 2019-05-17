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
import { Spinner } from 'reactstrap'
import If from '../../../../utils/If';

const InstagramSteps = (props) => {

  let [isLoading, setIsLoading] = useState(false)

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

  const paginateTo = (href) => {
    setIsLoading(true)
    getPaginationResult(href).then(response => {
      preparePagePosts(response)
      setIsLoading(false)
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

  const fulfillUserPages = (authResponse) => {
    setIsLoading(true)
    getUserPages(authResponse.userID, authResponse.accessToken).then(pagesResponse => {
      props.setUserPages(pagesResponse.data)
      setIsLoading(false)
    })
  }
  const toastOnError = err => toastr.error('Erro', err)

  const fulfillMedias = (businessId, accessToken) => {
    setIsLoading(true)
    getMedia(businessId, accessToken).then(response => {
      props.setMedias(response.data)
      setIsLoading(false)
    })
  }

  const onPageSelected = page => {
    setIsLoading(true)
    getBusinessAccountId(page.id, page.access_token).then((id) => {
      if (id) {
        fulfillMedias(id, page.access_token)
        props.setBusinessId(id)
      } else {
        toastr.error('Erro', 'Essa página não tem uma conta do Instagram associada à ela')
      }
      setIsLoading(false)
    })
    setStepTwoOpen(false)
    setStepThreeOpen(true)
  }

  const onMediaSelected = media => {
    setIsLoading(true)
    getMediaComments(media.id, props.accessToken).then(resp => {
      props.setComments(resp.data.map(comment => ({ ...comment, permalink: media.permalink })))
      setStepThreeOpen(false)
      setStepFourOpen(true)
      setIsLoading(false)
    }).catch(err => {
      console.log(err)
    })
  }

  const onCommentsDrawn = () => {
    setStepOneEnabled(false)
    setStepTwoEnabled(false)
    setStepThreeEnabled(false)
    setStepFourEnabled(true)
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
      isOpen={isStepOneOpen} setIsOpen={setStepOneOpen}
      isInstagram={true} />
    <PageSelection onPageSelected={onPageSelected} enabled={isStepTwoEnabled}
      isOpen={isStepTwoOpen} setIsOpen={setStepTwoOpen}
      isInstagram={true} />
    <MediaSelection paginateTo={paginateTo} next={nextMediasHref} previous={prevMediasHref}
      isOpen={isStepThreeOpen} enabled={isStepThreeEnabled} setIsOpen={setStepThreeOpen}
      onMediaSelected={onMediaSelected} />
    <InstaCommentsDraw
      isOpen={isStepFourOpen} enabled={isStepFourEnabled}
      setIsOpen={setStepFourOpen}
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