import '../css/Home.css'
import React from 'react'
import Template from '../Template/'
import { Link } from 'react-router-dom'
import Numbers from '../Randomization/Numbers'

const Home = () => {
    return (
        <Template>
            <div className="section">
                <div className="jumbotron mt-3">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 text-center">
                            <h1>Bem-vindo ao <span className="home-title">Randomizador</span> !</h1>
                            <h2 className="text-muted my-4 h3">Faça login para salvar suas listas e sorteios, além de ter acesso as ferramentas integradas com as redes sociais</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 offset-3">
                            <Link to="/login" className="btn btn-primary btn-block">Entrar</Link>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="my-4"/>
            <div className="section">
                <Numbers />
            </div>
        </Template>
    )
}

export default Home
