import React, { useState, useEffect } from 'react';
import { toastr } from 'react-redux-toastr';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  setPagePosts,
  setUserPages,
  setPostComments,
} from '../../../../../redux/core/actions/facebookCommentsActions';

import {
  getUserPages,
  getPagePosts,
  getPaginationResult,
  getAllComments,
} from '../../../../../services/facebook';

import firebase from '../../../../../services/firebase/';
import PageSelection from './PageSelection';
import PostSelection from './PostSelection';
import FbCommentsDraw from './FbCommentsDraw';
import { Spinner } from 'reactstrap';
import If from '../../../../utils/If';
import { Redirect } from 'react-router-dom';
import { log } from '../../../../../services/logger/';

const FacebookSteps = props => {
  let [isLoading, setIsLoading] = useState(false);

  let [shouldRedirect, setShouldRedirect] = useState(false);

  let [isPickPageStepOpen, setPickPageStepOpen] = useState(true);
  let [isPickPostStepOpen, setPickPostStepOpen] = useState(false);
  let [isDrawStepOpen, setDrawStepOpen] = useState(false);

  let [isPickPageEnabled, setPickPageEnabled] = useState(true);
  let [isPickPostEnabled, setPickPostEnabled] = useState(false);
  let [isDrawStepEnabled, setDrawStepEnabled] = useState(false);

  let [isDrawOver, setDrawOver] = useState(false);

  let [nextPostsHref, setNextPostsHref] = useState();
  let [prevPostsHref, setPrevPostsHref] = useState();

  let [isFulfilled, setIsFulfilled] = useState(false);

  useEffect(() => {
    if (props.login.additionalUserInfo.profile) {
      if (
        props.login.additionalUserInfo.providerId ===
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ) {
        if (props.FB && !isFulfilled) {
          fulfillUserPages(
            props.login.additionalUserInfo.profile.id,
            props.login.credential.accessToken,
          );
          setIsFulfilled(true);
        }

        if (
          props.login.additionalUserInfo.providerId ===
          firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ) {
          if (!isPickPageEnabled && !isDrawOver) setPickPageEnabled(true);
          if (props.userPages)
            if (
              props.userPages.length > 0 &&
              !isPickPostEnabled &&
              isPickPageEnabled &&
              !isDrawOver
            )
              setPickPostEnabled(true);
          if (props.pagePosts)
            if (
              props.pagePosts.length > 0 &&
              !isDrawStepEnabled &&
              isPickPostEnabled &&
              isPickPageEnabled &&
              !isDrawOver
            )
              setDrawStepEnabled(true);
        } else {
          warnAndRedirect();
        }
      } else {
        warnAndRedirect();
      }
    } else {
      warnAndRedirect();
    }
  });

  const warnAndRedirect = () => {
    setShouldRedirect(true);
    toastr.warning(
      'Atenção!',
      'Você precisa fazer login com sua conta do Facebook para este tipo de sorteio!',
    );
  };

  const fulfillUserPages = (userID, accessToken) => {
    setIsLoading(true);
    getUserPages(props.FB, userID, accessToken)
      .then(pagesResponse => {
        props.setUserPages(pagesResponse.data);
        setIsLoading(false);
      })
      .catch(err => {
        log(
          `[ERRO] ao tentar OBTER as páginas do usuário no FacebookSteps: ${err.message}`,
          props.uid,
          props.login,
        )
          .then(logId => {
            toastr.error('Error logged', `Log ID: ${logId}`);
          })
          .catch(err =>
            toastr.error(
              'LOG ERROR',
              'Não foi possível criar o log de ERRO. OBTER as páginas do usuário no FacebookSteps',
            ),
          );
      });
  };

  const paginateTo = href => {
    setIsLoading(true);
    getPaginationResult(props.FB, href)
      .then(response => {
        preparePagePosts(response);
        window.scrollTo(0, 0);
        setIsLoading(false);
      })
      .catch(err => {
        log(
          `[ERRO] ao tentar OBTER o resultado da paginação em FacebookSteps: ${err.message}`,
          props.uid,
          props.login,
        )
          .then(logId => {
            toastr.error('Error logged', `Log ID: ${logId}`);
          })
          .catch(err =>
            toastr.error(
              'LOG ERROR',
              'Não foi possível criar o log de ERRO. OBTER o resultado da paginação em FacebookSteps',
            ),
          );
        toastr.error('Erro', err);
        setIsLoading(false);
      });
  };

  const preparePagePosts = response => {
    if (response.paging) {
      if (response.paging.next) setNextPostsHref(response.paging.next);
      if (response.paging.previous) setPrevPostsHref(response.paging.previous);
    }
    props.setPagePosts(response.data);
    setIsLoading(false);
    if (!response.data)
      log(
        `[WARNING] ao tentar OBTER os posts do usuário em InstagramSteps`,
        props.uid,
        props.login,
      )
        .then(logId => {
          toastr.error('Error logged', `Log ID: ${logId}`);
        })
        .catch(err =>
          toastr.error(
            'LOG ERROR',
            'Não foi possível criar o log de WARNING. OBTER os posts do usuário em InstagramSteps',
          ),
        );
  };

  const onPageSelected = page => {
    setIsLoading(true);
    getPagePosts(props.FB, page.id, page.access_token)
      .then(preparePagePosts)
      .catch(err => {
        log(
          `[ERRO] ao tentar OBTER os posts da página em FacebookSteps: ${err.message}`,
          props.uid,
          props.login,
        )
          .then(logId => {
            toastr.error('Error logged', `Log ID: ${logId}`);
          })
          .catch(err =>
            toastr.error(
              'LOG ERROR',
              'Não foi possível criar o log de ERRO. OBTER os posts da página em FacebookSteps',
            ),
          );
        toastr.error('Erro', err);
        setIsLoading(false);
      });
    setPickPageStepOpen(false);
    setPickPostStepOpen(true);
  };

  const onPostSelected = post => {
    setIsLoading(true);
    getAllComments(
      props.FB,
      `/${post.id}/comments?fields=id,message,permalink_url&access_token=${props.accessToken}`,
    )
      .then(data => {
        props.setPostComments(data);
        setPickPostStepOpen(false);
        setDrawStepOpen(true);
        setIsLoading(false);
      })
      .catch(err => {
        log(
          `[ERRO] ao tentar OBTER os comentários do post em FacebookSteps: ${err.message}`,
          props.uid,
          props.login,
        )
          .then(logId => {
            toastr.error('Error logged', `Log ID: ${logId}`);
          })
          .catch(err =>
            toastr.error(
              'LOG ERROR',
              'Não foi possível criar o log de ERRO. OBTER os comentários do post em FacebookSteps',
            ),
          );
        console.log(err);
        setIsLoading(false);
      });
  };

  const onCommentsDrawn = () => {
    setDrawOver(true);
    setPickPageEnabled(false);
    setPickPostEnabled(false);
    setDrawStepEnabled(false);
    setPickPageStepOpen(false);
    setPickPostStepOpen(false);
    setDrawStepOpen(true);
  };

  return (
    <>
      {shouldRedirect ? (
        <Redirect to="/" />
      ) : (
        <>
          <If c={isLoading} cssHide>
            <div className="d-flex justify-content-center align-items-center flex-column">
              <Spinner color="warning" />
              <p className="mt-3">Carregando, por favor aguarde...</p>
            </div>
          </If>
          <PageSelection
            onPageSelected={onPageSelected}
            enabled={isPickPageEnabled}
            isOpen={isPickPageStepOpen}
            setIsOpen={setPickPageStepOpen}
          />
          <PostSelection
            paginateTo={paginateTo}
            next={nextPostsHref}
            previous={prevPostsHref}
            isOpen={isPickPostStepOpen}
            enabled={isPickPostEnabled}
            setIsOpen={setPickPostStepOpen}
            onPostSelected={onPostSelected}
          />
          <FbCommentsDraw
            isOpen={isDrawStepOpen}
            enabled={isDrawStepEnabled}
            setIsOpen={setDrawStepOpen}
            onCommentsDrawn={onCommentsDrawn}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  accessToken: state.facebookComments.selectedPage.access_token,
  pagePosts: state.facebookComments.pagePosts,
  userPages: state.facebookComments.userPages,
  login: state.login,
  uid: state.user.uid,
  FB: state.facebook.FB,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setPagePosts,
      setUserPages,
      setPostComments,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(FacebookSteps);
