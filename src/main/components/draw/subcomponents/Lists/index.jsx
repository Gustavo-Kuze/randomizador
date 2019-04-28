import '../../../css/List.css'
import React, { useState } from 'react'
import Item from './Item'
import ListTitle from './ListTitle'

const List = (props) => {
    let [idCounter, setIdCounter] = useState(1)
    let [canAddItem, setCanAddItem] = useState(true)
    let [items, setItems] = useState([
        { id: 1, text: 'tanto faz', enabled: true }
    ])

    const addItem = () => {
        if (canAddItem) {
            let id = idCounter += 1
            let item = { id, text: '', enabled: true }
            setIdCounter(id)
            setItems([...items, item])
            setCanAddItem(false)
        }
    }

    const editItem = (oldItem, editedItem) => {
        let newItems = items.filter(i => i.id !== oldItem.id)
        newItems = [...newItems, editedItem]
        setItems(newItems)
        setCanAddItem(true)
    }

    const deleteItem = item => {
        setItems(items.filter(i => i.id !== item.id))
        if (item.text === '')
            setCanAddItem(true)
    }

    return (
        <div className="card mt-5">
            <div className="card-header">
                <div className="container">
                    <div className="row">
                        <div className="col-11">
                            <ListTitle list={props.list} onListEdited={props.onNameEdited}/>
                        </div>
                        <div className="col-1">
                            <button className="btn btn-link text-decoration-none" onClick={() => props.removeList(props.list)}>
                                <i className="fa fa-times fa-lg text-danger"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {items.map((item, i) => (
                        <Item key={`${item.text}--${props.list.id}--${i}`} item={item} onEdited={editItem} onDelete={deleteItem} canAddNewItem={canAddItem} />
                    ))}
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <button className="btn btn-outline-success btn-block" onClick={addItem}>
                            <i className="fa fa-plus fa-lg"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default List
