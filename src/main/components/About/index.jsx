import React from 'react'
import Template from '../Template/'

const About = () => {
    return (
        <Template>
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-6 offset-3 text-center">
                            <h1 className="h2">Sobre o <span className="sofia font-weight-bold">Randomizador </span></h1>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-6 offset-3 d-flex justify-content-center align-items-center">
                            <img src="/img/randomizador_icon_1024.png" alt="Logo" className="img-fluid" style={{ maxHeight: '200px' }} />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col">
                            <div className="container p-5" style={{ backgroundColor: '#F5F5F5' }}>
                                <div className="row">
                                    <div className="col mb-3">
                                        <h3>Motivação</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p className="text-dark lead">
                                            O <span className="sofia text-warning font-weight-bold">Randomizador </span>
                                            surgiu com a ideia de criar uma ferramenta que desse ao usuário total controle sobre suas listas de sorteio, além de ser um excelente laboratório para meus estudos com Reactjs.
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p className="text-dark lead">
                                            Se essa ferramenta tem sido útil para você, fico muito feliz! Não deixe de conferir minhas outras aplicações no meu <span> <a className="text-decoration-none" href="https://www.gustavokuze.com" target="_blank" rel="noopener noreferrer">site</a></span>.
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p className="text-dark lead">
                                            Se você é desenvolvedor e gostaria de dar uma espiadinha no código fonte, siga-me no <span><a className="text-decoration-none" href="https://github.com/Gustavo-Kuze" target="_blank" rel="noopener noreferrer">Github</a></span>! O pensamento open source moldará um futuro melhor.
                                        </p>
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col">
                                        <h3>Origem do nome</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p className="text-dark lead">
                                            O nome "Randomizador" é uma referência à palavra da língua Inglesa "Random", que significa <strong>aleatório</strong>. Muito criativo, eu sei! <span role="img" aria-label="Rosto sorridente">😆</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    )
}

export default About
