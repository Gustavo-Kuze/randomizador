import React from 'react';
import { Collapse, Card } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSelectedPage as setSelectedPageAction } from '../../../../../redux/core/actions/facebookCommentsActions';
import If from '../../../../utils/If';

const PageSelection = ({
  setSelectedPage,
  onPageSelected,
  selectedPage,
  isInstagram,
  enabled,
  isOpen,
  userPages,
  setIsOpen,
}) => {
  const setPageAndCallback = page => {
    setSelectedPage(page);
    onPageSelected(page);
  };

  const renderPageRadio = page => (
    <>
      <input
        type="radio"
        id={`page-radio-${page.name}`}
        className="custom-control-input"
        checked={selectedPage ? selectedPage.name === page.name : false}
        onChange={() => setPageAndCallback(page)}
      />
      <label
        className="custom-control-label"
        htmlFor={`page-radio-${page.name}`}
      >
        {page.name}
      </label>
    </>
  );

  return (
    <>
      <button
        className={`btn btn-outline-${
          isInstagram ? 'info' : 'primary'
        } btn-block text-left mt-3 ${enabled ? '' : 'disabled'}`}
        disabled={!enabled}
        onClick={() => setIsOpen(enabled && !isOpen)}
        type="button"
      >
        1- Escolher sua página
      </button>
      <Collapse isOpen={enabled && isOpen}>
        <Card className="p-5 my-3">
          {userPages ? (
            <>
              <If c={userPages.length > 0}>
                <p className="lead text-center">
                  Escolha a página que contém o post para sortear!
                </p>
                {userPages
                  ? userPages.map((p, i) => (
                      <div
                        key={`page-radio-key--${i}`}
                        className="custom-control custom-radio"
                      >
                        {renderPageRadio(p)}
                      </div>
                    ))
                  : ''}
              </If>
              <If c={!userPages.length > 0}>
                Você não tem nenhuma página ou ainda não deu as permissões para
                o App
              </If>
            </>
          ) : (
            <p>
              Não foi possível recuperar suas páginas. Por favor, tente sair de
              sua conta e fazer login com o Facebook novamente.
            </p>
          )}
        </Card>
      </Collapse>
    </>
  );
};

const mapStateToProps = state => ({
  userPages: state.facebookComments.userPages,
  selectedPage: state.facebookComments.selectedPage,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSelectedPage: setSelectedPageAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(PageSelection);
