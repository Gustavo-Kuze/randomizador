import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFB } from '../redux/core/actions/facebookLoginActions';

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
    if (window.Facebook && !this.props.FB) {
      this.props.setFB({ ...window.Facebook });
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
      setFB,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(FacebookSDK);
