import '../../../../css/components/Template/Feedback/Feedback.css'
import React, { useState } from 'react'
import { Container, Row, Col, Button } from "reactstrap"
import If from '../../utils/If'

const Feedback = () => {

    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)

    const renderButtons = () => {
        return <Row className="feedback-buttons">
            <Col>
                <Button outline block color="danger" className="text-light"><i className="far fa-thumbs-down fa-md"></i></Button>
            </Col>
            <Col>
                <Button outline block color="success" className="text-light"><i className="far fa-thumbs-up fa-md"></i></Button>
            </Col>
        </Row>
    }

    return <>
        <Container className={`feedback-${isFeedbackOpen ? 'open' : 'closed'}-container`}
            onMouseEnter={() => setIsFeedbackOpen(true)}
            onMouseLeave={() => setIsFeedbackOpen(false)}>
            <If c={isFeedbackOpen}>
                <Row>
                    <Col>
                        <p className="feedback-label h3">O que você achou do Randomizador?</p>
                    </Col>
                </Row>
            </If>
            {renderButtons()}

        </Container>
    </>
}

export default Feedback
