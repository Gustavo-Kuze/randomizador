import React from 'react'
import Template from '../Template/'

const index = () => {
    return (
        <Template>
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-6 offset-3 text-center">
                            <h1>Ops...</h1>
                            <h3>Você esqueceu de verificar seu e-mail! <span role="img" aria-label="Rosto triste">😯</span></h3>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-10 col-lg-6 offset-1 offset-lg-3 text-center">
                            <div className="card w-auto" style={{ width: '18rem' }}>
                                <img className="card-img-top img-fluid" src="/img/verify_email.png" alt="Verifique seu e-mail" />
                                <div className="card-body">
                                    <h3>Verifique sua caixa de entrada</h3>
                                    <p className="card-text lead">Por favor clique no link do e-mail de verificação que nós lhe enviamos.</p>
                                    <p className="card-text lead"><strong>Dica:</strong> Se o e-mail não estiver em sua caixa de entrada, verifique a caixa de spam (lixo eletrônico).</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    )
}

export default index
