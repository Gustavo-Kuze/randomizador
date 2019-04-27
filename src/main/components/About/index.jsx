import React from 'react'
import Template from '../Template/'

const About = () => {
    return (
        <Template>
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1>Sobre o randomizador</h1>
                            <h3>Sim, ele é inspirado no sorteador 😆</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="jumbotron">
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
                                        Se essa ferramenta tem sido útil para você, fico muito feliz! Não deixe de conferir minhas outras aplicações no meu <span> <a className="text-decoration-none" href="https://www.gustavokuze.com" target="_blank" rel="noopener noreferer">site</a></span>.
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p className="text-dark lead">
                                            Se você é desenvolvedor e gostaria de dar uma espiadinha no código fonte, siga-me no <span><a className="text-decoration-none" href="https://github.com/Gustavo-Kuze" target="_blank" rel="noopener noreferer">Github</a></span>! O pensamento open source moldará um futuro melhor.
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
