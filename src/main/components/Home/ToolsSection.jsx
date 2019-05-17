import '../css/ToolsSection.css'
import React from 'react'
import { Link } from 'react-router-dom'
import If from '../utils/If'

const Card = cardProps => {
    return (
        <div className={`card tools-section-card ${cardProps.className}`} style={cardProps.style}>
            <Link className="text-decoration-none" to={`/${cardProps.link}`}>
                <div className="card-body d-flex justify-content-center align-items-center flex-column">
                    <If c={cardProps.src}>
                        <img src={cardProps.src} alt={cardProps.alt} />
                    </If>
                    <If c={!cardProps.src}>
                        <i className={cardProps.icon} ></i>
                    </If>
                    <h3>{cardProps.description}</h3>
                </div>
            </Link>
        </div>
    )
}

const ToolsSection = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <p className="h2 text-center my-5 sofia"><strong>Faça sorteios de comentário</strong>!</p>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col">
                    <div className="card-deck">
                        <Card link="facebook" icon="fab fa-facebook-square fa-5x" alt="Sorteio de comentários do Facebook" description="Facebook" style={{ height: '190px' }} className="d-flex justify-content-center align-items-center" />
                        <Card link="instagram" icon="fab fa-instagram fa-5x text-info" alt="Sorteio de comentários do Instagram" description="Instagram" style={{ height: '190px' }} className="d-flex justify-content-center align-items-center" />
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <div className="col">
                    <p className="h3 text-center my-5">Seja qual for a ferramenta de sorteio que você esteja procurando, aqui você encontra!</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="card-deck">
                        <Card link="numbers" src="/img/draw_numbers.png" alt="Sorteio de números" description="Sorteio de números" />
                        <Card link="shuffle" src="/img/draw_mix.png" alt="Embaralhador de frases" description="Embaralhador de frases" />
                        <Card link="headortails" src="/img/draw_coin.png" alt="Cara ou coroa" description="Cara ou coroa" />
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col">
                    <div className="card-deck">
                        <Card link="user/lists" icon="fas fa-list-ol fa-5x" alt="Listas de sorteio" description="Listas de sorteio" style={{ height: '190px' }} className="d-flex justify-content-center align-items-center" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToolsSection
