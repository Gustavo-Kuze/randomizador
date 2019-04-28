import React, { useState } from 'react'
import If from '../../../utils/If'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editItemText, removeItem, setItemEnabledState } from '../../../../redux/core/actions/listsActions'

const Item = (props) => {

    let [enabled, setEnabled] = useState(props.item.enabled)
    let [editMode, setEditMode] = useState(!props.item.text)

    const setEditModeAndPrepareInput = (fillText, forceEdit) => {
        // if (props.canAddNewItem || forceEdit) {
            setEditMode(true)
            setTimeout(() => {
                const inputEditItem = document.getElementById(`input-edit-item-${props.item.id}`)
                if (inputEditItem) {
                    if (fillText)
                        inputEditItem.value = fillText
                    inputEditItem.focus()
                }
            }, 20);
        // }
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
            props.editItemText({ ...props.item, text }, props.listId)
        }, 500);
    }

    const setEnabledState = () => {
        let toggledEnabled = !enabled
        setEnabled(toggledEnabled)
        props.setItemEnabledState({...props.item, enabled: toggledEnabled}, props.listId)
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
                        <button className="btn btn-link text-decoration-none float-right" onClick={() => props.removeItem(props.item, props.listId)}>
                            <i className="fa fa-trash text-danger"></i>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({
    editItemText, removeItem, setItemEnabledState
}, dispatch)

export default connect(null, mapDispatchToProps)(Item)