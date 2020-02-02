/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr';
import { Container, Col, Row, Button, ListGroupItem } from 'reactstrap';
import { Draggable } from 'react-drag-and-drop';
import {
  editItemText as editItemTextAction,
  removeItem as removeItemAction,
  setItemEnabledState as setItemEnabledStateAction,
} from '../../../../redux/core/actions/listsActions';
import keycodes from '../../../utils/keycodes';
import If from '../../../utils/If';

const Item = ({
  item,
  list,
  removeItem,
  editItemText,
  setItemEnabledState,
}) => {
  const [editMode, setEditMode] = useState(!item.text);

  const setEditModeAndPrepareInput = fillText => {
    setEditMode(true);
    setTimeout(() => {
      const inputEditItem = document.getElementById(
        `input-edit-item-${item.id}`,
      );
      if (inputEditItem) {
        if (fillText) inputEditItem.value = fillText;
        inputEditItem.focus();
      }
    }, 20);
  };

  const setEditModeIfNoText = () => {
    if (!item.text) setEditModeAndPrepareInput('');
  };

  const saveOnEnterCancelOnEsc = e => {
    const code = e.keyCode || e.which;
    if (code === keycodes.ENTER) {
      editItemText({ ...item, text: e.target.value }, list);
      setEditMode(false);
    } else if (code === keycodes.ESCAPE) {
      setEditMode(false);
    }
  };

  const setEnabledState = () => {
    const toggledEnabled = !item.enabled;
    setItemEnabledState({ ...item, enabled: toggledEnabled }, list);
  };

  const saveOnBlur = e => {
    editItemText({ ...item, text: e.target.value }, list);
    setEditMode(false);
  };

  const confirmItemDeletion = () => {
    if (item.text) {
      const toastrConfirmOptions = {
        onOk: () => removeItem(item, list),
        onCancel: () => {},
      };
      toastr.confirm(
        'Tem certeza que deseja excluir esse item?',
        toastrConfirmOptions,
      );
    } else {
      removeItem(item, list);
    }
  };

  return (
    <Draggable type="listitem" data={JSON.stringify({ item, list })}>
      <ListGroupItem
        className="d-flex align-items-center"
        onClick={setEditModeIfNoText}
        onDoubleClick={() => setEditModeAndPrepareInput(item.text)}
      >
        <Container>
          <Row>
            <Col xs={{ size: 8 }}>
              <If c={editMode}>
                <input
                  autoFocus
                  id={`input-edit-item-${item.id}`}
                  onBlur={saveOnBlur}
                  className="form-control"
                  type="text"
                  onKeyUp={saveOnEnterCancelOnEsc}
                />
              </If>
              <p className="lead">
                <If c={item.enabled}>{item.text}</If>
                <If c={!item.enabled}>
                  <del>{item.text}</del>
                </If>
              </p>
            </Col>
            <Col xs={{ size: 4 }}>
              <Button
                color="link"
                className="text-decoration-none float-right pop-hover"
                onClick={setEnabledState}
              >
                <i
                  className={`fas fa-${
                    !item.enabled ? 'ban text-warning' : 'check text-success'
                  }`}
                />
              </Button>
              <Button
                color="link"
                className="text-decoration-none float-right pop-hover"
                onClick={() => confirmItemDeletion()}
              >
                <i className="fa fa-trash text-danger" />
              </Button>
            </Col>
          </Row>
        </Container>
      </ListGroupItem>
    </Draggable>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editItemText: editItemTextAction,
      removeItem: removeItemAction,
      setItemEnabledState: setItemEnabledStateAction,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(Item);
