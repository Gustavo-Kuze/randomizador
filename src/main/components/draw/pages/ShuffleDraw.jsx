import React from 'react'
import Shuffle from '../subcomponents/Shuffle'
import Template from '../../Template'

const ShuffleDraw = () => {
    return (
        <Template>
            <div className="container mt-3">
                <div className="row mb-5">
                    <div className="col">
                        <h1 className="sofia"><strong>Embaralhador de Frases</strong></h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-10 offset-md-1">
                        <div className="card">
                            <div className="card-body">
                                <Shuffle />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    )
}

export default ShuffleDraw
