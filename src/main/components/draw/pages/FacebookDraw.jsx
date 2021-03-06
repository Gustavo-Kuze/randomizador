import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import Template from '../../Template';
import FacebookSteps from '../subcomponents/Facebook/FacebookComments/FacebookSteps';
import {
  setAuthResponse,
  setStatus,
} from '../../../redux/core/actions/facebookLoginActions';
import { resetFacebookComments } from '../../../redux/core/actions/facebookCommentsActions';
import FacebookObserver from '../../../observers/FacebookSDK';

const FacebookDraw = props => {
  useEffect(() => {
    if (props.FB) {
      props.FB.getLoginStatus(loginStatusResponse => {
        props.setStatus(loginStatusResponse.status);
        props.setAuthResponse(props.FB.getAuthResponse());
      });
    }

    return () => props.resetFacebookComments();
  });

  return (
    <Template>
      <FacebookObserver />
      <Container>
        <Row className="mb-5">
          <Col>
            <h1 className="sofia">
              <strong>Sorteio de Comentários do Facebook</strong>
            </h1>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col xs={{ size: 12 }} md={{ size: 10, offset: 1 }}>
            <h2 className="h4 mb-4">
              Siga os passos a seguir para fazer o sorteio
            </h2>
            <FacebookSteps />
          </Col>
        </Row>
      </Container>
    </Template>
  );
};

const mapStateToProps = state => ({
  FB: state.facebook.FB,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setAuthResponse,
      setStatus,
      resetFacebookComments,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(FacebookDraw);
