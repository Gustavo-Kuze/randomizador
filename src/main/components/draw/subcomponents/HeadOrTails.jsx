import '../../css/HeadOrTails.css'
import React, { useState } from 'react'
import If from '../../utils/If'
import DrawResults from '../subcomponents/DrawResults'
import drawTypes from '../drawUtils/drawTypes'

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
                    <div className="row mb-5">
                        <div className="col">
                            <h1 className="sofia"><strong>Cara ou Coroa</strong></h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h1 className="h3 text-center mb-5">Clique na moeda para jogar</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div id="moeda" onClick={flip}>
                <div className="cara">
                    <img src="/img/cara.png" alt="Cara" />
                </div>
                <div className="coroa">
                    <img src="/img/coroa.png" alt="Coroa" />
                </div>
            </div>
            <div className="section mt-5">
                <div className="container">
                    <If c={showResult}>
                        <DrawResults title="O resultado foi:"
                            date={`${new Date().toLocaleString()}`}
                            drawType={drawTypes.HEAD_OR_TAILS}
                            result={headOrTails}
                        >
                            <h3 className="display-4 text-center my-5 lobster h2 text-weight-bold">{headOrTails}</h3>
                        </DrawResults>
                    </If>
                </div>
            </div>
        </>
    )
}

export default HeadOrTails
