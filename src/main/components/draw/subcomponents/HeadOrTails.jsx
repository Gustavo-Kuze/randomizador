import '../../css/HeadOrTails.css'
import React, { useState } from 'react'
import If from '../../utils/If'
import DrawResults from '../subcomponents/DrawResults'

const HeadOrTails = () => {

    const [showResult, setShowResult] = useState(false)
    const [headOrTails, setHeadOrTails] = useState('')

    const flip = () => {
        const moeda = document.getElementById('moeda')
        setShowResult(false)
        let result = Math.random();
        moeda.className = ''

        setTimeout(() => {
            if (result <= 0.5) {
                moeda.classList.add('gira-cara')
                setHeadOrTails('Cara!')
            }
            else {
                moeda.classList.add('gira-coroa')
                setHeadOrTails('Coroa!')
            }
        }, 15);

        setTimeout(() => {
            setShowResult(true)
        }, 3000);
    }

    return (
        <>
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1 className="text-center mb-5 lobster">Clique na moeda para jogar</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div id="moeda" onClick={flip}>
                <div className="cara">
                    <img src="/img/cara.jpg" alt="Cara" />
                </div>
                <div className="coroa">
                    <img src="/img/coroa.jpg" alt="Coroa" />
                </div>
            </div>
            <div className="section mt-5">
                <div className="container">
                    <If c={showResult}>
                        <DrawResults title="O resultado foi:">
                            <h3 className="display-4 text-center my-5 lobster h2 text-weight-bold">{headOrTails}</h3>
                        </DrawResults>
                    </If>
                </div>
            </div>
        </>
    )
}

export default HeadOrTails
