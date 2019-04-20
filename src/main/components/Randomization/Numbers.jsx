import '../css/Numbers.css'
import React, { useState } from 'react'
import If from '../utils/If'
import Chance from 'chance'
let chance = new Chance()

const Numbers = () => {

    const [quantity, setQuantity] = useState()
    const [randMin, setRandMin] = useState()
    const [randMax, setRandMax] = useState()
    const [randNums, setRandNums] = useState([])

    // const createNumArray = (min, max) => {
    //     let arr = new Array(max)
    //     for (let i = min; i < max + 1; i++) {
    //         arr[i] = i
    //     }
    //     return arr
    // }

    const pickExclusiveOne = (min, max, picked) => {
        let temp = chance.integer({ min, max })
        if(!picked.includes(temp)){
            return temp
        }else{
            return pickExclusiveOne(min, max, picked)
        }
    }

    const draw = (min, max, count) => {
        let returnArr = []
        for (let index = 0; index < count; index++) {
            let num = pickExclusiveOne(min, max, returnArr)            
            returnArr = [...returnArr, num]
        }
        return returnArr
    }

    const drawNow = () => {
        if (quantity && randMin && randMax) {
            // setRandNum(Math.floor(Math.random() * randMax) + randMin)

            setRandNums(draw(randMin, randMax, quantity))

        } else {
            alert('Você precisa preencher os campos para efetuar um sorteio!')
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
                            <input className="form-control text-center bg-light" type="number" min="1" max="1000" placeholder="esta quantidade" onChange={e => setQuantity(parseInt(e.target.value))} />
                        </div>
                        <div className="col-md-4 col-12 text-center">
                            <input className="form-control text-center bg-light" type="number" min="0" max={randMax ? `${randMax - 1}` : "9999998"} placeholder="entre este valor" onChange={e => setRandMin(parseInt(e.target.value))} />
                        </div>
                        <div className="col-md-2 col-12 text-center">
                            <p className="h3 text-muted mt-3">e</p>
                        </div>
                        <div className="col-md-4 col-12 text-center">
                            <input className="form-control text-center bg-light" type="number" placeholder="este outro valor" min="1" max="9999999" onChange={e => setRandMax(parseInt(e.target.value))} />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-4 col-12 offset-md-3 ">
                            <button onClick={drawNow} className="btn btn-warning btn-block btn-lg mt-5">Sortear</button>
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
