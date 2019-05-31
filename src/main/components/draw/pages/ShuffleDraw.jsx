import React from 'react'
import Shuffle from '../subcomponents/Shuffle'
import Template from '../../Template'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import AdSense from 'react-adsense'

const ShuffleDraw = () => {
    return (
        <Template>
            <Container className="mt-5">
                <Col>
                    <Row className="mb-5">
                        <Col>
                            <h1 className="sofia"><strong>Embaralhador de Frases</strong></h1>
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
                        <Col xs={{ size: 12 }} md={{ size: 10, offset: 1 }}>
                            <Card>
                                <CardBody>
                                    <Shuffle />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Container>
        </Template>
    )
}

export default ShuffleDraw
