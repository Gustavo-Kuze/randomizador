import React, { useState, useEffect } from 'react'
import Template from '../../Template/'
import DrawResults from '../subcomponents/DrawResults'
import drawTypes from '../drawUtils/drawTypes'
import { getPublicResult } from '../../../services/firebase/publicDraws'
import { toastr } from 'react-redux-toastr'


const ViewSavedDraw = ({ match }) => {

    let [drawId, setDrawId] = useState(0)
    let [drawResult, setDrawResult] = useState()

    useEffect(() => {
        setDrawId(match.params.id || 0)
        if (match.params.id > 0) {
            getPublicResult(match.params.id).then(result => {
                if (result.drawType) {
                    setDrawResult(result)
                    console.log(result)
                } else {
                    toastr.error('Erro', 'Não foi possível encontrar o sorteio')
                }
            })
        }
    }, [])

    return (
        <Template>
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-10 offset-1">
                            <DrawResults title="Os números sorteados foram:" colClasses="col-lg-10 col-12 offset-lg-1"
                                date={`${new Date().toLocaleString()}`}
                                drawType={drawTypes.NUMBERS}
                                result={""}
                                viewMode={true}
                            >
                                <table className="table table-striped table-bordered h3 text-center">
                                    <thead>
                                        <tr>
                                            <th>Posição</th>
                                            <th>Número sorteado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>id: {drawId}</td>
                                            <td>123</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </DrawResults>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    )
}

export default ViewSavedDraw
