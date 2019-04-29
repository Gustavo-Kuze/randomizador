import React, { useState } from 'react'
import If from '../../../utils/If'
import keycodes from '../../../utils/keycodes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editItemText, removeItem, setItemEnabledState } from '../../../../redux/core/actions/listsActions'

const Item = (props) => {

    let [enabled, setEnabled] = useState(props.item.enabled)
    let [editMode, setEditMode] = useState(!props.item.text)

    const setEditModeAndPrepareInput = (fillText) => {
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

    const setEditModeIfNoText = () => {
        if (!props.item.text)
            setEditModeAndPrepareInput('')
    }

    const editItemTextOnEnter = (e) => {
        let code = e.keyCode || e.which
        if (code === keycodes.ENTER) {
            props.editItemText({ ...props.item, text: e.target.value }, props.listId)
            setEditMode(false)
        }
    }

    const setEnabledState = () => {
        let toggledEnabled = !enabled
        setEnabled(toggledEnabled)
        props.setItemEnabledState({ ...props.item, enabled: toggledEnabled }, props.listId)
    }

    const cancelOnBlur = () => {
        setEditMode(false)
    }

    return (
        <li draggable={true} className="list-group-item d-flex align-items-center" onClick={setEditModeIfNoText} onBlur={cancelOnBlur} onDoubleClick={() => setEditModeAndPrepareInput(props.item.text)}>
            <div className="container">
                <div className="row">
                    <div className="col-10">
                        <If c={editMode}>
                            <input autoFocus={true} id={`input-edit-item-${props.item.id}`} className="form-control" type="text" onKeyUp={editItemTextOnEnter} />
                        </If>
                        <p>
                            <If c={props.item.enabled}>{props.item.text}</If>
                            <If c={!props.item.enabled}><del>{props.item.text}</del></If>
                        </p>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-link text-decoration-none float-right pop-hover" onClick={setEnabledState}>
                            <i className={`fas fa-${!props.item.enabled ? "ban text-warning" : "check text-success"}`}></i>
                        </button>
                        <button className="btn btn-link text-decoration-none float-right pop-hover" onClick={() => props.removeItem(props.item, props.listId)}>
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