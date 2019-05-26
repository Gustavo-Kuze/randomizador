import '../../../css/components/Home/ToolsSection.css'
import React from 'react'
import { Link } from 'react-router-dom'
import If from '../utils/If'
import { Container, Row, Col, CardBody, CardDeck } from 'reactstrap'

const Card = cardProps => {
    return (<>
        <If c={cardProps.src}>
            <div className={`card tools-section-card ${cardProps.className}`} style={cardProps.style}>
                <Link className="text-decoration-none" to={`/${cardProps.link}`}>
                    <CardBody className="d-flex justify-content-center align-items-center flex-column">
                        <img src={cardProps.src} alt={cardProps.alt} />
                        <h3>{cardProps.description}</h3>
                    </CardBody>
                </Link>
            </div>
        </If>
        <If c={!cardProps.src}>
            <div className={`card tools-section-card ${cardProps.className}`} style={cardProps.style}>
                <Link className="text-decoration-none d-flex w-100" to={`/${cardProps.link}`}>
                    <CardBody className="d-flex justify-content-center align-items-center flex-column">
                        <p>
                            <i className={cardProps.icon} ></i>
                        </p>
                        <h3>{cardProps.description}</h3>
                    </CardBody>
                </Link>
            </div>
        </If>
    </>
    )
}

const ToolsSection = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <p className="h2 text-center my-5 sofia"><strong>Faça sorteios de comentários</strong>!</p>
                </Col>
            </Row>
            <Row className="mb-5">
                <Col>
                    <CardDeck>
                        <Card link="facebook" icon="fab fa-facebook-square fa-5x" alt="Sorteio de comentários do Facebook" description="Facebook" style={{ height: '190px' }} className="d-flex justify-content-center align-items-center" />
                        <Card link="instagram" icon="fab fa-instagram fa-5x text-info" alt="Sorteio de comentários do Instagram" description="Instagram" style={{ height: '190px' }} className="d-flex justify-content-center align-items-center" />
                    </CardDeck>
                </Col>
            </Row>
            <Row className="my-3">
                <Col>
                    <p className="h3 text-center my-5">Seja qual for a ferramenta de sorteio que você esteja procurando, aqui você encontra!</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <CardDeck>
                        <Card link="numbers" src="/img/draw_numbers.png" alt="Sorteio de números" description="Sorteio de números" />
                        <Card link="shuffle" src="/img/draw_mix.png" alt="Embaralhador de frases" description="Embaralhador de frases" />
                        <Card link="headortails" src="/img/draw_coin.png" alt="Cara ou coroa" description="Cara ou coroa" />
                    </CardDeck>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <CardDeck>
                        <Card link="user/lists" icon="fas fa-list-ol fa-5x" alt="Listas de sorteio" description="Listas de sorteio" style={{ height: '190px' }} className="d-flex justify-content-center align-items-center" />
                    </CardDeck>
                </Col>
            </Row>
        </Container>
    )
}

export default ToolsSection
