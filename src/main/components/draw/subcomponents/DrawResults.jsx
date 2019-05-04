import React, { useState } from 'react'
import { Tooltip } from 'reactstrap'
import { savePublicResult } from '../../../services/firebase/publicDraws'
import { savePrivateResult } from '../../../services/firebase/privateDraws'
import If from '../../utils/If'
import { Input } from 'reactstrap'
import { toastr } from 'react-redux-toastr'

const DrawResults = props => {
    const [isTooltipOpen, toggleTooltip] = useState()
    let [drawDescription, setDrawDescription] = useState('')

    const savePublicly = () => {
        savePublicResult({
            description: drawDescription,
            drawType: props.drawType,
            date: props.date,
            result: props.result
        }).then(number => {
            const toastrConfirmOptions = {
                disableCancel: true
            }
            toastr.confirm(`Sorteio salvo com sucesso, guarde o número para que possa consultar mais tarde: ${number}`, toastrConfirmOptions);
        })
    }

    const savePrivately = () => {
        savePrivateResult({
            description: drawDescription,
            drawType: props.drawType,
            date: props.date,
            result: props.result
        }).then(id => {
            const toastrConfirmOptions = {
                disableCancel: true
            }
            toastr.confirm(`Sorteio salvo com sucesso, navegue até "meus sorteios" para acessar os resultados salvos.`, toastrConfirmOptions);
        })
    }

    return (
        <>
            <div className="row mt-5">
                <div className={props.colClasses || 'col-12'} >
                    <h1 className={props.titleClasses || 'text-center lobster my-3'}>{props.title || 'Confira os resultados'}</h1>
                </div>
            </div>
            <div className="row">
                <div className={props.colClasses || 'col-12'}>
                    {props.children}
                </div>
            </div>
            <div className="row mt-5">
                <div className={props.colClasses || 'col-12'}>
                    <h4 className="text-center sofia">Sorteio realizado em: {props.date || new Date().toLocaleString()}</h4>
                </div>
            </div>
            <If c={!props.viewMode}>
                <div className="row mt-5">
                    <div className={props.colClasses || 'col-10 offset-1'}>
                        <div className="row">
                            <div className="col-12">
                                <Input className="text-center bg-light"
                                    type="text"
                                    placeholder="Dê uma descrição para salvar o sorteio (opcional)"
                                    onChange={e => setDrawDescription(e.target.value)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className={'col-12 col-sm-6 my-1'}>
                                <Tooltip placement="bottom" isOpen={isTooltipOpen} target="btn-save-publicly" toggle={() => toggleTooltip(!isTooltipOpen)}>
                                    <p>O resultado ficará acessível para aquele que obtiver o número, para todo o sempre</p>
                                </Tooltip>
                                <button id="btn-save-publicly" className="btn btn-block btn-outline-warning" onClick={savePublicly}>Salvar publicamente</button>
                            </div>
                            <div className={'col-12 col-sm-6 my-1'}>
                                <button className="btn btn-block btn-outline-info" onClick={savePrivately}>Salvar privado</button>
                            </div>
                        </div>
                    </div>
                </div>
            </If>
        </>
    )
}

export default DrawResults
