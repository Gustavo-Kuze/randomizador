import randomizadorIcon from '../../../img/randomizador_icon_1024.svg';
import React from 'react'
import Template from '../Template/'
import { Container, Row, Col } from 'reactstrap'

const About = () => {
    return (
        <Template>
            <div className="section">
                <Container>
                    <Row>
                        <Col className="text-center" xs={{ size: 6, offset: 3 }}>
                            <h1 className="h2">Sobre o <span className="sofia font-weight-bold">Randomizador </span></h1>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="d-flex justify-content-center align-items-center" xs={{ size: 6, offset: 3 }}>
                            <img src={randomizadorIcon} alt="Logo" className="img-fluid" style={{ maxHeight: '200px' }} />
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <Container className="p-5" style={{ backgroundColor: '#F5F5F5' }}>
                                <Row>
                                    <Col className="mb-3">
                                        <h3>Motivação</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className="text-dark lead">
                                            O <span className="sofia text-warning font-weight-bold">Randomizador </span>
                                            surgiu com a ideia de criar uma ferramenta que desse ao usuário total controle sobre suas listas de sorteio, além de ser um excelente laboratório para meus estudos com Reactjs.
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className="text-dark lead">
                                            Se essa ferramenta tem sido útil para você, fico muito feliz! Não deixe de conferir minhas outras aplicações no meu <span> <a className="text-decoration-none" href="https://www.gustavokuze.com" target="_blank" rel="noopener noreferrer">site</a></span>.
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className="text-dark lead">
                                            Se você é desenvolvedor e gostaria de dar uma espiadinha no código fonte, siga-me no <span><a className="text-decoration-none" href="https://github.com/Gustavo-Kuze" target="_blank" rel="noopener noreferrer">Github</a></span>! O pensamento open source moldará um futuro melhor.
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col>
                                        <h3>Origem do nome</h3>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col>
                                        <p className="text-dark lead">
                                            O nome "Randomizador" é uma referência à palavra da língua Inglesa "Random", que significa <strong>aleatório</strong>. Muito criativo, eu sei! <span role="img" aria-label="Rosto sorridente">😆</span>
                                        </p>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Template>
    )
}

export default About
