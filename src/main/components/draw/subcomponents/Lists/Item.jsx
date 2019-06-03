import React, { useState } from 'react'
import If from '../../../utils/If'
import keycodes from '../../../utils/keycodes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editItemText, removeItem, setItemEnabledState } from '../../../../redux/core/actions/lists'
import { toastr } from 'react-redux-toastr'
import { Container, Col, Row, Button, ListGroupItem } from 'reactstrap'
import { Draggable } from 'react-drag-and-drop'

const Item = (props) => {

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

    const saveOnEnterCancelOnEsc = (e) => {
        let code = e.keyCode || e.which
        if (code === keycodes.ENTER) {
            props.editItemText({ ...props.item, text: e.target.value }, props.list)
            setEditMode(false)
        } else if (code === keycodes.ESCAPE) {
            setEditMode(false)
        }
    }

    const setEnabledState = () => {
        let toggledEnabled = !props.item.enabled
        props.setItemEnabledState({ ...props.item, enabled: toggledEnabled }, props.list)
    }

    const saveOnBlur = (e) => {
        props.editItemText({ ...props.item, text: e.target.value }, props.list)
        setEditMode(false)
    }

    const confirmItemDeletion = () => {
        if (props.item.text) {
            const toastrConfirmOptions = {
                onOk: () => props.removeItem(props.item, props.list),
                onCancel: () => { }
            }
            toastr.confirm('Tem certeza que deseja excluir esse item?', toastrConfirmOptions)
        } else {
            props.removeItem(props.item, props.list)
        }
    }

    return (
        <Draggable type="listitem" data={JSON.stringify({ item: props.item, list: props.list })}>
            <ListGroupItem className="d-flex align-items-center" onClick={setEditModeIfNoText} onDoubleClick={() => setEditModeAndPrepareInput(props.item.text)}>
                <Container>
                    <Row>
                        <Col xs={{ size: 8 }}>
                            <If c={editMode}>
                                <input autoFocus={true} id={`input-edit-item-${props.item.id}`} onBlur={saveOnBlur} className="form-control" type="text" onKeyUp={saveOnEnterCancelOnEsc} />
                            </If>
                            <p className="lead">
                                <If c={props.item.enabled}>{props.item.text}</If>
                                <If c={!props.item.enabled}><del>{props.item.text}</del></If>
                            </p>
                        </Col>
                        <Col xs={{ size: 4 }}>

                            <Button color="link" className="text-decoration-none float-right pop-hover" onClick={setEnabledState}>
                                <i className={`fas fa-${!props.item.enabled ? "ban text-warning" : "check text-success"}`}></i>
                            </Button>
                            <Button color="link" className="text-decoration-none float-right pop-hover" onClick={() => confirmItemDeletion()}>
                                <i className="fa fa-trash text-danger"></i>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </ListGroupItem>
        </Draggable>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({
    editItemText, removeItem, setItemEnabledState
}, dispatch)

export default connect(null, mapDispatchToProps)(Item)