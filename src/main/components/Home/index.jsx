import '../css/Home.css'
import React from 'react'
import Template from '../Template/'
import { Link } from 'react-router-dom'
import ToolsSection from './ToolsSection';

const Home = () => {
    return (
        <Template>
            <div className="section">
                <div className="jumbotron">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 text-center">
                            <h1>Bem-vindo ao <span className="sofia font-weight-bold">Randomizador</span> !</h1>
                            <h2 className="text-muted my-4 h3">Faça login para salvar suas listas de sorteio, sorteios privados e muito mais!</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 offset-3">
                            <Link to="/login" className="btn btn-primary btn-block">Entrar</Link>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="my-4" />
            <div className="section">
                <ToolsSection />
            </div>
        </Template>
    )
}

export default Home
