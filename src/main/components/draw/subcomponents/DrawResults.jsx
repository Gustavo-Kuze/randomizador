import React from 'react'

const DrawResults = props => {
    return (
        <>
            <div className="row mt-5">
                <div className={props.colClasses || 'col-12'} >
                    <h1 className={props.h1Classes || 'text-center lobster'}>{props.title || 'Confira os resultados'}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {props.children}
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12">
                    <h4 className="text-center sofia">Sorteio realizado em: {props.date || new Date().toLocaleString()}</h4>
                </div>
            </div>
        </>
    )
}

export default DrawResults
