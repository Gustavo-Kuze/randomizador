import '../css/ToolsSection.css'
import React from 'react'
import { Link } from 'react-router-dom'

const Card = cardProps => {
    return (
        <div className="card">
            <Link className="text-decoration-none" to={`/${cardProps.link}`}>
                <div className="card-body d-flex justify-content-center align-items-center flex-column">
                    <img src={cardProps.src} alt={cardProps.alt} />
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
                    <p className="h3 text-center my-5">Seja qual for a ferramenta de sorteio que você esteja procurando, aqui você encontra!</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="card-deck">
                        <Card link="numbers" src="/img/draw_numbers.png" alt="Sorteio de números" description="Sorteio de números" />
                        <Card link="sortlist" src="/img/draw_mix.png" alt="Embaralhador de frases" description="Embaralhador de frases" />
                        <Card link="headortails" src="/img/draw_coin.png" alt="Cara ou coroa" description="Cara ou coroa" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToolsSection
