import '../../css/Sort.css'
import React, { useState } from 'react'
import { Input } from 'reactstrap'

const Sort = () => {
    return (
        <div className="section">
            <div className="jumbotron">
                <div className="row">
                    <div className="col text-center mb-5">
                        <h3>Digite as frases ou nomes para sortear, separadas por quebras de linha (Enter)</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-10 offset-1 col-md-8 offset-md-2">
                        <Input type="textarea" className="sort-textarea bg-light" rows="10" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-8 offset-2 col-md-6 offset-md-3">
                        <button className="btn btn-warning btn-block mt-5">Sortear</button>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default Sort
