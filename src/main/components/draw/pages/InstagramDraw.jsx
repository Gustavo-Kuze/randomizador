import React, { useEffect } from 'react'
import Template from '../../Template'
import InstagramSteps from "../subcomponents/Facebook/InstagramComments/InstagramSteps";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import { setAuthResponse, setStatus } from '../../../redux/core/actions/facebookLoginActions'
import { resetInstagramComments } from '../../../redux/core/actions/instagramCommentsActions'
import { Container, Row, Col } from "reactstrap"
import FacebookObserver from '../../../observers/FacebookSDK'

const InstagramDraw = (props) => {


    useEffect(() => {
        if (props.FB) {
            props.FB.getLoginStatus((loginStatusResponse) => {
                props.setStatus(loginStatusResponse.status)
                props.setAuthResponse(props.FB.getAuthResponse())
            })
        }

        return () => props.resetInstagramComments()
    })

    return (
        <Template>
            <FacebookObserver />
            <Container>
                <Row className="mb-5">
                    <Col>
                        <h1 className="sofia"><strong>Sorteio de Comentários do Instagram</strong></h1>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col xs={{ size: 12 }} md={{ size: 10, offset: 1 }}>
                        <h2 className="h4 mb-4">Siga os passos a seguir para fazer o sorteio</h2>
                        <InstagramSteps />
                    </Col>
                </Row>
            </Container>
        </Template>
    )
}

const mapStateToProps = state => ({
    FB: state.facebook.FB
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setAuthResponse, setStatus, resetInstagramComments
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(InstagramDraw)