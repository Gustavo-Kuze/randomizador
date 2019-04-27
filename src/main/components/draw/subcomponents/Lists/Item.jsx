import React from 'react'

const Item = (props) => {
    return (
        <li draggable={true} className="list-group-item d-flex justify-content-between align-items-center">
            {props.text}
            <div>
                <button className="btn btn-link text-decoration-none" onClick={props.onDelete}>
                    <i className="fa fa-trash text-danger"></i>
                </button>
            </div>
        </li>
    )
}

export default Item
