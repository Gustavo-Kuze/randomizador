import React from 'react'
import Template from '../../Template'
import List from '../subcomponents/List'

const MyLists = () => {
    return (
        <Template>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Minhas listas</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <List />
                    </div>
                </div>
            </div>
        </Template>
    )
}

export default MyLists