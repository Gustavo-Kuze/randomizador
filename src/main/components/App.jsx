import React, { Component } from 'react';
import Routes from '../routes/index'
import firebase from '../services/firebase/'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login, logout } from '../redux/core/actions/userActions'

class App extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        const { displayName, email, uid, photoURL, emailVerified } = firebase.auth().currentUser
        this.props.login({ displayName, email, uid, photoURL, emailVerified })
      }else{
        this.props.logout()
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  login, logout
}, dispatch)

export default connect(null, mapDispatchToProps)(App)