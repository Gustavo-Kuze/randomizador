import '../../../css/components/Home/Home.css'
import React from 'react'
import Template from '../Template/'
import { Link } from 'react-router-dom'
import ToolsSection from './ToolsSection';
import CheckResultsSection from './CheckResultsSection';
import { Container, Row, Col, Jumbotron } from 'reactstrap'
import AdSense from 'react-adsense'

const Home = () => {
    return (
        <Template>
            <div className="section">
                <Container fluid className="mb-5">
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
                    <Row className="my-3">
                        <Col xs={{ size: 6, offset: 3 }} className="d-flex justify-content-center align-items-center">
                            <img src="/img/randomizador_icon_1024.png" alt="Logo" className="img-fluid" style={{ maxHeight: '200px' }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ size: 12 }} md={{ size: 8, offset: 2 }} className="text-center">
                            <h1>Bem-vindo ao <span className="sofia font-weight-bold">Randomizador</span> !</h1>
                            <h2 className="text-muted my-4 h3">Entre com sua conta para começar a criar listas de sorteio</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ size: 6, offset: 3 }} className="d-flex justify-content-center align-items-center">
                            <Link to="/user/lists" className="btn btn-primary btn-block">Minhas Listas</Link>
                        </Col>
                    </Row>
                </Container>
            </div>
            <hr className="my-4 mt-3" />
            <div className="section">
                <ToolsSection />
            </div>
            <hr className="my-4" />
            <div className="section bg-warning text-white py-5">
                <CheckResultsSection />
            </div>
        </Template>
    )
}

export default Home
