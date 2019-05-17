import React, { useState } from 'react'
import { Input } from 'reactstrap'
import keycodes from '../utils/keycodes'
import If from '../utils/If'
import { Redirect } from 'react-router-dom'

const CheckResultsSection = () => {
    let [drawNumber, setDrawNumber] = useState()
    let [redirect, setRedirect] = useState(false)

    const drawKeyup = e => {
        let code = e.keyCode || e.which
        if (code === keycodes.ENTER) {
            setRedirect(true)
        }
    }

    return <>
        <If c={redirect}>
            <Redirect push to={`/drawn/${drawNumber || ''}`} />
        </If>
        <If c={!redirect}>
            <div className="container">
                <div className="row">
                    <div className="col-10 offset-1 text-center">
                        <h1>Quer verificar o resultado de um sorteio?</h1>
                        <div className="row">
                            <div className="col-10 offset-1 col-md-6 offset-md-3">
                                <Input id="input-check-result" type="number" onKeyUp={drawKeyup} onChange={e => setDrawNumber(e.target.value)} placeholder="Informe o número do sorteio aqui" style={{fontSize: '1.4em'}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </If>
    </>
}

export default CheckResultsSection
