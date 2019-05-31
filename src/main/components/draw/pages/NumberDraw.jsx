import React from 'react'
import Numbers from '../subcomponents/Numbers'
import Template from '../../Template/'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import AdSense from 'react-adsense'

const NumberDraw = () => {
    return (
        <Template>
            <Container className="mt-3">
                <Row className="mb-5">
                    <Col>
                        <h1 className="sofia"><strong>Sorteio de Números</strong></h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AdSense.Google
                            client='ca-pub-4739817969139361'
                            slot='6373703710'
                            style={{ display: 'block' }}
                            format='auto'
                            responsive='true'
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ size: 10, offset: 1 }}>
                        <Card>
                            <CardBody>
                                <Numbers />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Template>
    )
}

export default NumberDraw
