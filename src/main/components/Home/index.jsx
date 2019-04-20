import React from 'react'
import Template from '../Template/'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <Template>
            <div className="section">
                <div className="jumbotron mt-3">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 text-center">
                            <h1>Bem-vindo ao Randomizador!</h1>
                            <h2>Faça login para salvar suas listas, sorteios, além de utilizar as ferramentas integradas com as redes sociais</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 offset-3">
                            <Link to="/login" className="btn btn-primary btn-block">Entrar</Link>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="section">
                <div className="jumbotron">
                    <div className="row">
                        <div className="col-md-10 offset-md-2">
                            <div className="row">
                                <div className="col-md-1 text-center">
                                    <p className="h2">Sortear</p>
                                </div>
                                <div className="col-md-2 text-center">
                                    <input className="form-control" type="number" />
                                </div>
                                <div className="col-md-2 text-center">
                                    <p className="h2">número entre</p>
                                </div>
                                <div className="col-md-2 text-center">
                                    <input className="form-control" type="number" />
                                </div>
                                <div className="col-md-1 text-center">
                                    <p className="h2">e</p>
                                </div>
                                <div className="col-md-3 text-center">
                                    <input className="form-control" type="number" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    )
}

export default Home
