import React from 'react'
import Numbers from '../subcomponents/Numbers'
import Template from '../../Template/'

const NumberDraw = () => {
    return (
        <Template>
            <div className="container mt-5">
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
