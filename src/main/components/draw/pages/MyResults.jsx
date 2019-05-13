import React, { useState, useEffect } from 'react'
import Template from '../../Template/'
import { Redirect } from 'react-router-dom'
import { getPrivateResults, deletePrivateResult, deleteAllPrivateResults } from '../../../services/firebase/privateDraws'
import drawTypes from '../drawUtils/drawTypes'
import { setPrivateResultOnState } from '../../../redux/core/actions/privateResults'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import firebase from '../../../services/firebase/'
import If from '../../utils/If'
import { toastr } from 'react-redux-toastr'

const MyResults = (props) => {

    let [results, setResults] = useState([])
    let [shouldRedirect, setShouldRedirect] = useState(false)


    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                getPrivateResults().then(snap => {
                    let resultsFromFirestore = []
                    if (snap) {
                        snap.forEach(doc => {
                            resultsFromFirestore.push({ id: doc.id, ...doc.data() })
                        })
                    }
                    setResults(resultsFromFirestore)
                })
            }
        })

    }, [])

    const DrawType = ({ type }) => {
        switch (type) {
            case drawTypes.HEAD_OR_TAILS:
                return <h4>Cara ou Coroa</h4>
            case drawTypes.LISTS:
                return <h4>Sorteio de listas</h4>
            case drawTypes.NUMBERS:
                return <h4>Sorteio de números</h4>
            case drawTypes.SHUFFLE:
                return <h4>Embaralhamento de frases</h4>
            case drawTypes.FACEBOOK_COMMENTS:
                return <h4>Comentários do Facebook</h4>
            default:
                return <h4>Sorteio</h4>
        }
    }

    const setResultOnStateAndRedirect = (result) => {
        props.setPrivateResultOnState(result)
        setShouldRedirect(true)
    }

    const deleteResult = result => {
        deletePrivateResult(result.id).then(sucess => {
            toastr.success('Sucesso!', 'O resultado foi excluído.')
            window.location.reload()
        }).catch(err => {
            toastr.error('Erro', 'Ocorreu um erro ao tentar excluir o resultado')
        })
    }

    const deleteAllResults = () => {
        const toastrConfirmOptions = {
            onCancel: () => { },
            onOk: () => {
                deleteAllPrivateResults().then(() => {
                    window.location.reload()
                })
            }
        }
        toastr.confirm(`Tem certeza de que deseja excluir todos os resultados de sorteio salvos? Isso não pode ser desfeito!`, toastrConfirmOptions)
    }

    return <>
        <If c={shouldRedirect}>
            <Redirect push to="/drawn" />
        </If>
        <If c={!shouldRedirect}>
            <Template>
                <div className="container">
                    <div className="row">
                        <div className="col-10 offset-1">
                            <div className="card">
                                <If c={results.length > 0}>
                                    <button className="btn btn-danger" onClick={deleteAllResults}>Excluir todos os resultados</button>
                                    <div className="list-group">
                                        {
                                            results.map(result => (
                                                <div key={result.id} className="list-group-item">
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-10" onClick={() => setResultOnStateAndRedirect(result)} style={{ cursor: 'pointer' }}>
                                                                <DrawType type={result.drawType} />
                                                                <p>{result.date}</p>
                                                            </div>
                                                            <div className="col-2">
                                                                <button className="btn btn-link text-decoration-none float-right pop-hover" onClick={() => deleteResult(result)}>
                                                                    <i className="fa fa-trash text-danger"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </If>
                                <If c={results.length === 0}>
                                    <h3 className="text-center p-5">Você não tem nenhum resultado de sorteio salvo...</h3>
                                </If>
                            </div>
                        </div>
                    </div>
                </div>
            </Template >
        </If>
    </>
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setPrivateResultOnState
}, dispatch)

export default connect(null, mapDispatchToProps)(MyResults)