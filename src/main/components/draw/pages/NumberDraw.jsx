import React from 'react'
import Numbers from '../subcomponents/Numbers'
import Template from '../../Template/'

const NumberDraw = () => {
    return (
        <Template>
            <div className="container mt-3">
                <div className="row mb-5">
                    <div className="col">
                        <h1 className="sofia"><strong>Sorteio de Números</strong></h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-10 offset-1">
                        <div className="card">
                            <div className="card-body">
                                <Numbers />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    )
}

export default NumberDraw
