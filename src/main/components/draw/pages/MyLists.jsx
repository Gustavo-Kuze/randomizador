import React from 'react'
import Template from '../../Template'
import List from '../subcomponents/Lists/'

const MyLists = () => {
    return (
        <Template>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Minhas listas</h1>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-6">
                        <button className="btn btn-outline-primary">Nova lista</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <List />
                    </div>
                    <div className="col-md-6">
                        <List />
                    </div>
                </div>
            </div>
        </Template>
    )
}

export default MyLists