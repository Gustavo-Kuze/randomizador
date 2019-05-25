import React, { useState } from 'react'
import { Tooltip } from 'reactstrap'
import { savePublicResult } from '../../../services/firebase/publicDraws'
import { savePrivateResult } from '../../../services/firebase/privateDraws'
import If from '../../utils/If'
import { Input } from 'reactstrap'
import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import { log } from '../../../services/logger/'

const DrawResults = props => {
    let [shouldRedirect, setRedirect] = useState(false)
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
                disableCancel: true,
                onOk: () => setRedirect(true)
            }
            toastr.confirm(`Sorteio salvo com sucesso, guarde o número para que possa consultar mais tarde: ${number}`, toastrConfirmOptions)
        }).catch(error => {
            log(`Erro ao tentar SALVAR um resultado público em DrawResults: ${error.message}`,
            props.uid,
            props.authResult).then(logId => {
                toastr.error('Error logged', `Log ID: ${logId}`)
            }).catch(err => toastr.error('LOG ERROR',
                'Não foi possível criar o log. SALVAR um resultado público em DrawResults'))
        })
    }

    const savePrivately = () => {
        //emailVerified
        if (true) {
            savePrivateResult({
                description: drawDescription,
                drawType: props.drawType,
                date: props.date,
                result: props.result
            }).then(id => {
                const toastrConfirmOptions = {
                    disableCancel: true,
                    onOk: () => setRedirect(true)
                }
                toastr.confirm(`Sorteio salvo com sucesso, navegue até "meus sorteios" para acessar os resultados salvos.`, toastrConfirmOptions)
            }).catch(err => {
                toastr.error('Erro!', 'Ocorreu um erro ao tentar salvar, teste fazer login novamente.')
                log(`Erro ao tentar SALVAR resultado privado em DrawResults: ${err.message}`,
                props.uid,
                props.authResult).then(logId => {
                    toastr.error('Error logged', `Log ID: ${logId}`)
                }).catch(err => toastr.error('LOG ERROR',
                    'Não foi possível criar o log. SALVAR um resultado privado em DrawResults'))
            })
        } else {
            toastr.error('Erro!', 'Você precisa estar logado com um e-mail verificado para salvar resultados de sorteio!')
        }
    }

    return <>
        {
            shouldRedirect ? (
                <Redirect to="/" />
            ) : (
                    <>
                        <div className="row mt-5">
                            <div className={props.colClasses || 'col-12'} >
                                <h1 className={props.titleClasses || 'text-center lobster my-3'}>{props.title || 'Confira os resultados'}</h1>
                            </div >
                        </div >
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
                                                O resultado ficará acessível para quem possuir seu número. Isso não pode ser desfeito!
                                            </Tooltip>
                                            <button id="btn-save-publicly" className="btn btn-block btn-outline-warning" onClick={savePublicly}>Salvar publicamente</button>
                                        </div>
                                        <div className={'col-12 col-sm-6 my-1'}>
                                            <button className="btn btn-block btn-outline-info" onClick={savePrivately}>Salvar apenas para mim</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </If>
                    </>
                )
        }
    </>
}

const mapStateToProps = state => ({
    emailVerified: state.user.emailVerified,
    uid: state.user.uid,
    authResult: state.login
})

export default connect(mapStateToProps)(DrawResults)
