import '../../../css/List.css'
import React, { useState } from 'react'
import Item from './Item'

const List = () => {

    const [lists, setLists] = useState([])
    const [items, setItems] = useState([
        { text: 'tanto faz' }
    ])

    return (
        <div className="card mt-5">
            <div className="card-body">
                <ul className="list-group">
                    {items.map((item, i) => (
                        <Item key={`${item.text}--${i}`} text={item.text} />
                    ))}
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <button className="btn btn-outline-success btn-block">
                            <i className="fa fa-plus fa-lg"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default List
