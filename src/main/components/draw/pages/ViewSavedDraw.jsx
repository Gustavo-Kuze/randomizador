import React, { useState, useEffect } from 'react'
import Template from '../../Template/'
import DrawResults from '../subcomponents/DrawResults'
import drawTypes from '../drawUtils/drawTypes'
import { getPublicResult } from '../../../services/firebase/publicDraws'
import { toastr } from 'react-redux-toastr'
import If from '../../utils/If'
import { Input } from 'reactstrap'

const ViewSavedDraw = (props) => {

    let [drawId, setDrawId] = useState(0)
    let [drawResult, setDrawResult] = useState({})

    useEffect(() => {
        setDrawId(props.match.params.id || 0)
        if (props.match.params.id > 0) {
            getPublicResult(props.match.params.id).then(result => {
                if (result.drawType !== undefined) {
                    setDrawResult(result)
                } else {
                    toastr.error('Erro', 'Não foi possível encontrar o sorteio')
                }
            })
        }else{
            //private
        }
    }, [])

    return (
        <Template>
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-10 offset-1">
                            {
                                drawResult.drawType ? (
                                    <If c={drawResult.drawType}>
                                        <If c={drawResult.description}>
                                            <h3 className="sofia">Descrição: </h3>
                                            <p>{drawResult.description}</p>
                                        </If>
                                        <DrawResults title="O resultado do sorteio foi:" colClasses="col-lg-10 col-12 offset-lg-1"
                                            date={drawResult.date}
                                            drawType={drawResult.drawType}
                                            result={drawResult.result}
                                            viewMode={true}
                                        >
                                            {
                                                drawResult.drawType === drawTypes.NUMBERS ? (
                                                    <table className="table table-striped table-bordered h3 text-center">
                                                        <thead>
                                                            <tr>
                                                                <th>Posição</th>
                                                                <th>Número sorteado</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {drawResult.result.map((n, i) => (
                                                                <tr key={`${n}--${i}_${n}`}>
                                                                    <td>{++i}º</td>
                                                                    <td>{n}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                ) : ''
                                            }
                                            {
                                                drawResult.drawType === drawTypes.HEAD_OR_TAILS ? (
                                                    <>
                                                        <div id="moeda">
                                                            <If c={drawResult.result === 'Cara!'}>
                                                                <div>
                                                                    <img src="/img/cara.jpg" alt="Cara" />
                                                                </div>
                                                            </If>
                                                            <If c={drawResult.result === 'Coroa!'}>
                                                                <div >
                                                                    <img src="/img/coroa.jpg" alt="Coroa" />
                                                                </div>
                                                            </If>
                                                        </div>
                                                        <h3 className="display-4 text-center my-5 lobster h2 text-weight-bold">{drawResult.result}</h3>
                                                    </>
                                                ) : ''
                                            }
                                            {
                                                drawResult.drawType === drawTypes.SHUFFLE ? (
                                                    <div className="d-flex justify-content-betweend align-items-center flex-column">
                                                        <Input id="input-resultado" type="textarea" className="sort-textarea bg-light" value={drawResult.result} rows="10" readOnly="readonly" />
                                                    </div>
                                                ) : ''
                                            }
                                            {
                                                drawResult.drawType === drawTypes.LISTS ? (
                                                    <table className="table table-striped table-borderless">
                                                        <thead>
                                                            <tr>
                                                                <th>Posição</th>
                                                                <th>Item sorteado</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                drawResult.result.map((di, i) => (
                                                                    <tr key={`${di}--${i}`}>
                                                                        <td>{i + 1}</td>
                                                                        <td>{di}</td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                ) : ''
                                            }
                                        </DrawResults>
                                    </If>
                                ) : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Template >
    )
}

export default ViewSavedDraw
