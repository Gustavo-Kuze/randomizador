import React, { useEffect, useState } from 'react'
import Template from '../../Template'
import { toastr } from 'react-redux-toastr'
import InstagramSteps from "../subcomponents/Facebook/InstagramComments/InstagramSteps";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import { setAuthResponse, setStatus } from '../../../redux/core/actions/facebookLoginActions'
import { resetInstagramComments } from '../../../redux/core/actions/instagramCommentsActions'
import { Redirect } from "react-router-dom";
import { Container, Row, Col } from "reactstrap"

let face = null

const InstagramDraw = (props) => {

    let [shouldRedirect, setRedirect] = useState(false)

    useEffect(() => {
        if (props.FB) {
            props.FB.getLoginStatus((loginStatusResponse) => {
                props.setStatus(loginStatusResponse.status)
                props.setAuthResponse(props.FB.getAuthResponse())
            })
        }
        // } else {
        //     toastr.error('Erro interno', 'Não foi possível carregar as ferramentas do Facebook, por favor recarregue a página.')
        //     setRedirect(true)
        // }

        return () => props.resetInstagramComments()
    })

    return (
        <>
            {
                shouldRedirect ? (
                    <Redirect to="/" />
                ) : (
                        <Template>
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
        </>
    )
}

const mapStateToProps = state => ({
    FB: state.facebook.FB
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setAuthResponse, setStatus, resetInstagramComments
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(InstagramDraw)