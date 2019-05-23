import '../../css/Numbers.css'
import React, { useState, useEffect } from 'react'
import If from '../../utils/If'
import { Input } from 'reactstrap'
import { toastr } from 'react-redux-toastr'
import { drawIntegers as draw } from '../../draw/drawUtils/'
import drawTypes from '../drawUtils/drawTypes'
import DrawResults from '../subcomponents/DrawResults'
import keycodes from '../../utils/keycodes'
import NumbersDrawResult from './CommonViewStructures/NumbersDrawResult'

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

    const isDrawAllowedIfNotWarnUser = () => {
        let isDrawAllowed = true
        if (!quantity || !randMin || !randMax) {
            toastr.warning('Atenção!', 'Você precisa preencher os campos para efetuar um sorteio!')
            isDrawAllowed = false
        }

        if (quantity <= 0 || quantity > 1000 ||
            randMin <= 0 || randMin > 9999999 ||
            randMax <= 0 || randMax > 9999999) {
            toastr.warning('Atenção!', 'Os valores definidos não podem ser negativos ou maiores que 9999999')
            isDrawAllowed = false
        }

        if (quantity > randMax) {
            toastr.warning('Atenção!', 'A quantidade de números sorteados não pode ser maior que o valor máximo!')
            isDrawAllowed = false
        }

        if (randMin >= randMax) {
            toastr.warning('Atenção!', 'O valor mínimo não pode ser maior ou igual ao valor máximo!')
            isDrawAllowed = false
        }

        return isDrawAllowed
    }

    const drawNow = () => {
        if (isDrawAllowedIfNotWarnUser())
            setRandNums(draw(randMin, randMax, quantity))
    }

    const setTouchedAndDrawOnEnter = (e) => {
        let code = e.keyCode || e.which
        if (code === keycodes.ENTER) {
            drawNow()
        }
        setAreInputsTouched(true)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-10 col-12 offset-lg-1">
                    <div className="row mb-3">
                        <div className="col-12 col-lg-10 text-center">
                            <p className="h3 text-muted">Sortear números</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2 col-12 text-center">
                            <Input className="text-center bg-light"
                                type="number"
                                placeholder="quantidade"
                                invalid={areInputsTouched && !isQuantityInputValid}
                                valid={areInputsTouched && isQuantityInputValid}
                                onChange={e => setQuantity(parseInt(e.target.value))}
                                onKeyUp={setTouchedAndDrawOnEnter} />
                        </div>
                        <div className="col-md-4 col-12 text-center">
                            <Input className="text-center bg-light"
                                type="number"
                                placeholder="entre este valor"
                                invalid={areInputsTouched && !isRandMinInputValid}
                                valid={areInputsTouched && isRandMinInputValid}
                                onChange={e => setRandMin(parseInt(e.target.value))}
                                onKeyUp={setTouchedAndDrawOnEnter} />
                        </div>
                        <div className="col-md-2 col-12 text-center">
                            <p className="h3 text-muted mt-3">e</p>
                        </div>
                        <div className="col-md-4 col-12 text-center">
                            <Input className="text-center bg-light"
                                type="number"
                                placeholder="este outro valor"
                                invalid={areInputsTouched && !isRandMaxInputValid}
                                valid={areInputsTouched && isRandMaxInputValid}
                                onChange={e => setRandMax(parseInt(e.target.value))}
                                onKeyUp={setTouchedAndDrawOnEnter} />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-4 col-12 offset-md-4 ">
                            <button onClick={drawNow} type="submit" className={`${randNums.length === 0 && isRandMaxInputValid && isRandMinInputValid && isQuantityInputValid ? 'btn-pulse-warning' : ''} btn btn-warning btn-block btn-lg mt-5`}>Sortear</button>
                        </div>
                    </div>
                </div>
            </div>
            <If c={randNums.length > 0}>
                <DrawResults title="Os números sorteados foram:" colClasses="col-lg-10 col-12 offset-lg-1"
                    date={`${new Date().toLocaleString()}`}
                    drawType={drawTypes.NUMBERS}
                    result={randNums}>

                    <NumbersDrawResult items={randNums} />
                </DrawResults>
            </If>
        </div>
    )
}

export default Numbers
