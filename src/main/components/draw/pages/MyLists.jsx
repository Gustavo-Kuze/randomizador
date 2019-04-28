import React, { useState } from 'react'
import Template from '../../Template'
import List from '../subcomponents/Lists/'

const MyLists = () => {
    let [idCounter, setIdCounter] = useState(0)
    const [lists, setLists] = useState([])

    const addList = () => {
        let id = idCounter += 1
        let list = { id, name: 'Lista sem nome' }
        setIdCounter(id)
        setLists([...lists, list])
    }

    const removeList = (list) => {
        setLists(lists.filter(l => l.id !== list.id))
    }

    const editName = (editedList) => {
        let newLists = lists.filter(i => i.id !== editedList.id)
        newLists = [editedList, ...newLists]
        setLists(newLists)
    }

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
                        <button className="btn btn-outline-primary" onClick={addList}>Nova lista</button>
                    </div>
                </div>
                <div className="row">
                    {
                        lists.map((l, i) => (
                            <div key={`list-div-${l.id}--${i}`} className="col-md-6">
                                <List list={l} removeList={removeList} onNameEdited={editName} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </Template>
    )
}

export default MyLists