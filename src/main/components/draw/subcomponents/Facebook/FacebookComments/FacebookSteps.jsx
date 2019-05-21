import React, { useState, useEffect } from 'react'
import { toastr } from 'react-redux-toastr'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import {
  setPagePosts, setUserPages, setPostComments
} from "../../../../../redux/core/actions/facebookCommentsActions";

import {
  getUserPages, getPagePosts, getPaginationResult, getAllComments
} from "../../../../../services/facebook";

import firebase from '../../../../../services/firebase/'
import PageSelection from './PageSelection'
import PostSelection from './PostSelection'
import FbCommentsDraw from './FbCommentsDraw'
import { Spinner } from 'reactstrap'
import If from '../../../../utils/If'
import { Redirect } from 'react-router-dom'

const FacebookSteps = (props) => {

  let [isLoading, setIsLoading] = useState(false)

  let [shouldRedirect, setShouldRedirect] = useState(false)

  let [isPickPageStepOpen, setPickPageStepOpen] = useState(false)
  let [isPickPostStepOpen, setPickPostStepOpen] = useState(false)
  let [isDrawStepOpen, setDrawStepOpen] = useState(false)

  let [isPickPageEnabled, setPickPageEnabled] = useState(false)
  let [isPickPostEnabled, setPickPostEnabled] = useState(false)
  let [isDrawStepEnabled, setDrawStepEnabled] = useState(false)

  let [nextPostsHref, setNextPostsHref] = useState()
  let [prevPostsHref, setPrevPostsHref] = useState()

  useEffect(() => {
    fulfillUserPages(
      props.login.additionalUserInfo.profile.id,
      props.login.credential.accessToken)
  }, [])

  useEffect(() => {
    debugger
    if (props.login.additionalUserInfo) {
      if (props.login.additionalUserInfo.providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID) {
        if (!isPickPageEnabled)
          setPickPageEnabled(true)
        if (props.userPages.length > 0 && !isPickPostEnabled && isPickPageEnabled)
          setPickPostEnabled(true)
        if (props.pagePosts.length > 0 && !isDrawStepEnabled && isPickPostEnabled && isPickPageEnabled)
          setDrawStepEnabled(true)
      } else {
        setShouldRedirect(true)
        toastr.warning('Atenção!', 'Você precisa fazer login com sua conta do Facebook para este tipo de sorteio!')
      }
    }
  })

  const fulfillUserPages = (userID, accessToken) => {
    setIsLoading(true)
    getUserPages(userID, accessToken).then(pagesResponse => {
      props.setUserPages(pagesResponse.data)
      setIsLoading(false)
    }).catch(err => { })
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

  const onPageSelected = page => {
    setIsLoading(true)
    getPagePosts(page.id, page.access_token)
      .then(preparePagePosts)
      .catch(err => {
        toastr.error('Erro', err)
        setIsLoading(false)
      })
    setPickPageStepOpen(false)
    setPickPostStepOpen(true)
  }

  const onPostSelected = post => {
    setIsLoading(true)
    getAllComments(`/${post.id}/comments?fields=id,message,permalink_url&access_token=${props.accessToken}`)
      .then(data => {
        props.setPostComments(data)
        setPickPostStepOpen(false)
        setDrawStepOpen(true)
        setIsLoading(false)
      }).catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }

  const onCommentsDrawn = () => {
    setPickPageEnabled(false)
    setPickPostEnabled(false)
    setDrawStepEnabled(false)
    setPickPageStepOpen(false)
    setPickPostStepOpen(false)
    setDrawStepOpen(true)
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
          <PageSelection onPageSelected={onPageSelected} enabled={isPickPageEnabled}
            isOpen={isPickPageStepOpen} setIsOpen={setPickPageStepOpen} />
          <PostSelection paginateTo={paginateTo} next={nextPostsHref} previous={prevPostsHref}
            isOpen={isPickPostStepOpen} enabled={isPickPostEnabled} setIsOpen={setPickPostStepOpen}
            onPostSelected={onPostSelected} />
          <FbCommentsDraw
            isOpen={isDrawStepOpen} enabled={isDrawStepEnabled}
            setIsOpen={setDrawStepOpen}
            onCommentsDrawn={onCommentsDrawn} />
        </>
    }
  </>
}

const mapStateToProps = state => ({
  accessToken: state.facebookComments.selectedPage.access_token,
  pagePosts: state.facebookComments.pagePosts,
  userPages: state.facebookComments.userPages,
  login: state.login
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setPagePosts, setUserPages, setPostComments
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FacebookSteps)