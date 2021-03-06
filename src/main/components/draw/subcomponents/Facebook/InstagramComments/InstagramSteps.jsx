import React, { useState, useEffect } from 'react';
import { toastr } from 'react-redux-toastr';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import {
  setBusinessId as setBusinessIdAction,
  setComments as setCommentsAction,
  setMedias as setMediasAction,
  setSelectedMedia as setSelectedMediaAction,
} from '../../../../../redux/core/actions/instagramCommentsActions';
import {
  getUserPages,
  getPaginationResult,
  getAllComments,
} from '../../../../../services/facebook';
import {
  getBusinessAccountId,
  getMedia,
} from '../../../../../services/facebook/instagram';
import { setUserPages as setUserPagesAction } from '../../../../../redux/core/actions/facebookCommentsActions';
import firebase from '../../../../../services/firebase';
import PageSelection from '../FacebookComments/PageSelection';
import InstaCommentsDraw from './InstaCommentsDraw';
import MediaSelection from './MediaSelection';
import If from '../../../../utils/If';
import { log } from '../../../../../services/logger';

const InstagramSteps = props => {
  const [isLoading, setIsLoading] = useState(false);

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [isPickPageStepOpen, setPickPageStepOpen] = useState(true);
  const [isPickPostStepOpen, setPickPostStepOpen] = useState(false);
  const [isDrawStepOpen, setDrawStepOpen] = useState(false);

  const [isPickPageEnabled, setPickPageEnabled] = useState(true);
  const [isPickPostEnabled, setPickPostEnabled] = useState(false);
  const [isDrawStepEnabled, setDrawStepEnabled] = useState(false);

  const [isDrawOver, setDrawOver] = useState(false);

  const [nextMediasHref, setNextPostsHref] = useState();
  const [prevMediasHref, setPrevPostsHref] = useState();

  const [isFulfilled, setIsFulfilled] = useState(false);

  const fulfillUserPages = (userID, accessToken) => {
    setIsLoading(true);
    getUserPages(props.FB, userID, accessToken)
      .then(pagesResponse => {
        props.setUserPages(pagesResponse.data);
        setIsLoading(false);
      })
      .catch(err => {
        log(
          `[ERRO] ao tentar OBTER as páginas do usuário em InstagramSteps: ${err.message}`,
          props.uid,
          props.login,
        )
          .then(logId => {
            toastr.error('Error logged', `Log ID: ${logId}`);
          })
          .catch(logErr => {
            console.error(logErr);
            toastr.error(
              'LOG ERROR',
              'Não foi possível criar o log. OBTER as páginas do usuário em InstagramSteps',
            );
          });
      });
  };

  const warnAndRedirect = () => {
    setShouldRedirect(true);
    toastr.warning(
      'Atenção!',
      'Você precisa fazer login com sua conta do Facebook para este tipo de sorteio!',
    );
  };

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
          if (props.medias)
            if (
              props.medias.length > 0 &&
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

  const preparePagePosts = response => {
    if (response.paging) {
      if (response.paging.next) setNextPostsHref(response.paging.next);
      if (response.paging.previous) setPrevPostsHref(response.paging.previous);
    }
    props.setMedias(response.data);
    if (!response.data)
      log(
        `[WARNING] ao tentar OBTER os posts do usuário em InstagramSteps`,
        props.uid,
        props.login,
      )
        .then(logId => {
          toastr.error('Error logged', `Log ID: ${logId}`);
        })
        .catch(logErr => {
          console.error(logErr);
          toastr.error(
            'LOG ERROR',
            'Não foi possível criar o log de WARNING. OBTER os posts do usuário em InstagramSteps',
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
          `[ERRO] ao tentar OBTER o resultado da paginação em InstagramSteps: ${err.message}`,
          props.uid,
          props.login,
        )
          .then(logId => {
            toastr.error('Error logged', `Log ID: ${logId}`);
          })
          .catch(logErr => {
            console.error(logErr);
            toastr.error(
              'LOG ERROR',
              'Não foi possível criar o log. OBTER o resultado da paginação em InstagramSteps',
            );
          });
        toastr.error('Erro', err);
      });
  };

  const fulfillMedias = (businessId, accessToken) => {
    setIsLoading(true);
    getMedia(props.FB, businessId, accessToken)
      .then(response => {
        preparePagePosts(response);
        setIsLoading(false);
      })
      .catch(err => {
        log(
          `[ERRO] ao tentar OBTER os posts do Instagram em InstagramSteps: ${err.message}`,
          props.uid,
          props.login,
        )
          .then(logId => {
            toastr.error('Error logged', `Log ID: ${logId}`);
          })
          .catch(logErr => {
            console.error(logErr);
            toastr.error(
              'LOG ERROR',
              'Não foi possível criar o log. OBTER os posts do Instagram em InstagramSteps',
            );
          });
        toastr.error('Erro', err);
        setIsLoading(false);
      });
  };

  const onPageSelected = page => {
    setIsLoading(true);
    getBusinessAccountId(props.FB, page.id, page.access_token)
      .then(id => {
        if (id) {
          fulfillMedias(id, page.access_token);
          props.setBusinessId(id);
        } else {
          toastr.error(
            'Erro',
            'Essa página não tem uma conta do Instagram associada à ela, ou você não deu as permissões de login necessárias para o app.',
          );
          setIsLoading(false);
          // log(`[WARNING] A conta não possui businessID ou o ID enviado não tem permissões; ao tentar OBTER o business ID em InstagramSteps`,
          //   props.uid,
          //   props.login).then(logId => {
          //     toastr.error('Error logged', `Log ID: ${logId}`)
          //   }).catch(err => toastr.error('LOG ERROR',
          //     'Não foi possível criar o log de WARNING. OBTER o business ID em InstagramSteps'))
        }
      })
      .catch(err => {
        log(
          `[ERRO] ao tentar OBTER o business ID em InstagramSteps: ${err.message}`,
          props.uid,
          props.login,
        )
          .then(logId => {
            toastr.error('Error logged', `Log ID: ${logId}`);
          })
          .catch(logErr => {
            console.error(logErr);
            toastr.error(
              'LOG ERROR',
              '[ERRO] Não foi possível criar o log de ERRO. OBTER o business ID em InstagramSteps',
            );
          });
      });
    setPickPageStepOpen(false);
    setPickPostStepOpen(true);
  };

  const onMediaSelected = media => {
    setIsLoading(true);
    getAllComments(
      props.FB,
      `/${media.id}/comments?fields=username,text&access_token=${props.accessToken}`,
    )
      .then(data => {
        props.setComments(
          data.map(comment => ({ ...comment, permalink: media.permalink })),
        );
        setPickPostStepOpen(false);
        setDrawStepOpen(true);
        setIsLoading(false);
      })
      .catch(err => {
        log(
          `[ERRO] ao tentar OBTER os comentários em InstagramSteps: ${err.message}`,
          props.uid,
          props.login,
        )
          .then(logId => {
            toastr.error('Error logged', `Log ID: ${logId}`);
          })
          .catch(logErr => {
            console.error(logErr);
            toastr.error(
              'LOG ERROR',
              'Não foi possível criar o log. OBTER os comentários em InstagramSteps',
            );
          });
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
            isInstagram
          />
          <MediaSelection
            paginateTo={paginateTo}
            next={nextMediasHref}
            previous={prevMediasHref}
            isOpen={isPickPostStepOpen}
            enabled={isPickPostEnabled}
            setIsOpen={setPickPostStepOpen}
            onMediaSelected={onMediaSelected}
          />
          <InstaCommentsDraw
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
  userPages: state.facebookComments.userPages,
  medias: state.instagramComments.medias,
  login: state.login,
  uid: state.user.uid,
  FB: state.facebook.FB,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setBusinessId: setBusinessIdAction,
      setComments: setCommentsAction,
      setMedias: setMediasAction,
      setSelectedMedia: setSelectedMediaAction,
      setUserPages: setUserPagesAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(InstagramSteps);
