import React from 'react'
import Numbers from '../subcomponents/Numbers'
import Template from '../../Template/'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'

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
