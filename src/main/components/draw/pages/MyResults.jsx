import React, { useState, useEffect } from 'react'
import Template from '../../Template/'
import { Redirect } from 'react-router-dom'
import { getPrivateResults } from '../../../services/firebase/privateDraws'
import drawTypes from '../drawUtils/drawTypes'
import { setPrivateResultOnState } from '../../../redux/core/actions/privateResults'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import firebase from '../../../services/firebase/'
import If from '../../utils/If'

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
                return <h4>Embaralhamento</h4>
            default:
                return <h4>Sorteio</h4>
        }
    }

    const setResultOnStateAndRedirect = (result) => {
        props.setPrivateResultOnState(result)
        setShouldRedirect(true)
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
                                <div className="list-group">
                                    {
                                        results.map(result => (
                                            <button key={result.id} className="list-group-item list-group-item-action" onClick={() => setResultOnStateAndRedirect(result)}>
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-10">
                                                            <DrawType type={result.drawType} />
                                                            <p>{result.date}</p>
                                                        </div>
                                                        <div className="col-2">
                                                            <button className="btn btn-link text-decoration-none float-right pop-hover">
                                                                <i className="fa fa-trash text-danger"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        ))
                                    }
                                </div>
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