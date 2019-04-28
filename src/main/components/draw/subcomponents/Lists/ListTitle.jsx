import React, { useState } from 'react'
import If from '../../../utils/If'

const ListHeader = (props) => {

  let [editMode, setEditMode] = useState(false)

  let time = null
  const editWhenFinishedTyping = (e) => {
    let name = e.target.value
    clearTimeout(time)
    time = setTimeout(() => {
      props.onListEdited({ ...props.list, name })
      setEditMode(false)
    }, 500);
  }

  return <>
    <If c={editMode}>
      <input autoFocus={true} id={`input-edit-list-${props.list.id}`} className="form-control" type="text" onKeyUp={editWhenFinishedTyping} />
    </If>
    <p onDoubleClick={() => setEditMode(true)} className="h4 mt-2">{props.list.name}</p>
  </>
}

export default ListHeader
