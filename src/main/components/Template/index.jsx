/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import Feedback from './Feedback';
import { setIsMenuOpen as setIsMenuOpenAction } from '../../redux/core/actions/globalActions';

const Template = ({ children, setIsMenuOpen, history }) => {
  history.listen(() => {
    setIsMenuOpen(false);
  });

  return (
    <>
      <Header />
      <main className="mt-5 pt-5 pb-5 mb-5">{children}</main>
      <Feedback />
      <Footer />
    </>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setIsMenuOpen: setIsMenuOpenAction,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(withRouter(Template));
