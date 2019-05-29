import React, { useState } from 'react'
import { Input } from 'reactstrap'
import keycodes from '../utils/keycodes'
import If from '../utils/If'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'

const CheckResultsSection = () => {
    let [drawNumber, setDrawNumber] = useState()
    let [redirect, setRedirect] = useState(false)

    const drawKeyup = e => {
        let code = e.keyCode || e.which
        if (code === keycodes.ENTER) {
            setRedirect(true)
        }
    }

    return <>
        <If c={redirect}>
            <Redirect push to={`/drawn/${drawNumber || ''}`} />
        </If>
        <If c={!redirect}>
            <Container>
                <Row>
                    <Col xs={{ size: 10, offset: 1 }} className="text-center">
                        <h1>Quer verificar o resultado de um sorteio?</h1>
                        <Row>
                            <Col xs={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }} className="text-center">
                                <Input id="input-check-result" type="number" onKeyUp={drawKeyup} onChange={e => setDrawNumber(e.target.value)} placeholder="Informe o número do sorteio aqui" style={{ fontSize: '1.4em' }} min="1" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </If>
    </>
}

export default CheckResultsSection
