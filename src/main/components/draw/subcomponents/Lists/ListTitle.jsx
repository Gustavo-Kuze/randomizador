import React, { useState } from 'react'
import If from '../../../utils/If'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editListName, removeList, setAllItemsEnabledState } from "../../../../redux/core/actions/listsActions"
import keycodes from '../../../utils/keycodes'
import { toastr } from 'react-redux-toastr'
import { Container, Col, Row, Button, CardHeader } from 'reactstrap'

const ListHeader = (props) => {

  let [editMode, setEditMode] = useState(false)
  let [allEnabled, setAllEnabled] = useState(true)

  const editNameOnEnter = (e) => {
    let code = e.keyCode || e.which
    if (code === keycodes.ENTER) {
      props.editListName({ ...props.list, name: e.target.value || '' }, e.target.value || '')
      setEditMode(false)
    } else if (code === keycodes.ESCAPE) {
      setEditMode(false)
    }
  }

  const saveOnBlur = (e) => {
    props.editListName({ ...props.list, name: e.target.value || '' }, e.target.value || '')
    setEditMode(false)
  }

  const confirmListDeletion = () => {
    if (props.list.items.length > 0) {
      const toastrConfirmOptions = {
        onOk: () => props.removeList(props.list.id),
        onCancel: () => { }
      }
      toastr.confirm('Tem certeza que deseja excluir essa lista?', toastrConfirmOptions)
    } else {
      props.removeList(props.list.id)
    }
  }

  return <>
    <CardHeader onDoubleClick={() => setEditMode(true)} >
      <Container>
        <Row>
          <Col xs={{ size: 10 }}>
            <If c={editMode}>
              <input autoFocus={true} id={`input-edit-list-${props.list.id}`} className="form-control" type="text" onBlur={saveOnBlur} onKeyUp={editNameOnEnter} />
            </If>
            <p className="h4 mt-2">{props.list.name || 'Clique 2 vezes para dar um nome'} <span className="text-secondary">{` (${props.list.items.length} ${props.list.items.length === 1 ? 'item' : 'itens'})`}</span></p>
          </Col>
          <Col xs={{ size: 2 }}>
            <Button color="link" className="text-decoration-none pop-hover" onClick={() => confirmListDeletion()}>
              <i className="fa fa-times fa-lg text-danger"></i>
            </Button>
            <Button color="link" className="text-decoration-none pop-hover" onClick={() => {
              props.setAllItemsEnabledState(!allEnabled, props.list)
              setAllEnabled(!allEnabled)
            }} >
              <i className={`fas fa-${!allEnabled ? "ban text-warning" : "check text-success"}`}></i>
            </Button>
          </Col>
        </Row>
      </Container>
    </CardHeader>
  </>
}

const mapDispatchToProps = dispatch => bindActionCreators({
  editListName, removeList, setAllItemsEnabledState
}, dispatch)

export default connect(null, mapDispatchToProps)(ListHeader)