import React, { useState } from 'react'
import If from '../../../utils/If'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editListName, removeList, setAllItemsEnabledState } from "../../../../redux/core/actions/listsActions"
import keycodes from '../../../utils/keycodes'

const ListHeader = (props) => {

  let [editMode, setEditMode] = useState(false)
  let [allEnabled, setAllEnabled] = useState(true)

  const editNameOnEnter = (e) => {
    let code = e.keyCode || e.which
    if (code === keycodes.ENTER) {
      props.editListName({ ...props.list, name: e.target.value })
      setEditMode(false)
    }
  }

  const cancelOnBlur = () => {
    setEditMode(false)
  }

  return <>
    <div className="card-header" onDoubleClick={() => setEditMode(true)} >
      <div className="container">
        <div className="row">
          <div className="col-10">
            <If c={editMode}>
              <input autoFocus={true} id={`input-edit-list-${props.list.id}`} className="form-control" type="text" onBlur={cancelOnBlur} onKeyUp={editNameOnEnter} />
            </If>
            <p className="h4 mt-2">{props.list.name || 'Clique 2 vezes para nomear'}</p>
          </div>
          <div className="col-2">
            <button className="btn btn-link text-decoration-none pop-hover" onClick={() => props.removeList(props.list)}>
              <i className="fa fa-times fa-lg text-danger"></i>
            </button>
            <button className="btn btn-link text-decoration-none pop-hover" onClick={() => {
              props.setAllItemsEnabledState(!allEnabled, props.list.id)
              setAllEnabled(!allEnabled)
            }} >
              <i className={`fas fa-${!allEnabled ? "ban text-warning" : "check text-success"}`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
}

const mapDispatchToProps = dispatch => bindActionCreators({
  editListName, removeList, setAllItemsEnabledState
}, dispatch)

export default connect(null, mapDispatchToProps)(ListHeader)