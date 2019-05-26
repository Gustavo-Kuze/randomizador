import '../css/Home.css'
import React from 'react'
import Template from '../Template/'
import { Link } from 'react-router-dom'
import ToolsSection from './ToolsSection';
import CheckResultsSection from './CheckResultsSection';
import AdSense from 'react-adsense'

const Home = () => {
    return (
        <Template>
            <div className="section">
                <div className="container-fluid mb-5">
                    <div className="row jumbotron">
                        <div className="col">
                            <p className="h2"> <strong className="text-danger"><span role="img" aria-label="Atenção">⚠</span> ATENÇÃO</strong></p>
                            <p className="h3"> Este app se encontra em DESENVOLVIMENTO! Todos os dados aqui salvos, podem ser excluídos a qualquer momento. Os sorteios do Facebook e Instagram precisam passar pela aprovação do Facebook e não estão 100% funcionais. Agradecemos sua paciência e compreensão!</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <AdSense.Google
                                client='ca-pub-4739817969139361'
                                slot='6373703710'
                                style={{ display: 'block' }}
                                format='auto'
                                responsive='true'
                            />
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-6 offset-3 d-flex justify-content-center align-items-center">
                            <img src="/img/randomizador_icon_1024.png" alt="Logo" className="img-fluid" style={{ maxHeight: '200px' }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 offset-md-2 text-center">
                            <h1>Bem-vindo ao <span className="sofia font-weight-bold">Randomizador</span> !</h1>
                            <h2 className="text-muted my-4 h3">Entre com sua conta para começar a criar listas de sorteio</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 offset-3">
                            <Link to="/user/lists" className="btn btn-primary btn-block">Minhas Listas</Link>
                        </div>
                    </div>
                </div>
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
