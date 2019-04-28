import React, { useState } from 'react'
import If from '../../../utils/If'

const Item = (props) => {

    let [enabled, setEnabled] = useState(true)
    let [editMode, setEditMode] = useState(!props.item.text)

    const setEditModeAndPrepareInput = (fillText, forceEdit) => {
        if (props.canAddNewItem || forceEdit) {
            setEditMode(true)
            setTimeout(() => {
                const inputEditItem = document.getElementById(`input-edit-item-${props.item.id}`)
                if (inputEditItem) {
                    if (fillText)
                        inputEditItem.value = fillText
                    inputEditItem.focus()
                }
            }, 20);
        }
    }

    const setEditModeIfNoText = () => {
        if (!props.item.text)
            setEditModeAndPrepareInput('', true)
    }

    let time = null
    const editWhenFinishedTyping = (e) => {
        let text = e.target.value
        clearTimeout(time)
        time = setTimeout(() => {
            props.onEdited(props.item, { ...props.item, text })
        }, 500);
    }

    const setEnabledState = () => {
        setEnabled(!enabled)
        props.setEnabledState(props.item, enabled)
    }

    return (
        <li draggable={true} className="list-group-item d-flex align-items-center" onClick={setEditModeIfNoText} onDoubleClick={() => setEditModeAndPrepareInput(props.item.text)}>
            <div className="container">
                <div className="row">
                    <div className="col-10">
                        <If c={editMode}>
                            <input autoFocus={true} id={`input-edit-item-${props.item.id}`} className="form-control" type="text" onKeyUp={editWhenFinishedTyping} />
                        </If>
                        <p>
                            <If c={enabled}>{props.item.text}</If>
                            <If c={!enabled}><del>{props.item.text}</del></If>
                        </p>
                    </div>
                    <div className="col-1">
                        <button className="btn btn-link text-decoration-none float-right" onClick={setEnabledState}>
                            <i className={`fas fa-${enabled ? "ban text-warning" : "check text-success"}`}></i>
                        </button>
                    </div>
                    <div className="col-1">
                        <button className="btn btn-link text-decoration-none float-right" onClick={() => props.onDelete(props.item)}>
                            <i className="fa fa-trash text-danger"></i>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Item