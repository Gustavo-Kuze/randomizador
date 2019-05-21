import React, { useState, useEffect } from 'react'
import { toastr } from 'react-redux-toastr'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import { setBusinessId, setComments, setMedias, setSelectedMedia } from '../../../../../redux/core/actions/instagramCommentsActions'
import { getUserPages, getPaginationResult, getAllComments } from '../../../../../services/facebook/'
import { getBusinessAccountId, getMedia } from '../../../../../services/facebook/instagram'
import { setUserPages } from "../../../../../redux/core/actions/facebookCommentsActions";
import firebase from '../../../../../services/firebase/'
import PageSelection from '../FacebookComments/PageSelection'
import InstaCommentsDraw from "./InstaCommentsDraw";
import MediaSelection from "./MediaSelection";
import { Spinner } from 'reactstrap'
import If from '../../../../utils/If';
import { Redirect } from 'react-router-dom'

const InstagramSteps = (props) => {

  let [isLoading, setIsLoading] = useState(false)

  let [shouldRedirect, setShouldRedirect] = useState(false)

  let [isStepTwoOpen, setStepTwoOpen] = useState(false)
  let [isStepThreeOpen, setStepThreeOpen] = useState(false)
  let [isStepFourOpen, setStepFourOpen] = useState(false)

  let [isStepTwoEnabled, setStepTwoEnabled] = useState(false)
  let [isStepThreeEnabled, setStepThreeEnabled] = useState(false)
  let [isStepFourEnabled, setStepFourEnabled] = useState(false)

  let [nextMediasHref, setNextPostsHref] = useState()
  let [prevMediasHref, setPrevPostsHref] = useState()

  useEffect(() => {
    fulfillUserPages(
      props.login.additionalUserInfo.profile.id,
      props.login.credential.accessToken)
  }, [])

  useEffect(() => {
    if (props.login.additionalUserInfo) {
      if (props.login.additionalUserInfo.providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID) {
        if (!isStepTwoEnabled) {
          setStepTwoEnabled(true)
        }
        if (props.userPages.length > 0 && !isStepThreeEnabled && isStepTwoEnabled)
          setStepThreeEnabled(true)
        if (props.medias.length > 0 && !isStepFourEnabled && isStepThreeEnabled && isStepTwoEnabled)
          setStepFourEnabled(true)
      } else {
        setShouldRedirect(true)
        toastr.warning('Atenção!', 'Você precisa fazer login com sua conta do Facebook para este tipo de sorteio!')
      }
    }
  })

  const paginateTo = (href) => {
    setIsLoading(true)
    getPaginationResult(href).then(response => {
      preparePagePosts(response)
      window.scrollTo(0, 0)
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
    props.setMedias(response.data)
  }

  const fulfillUserPages = (userID, accessToken) => {
    setIsLoading(true)
    getUserPages(userID, accessToken).then(pagesResponse => {
      props.setUserPages(pagesResponse.data)
      setIsLoading(false)
    }).catch(err => { })
  }

  const fulfillMedias = (businessId, accessToken) => {
    setIsLoading(true)
    getMedia(businessId, accessToken).then(response => {
      preparePagePosts(response)
      setIsLoading(false)
    }).catch(err => {
      toastr.error('Erro', err)
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
        setIsLoading(false)
      }
    })
    setStepTwoOpen(false)
    setStepThreeOpen(true)
  }

  const onMediaSelected = media => {
    setIsLoading(true)
    getAllComments(`/${media.id}/comments?fields=username,text&access_token=${props.accessToken}`)
      .then(data => {
        props.setComments(data.map(comment => ({ ...comment, permalink: media.permalink })))
        setStepThreeOpen(false)
        setStepFourOpen(true)
        setIsLoading(false)
      }).catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }

  const onCommentsDrawn = () => {
    setStepTwoEnabled(false)
    setStepThreeEnabled(false)
    setStepFourEnabled(false)
    setStepTwoOpen(false)
    setStepThreeOpen(false)
    setStepFourOpen(true)
  }

  return <>
    {
      shouldRedirect ? (
        <Redirect to="/" />
      ) : <>
          <If c={isLoading} cssHide>
            <div className="d-flex justify-content-center align-items-center flex-column">
              <Spinner color="warning" />
              <p className="mt-3">Carregando, por favor aguarde...</p>
            </div>
          </If>
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
  </>

}

const mapStateToProps = state => ({
  accessToken: state.facebookComments.selectedPage.access_token,
  userPages: state.facebookComments.userPages,
  medias: state.instagramComments.medias,
  login: state.login
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setBusinessId, setComments,
  setMedias, setSelectedMedia, setUserPages
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(InstagramSteps)