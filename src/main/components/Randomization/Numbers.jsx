import '../css/Numbers.css'
import React, { useState, useEffect } from 'react'
import If from '../utils/If'
import { Input } from 'reactstrap'
import { toastr } from 'react-redux-toastr'
import {drawIntegers as draw} from '../../services/drawEngine/'

const Numbers = () => {

    const [quantity, setQuantity] = useState()
    const [randMin, setRandMin] = useState()
    const [randMax, setRandMax] = useState()
    const [randNums, setRandNums] = useState([])
    const [isQuantityInputValid, setQuantityInputAsValid] = useState()
    const [isRandMinInputValid, setRandMinInputAsValid] = useState()
    const [isRandMaxInputValid, setRandMaxInputAsValid] = useState()
    const [areInputsTouched, setAreInputsTouched] = useState()

    useEffect(() => {
        setQuantityInputAsValid(quantity > 0 && quantity <= 1000)
        setRandMaxInputAsValid(randMax > 0 && randMax <= 9999999)
        setRandMinInputAsValid(randMin > 0 && randMin <= 9999999)
    })

    const drawNow = () => {
        if (quantity && randMin && randMax) {
            if (quantity > 0 && quantity <= 1000 && randMin > 0 && randMin <= 9999999 && randMax > 0 && randMax <= 9999999) {
                setRandNums(draw(randMin, randMax, quantity))
            } else {
                toastr.warning('Atenção!', 'Os valores definidos não podem ser negativos ou maiores que 9999999')
            }
        } else {
            toastr.warning('Atenção!', 'Você precisa preencher os campos para efetuar um sorteio!')
        }
    }

    return (
        <div className="jumbotron">
            <div className="row">
                <div className="col-lg-10 col-12 offset-lg-2">
                    <div className="row mb-3">
                        <div className="col-12 col-lg-10 text-center">
                            <p className="h3 text-muted">Sortear números</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2 col-12 text-center">
                            <Input className="text-center bg-light" type="number" placeholder="esta quantidade" invalid={areInputsTouched && !isQuantityInputValid} valid={areInputsTouched && isQuantityInputValid} onChange={e => setQuantity(parseInt(e.target.value))} onKeyUp={setAreInputsTouched} />
                        </div>
                        <div className="col-md-4 col-12 text-center">
                            <Input className="text-center bg-light" type="number" placeholder="entre este valor" invalid={areInputsTouched && !isRandMinInputValid} valid={areInputsTouched && isRandMinInputValid} onChange={e => setRandMin(parseInt(e.target.value))} onKeyUp={setAreInputsTouched} />
                        </div>
                        <div className="col-md-2 col-12 text-center">
                            <p className="h3 text-muted mt-3">e</p>
                        </div>
                        <div className="col-md-4 col-12 text-center">
                            <Input className="text-center bg-light" type="number" placeholder="este outro valor" invalid={areInputsTouched && !isRandMaxInputValid} valid={areInputsTouched && isRandMaxInputValid} onChange={e => setRandMax(parseInt(e.target.value))} onKeyUp={setAreInputsTouched} />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-4 col-12 offset-md-3 ">
                            <button onClick={drawNow} type="submit" className="btn btn-warning btn-block btn-lg mt-5">Sortear</button>
                        </div>
                    </div>

                </div>

            </div>
            <If c={randNums.length > 0}>
                <div className="row mt-5">
                    <div className="col-12">
                        <h1 className="draw-result text-center">Os números sorteados foram:</h1>
                        <table className="table table-striped table-bordered h3 text-center">
                            <thead>
                                <tr>
                                    <th>Posição</th>
                                    <th>Número sorteado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {randNums.map((n, i) => (
                                    <tr key={`${n}--${i}_${n}`}>
                                        <td>{++i}º</td>
                                        <td>{n}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </If>
        </div>
    )
}

export default Numbers
