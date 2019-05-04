import React from 'react'
import Shuffle from '../subcomponents/Shuffle'
import Template from '../../Template'

const ShuffleDraw = () => {
    return (
        <Template>
            <div className="container mt-5">
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
