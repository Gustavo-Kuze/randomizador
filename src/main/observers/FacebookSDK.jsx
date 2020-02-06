import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFB as setFBAction } from '../redux/core/actions/facebookLoginActions';

export class FacebookSDK extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.observerTimer = setInterval(this.timer, 100);
  }

  componentWillUnmount() {
    clearInterval(this.observerTimer);
  }

  timer = () => {
    const { FB, setFB } = this.props;
    if (window.Facebook && !FB) {
      setFB({ ...window.Facebook });
      clearInterval(this.observerTimer);
    }
  };

  render() {
    return <></>;
  }
}

const mapStateToProps = state => ({
  FB: state.facebook.FB,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setFB: setFBAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(FacebookSDK);
