import '../../../../css/components/Template/Feedback/Feedback.css'
import React, { useState } from 'react'
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, Input } from "reactstrap"
import If from '../../utils/If'
import FilePicker from '../../utils/FilePicker'

const Feedback = () => {

    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [description, setDescription] = useState()
    const [file, setFile] = useState()

    const renderButtons = () => {
        return <Row className="feedback-buttons">
            <Col>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    outline block color="danger" className="text-light"><i className="far fa-thumbs-down fa-md"></i></Button>
            </Col>
            <Col>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    outline block color="success" className="text-light"><i className="far fa-thumbs-up fa-md"></i></Button>
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

            <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(!isModalOpen)} centered size="lg" >
                <ModalHeader className="bg-danger text-center text-light" toggle={() => setIsModalOpen(false)}>
                    Relatar um problema
                </ModalHeader>
                <ModalBody className="">
                    <Container>
                        <Row>
                            <Col>
                                <p className="h3">Use o campo abaixo para descrever seu problema</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input type="textarea" className="" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descreva seu problema aqui" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="h3">Envie uma captura de tela (opcional)</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FilePicker onPicked={(file) => {setFile(file)}} accept=",.jpg" isPictureUpload/>
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
            </Modal>

        </Container>
    </>
}

export default Feedback
