import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from '../routes/index';
import firebase from '../services/firebase';
import {
  login as loginAction,
  logout as logoutAction,
} from '../redux/core/actions/userActions';

class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      const { login, logout } = this.props;
      if (user) {
        const {
          displayName,
          email,
          uid,
          photoURL,
          emailVerified,
        } = firebase.auth().currentUser;
        login({ displayName, email, uid, photoURL, emailVerified });
      } else {
        logout();
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginAction,
      logoutAction,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(App);
