/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr';
import { Container, Col, Row, Button, CardHeader } from 'reactstrap';
import {
  editListName as editListNameAction,
  removeList as removeListAction,
  setAllItemsEnabledState as setAllItemsEnabledStateAction,
} from '../../../../redux/core/actions/listsActions';
import keycodes from '../../../utils/keycodes';
import If from '../../../utils/If';

const ListHeader = ({
  list,
  editListName,
  removeList,
  setAllItemsEnabledState,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [allEnabled, setAllEnabled] = useState(true);

  const editNameOnEnter = e => {
    const code = e.keyCode || e.which;
    if (code === keycodes.ENTER) {
      editListName(
        { ...list, name: e.target.value || '' },
        e.target.value || '',
      );
      setEditMode(false);
    } else if (code === keycodes.ESCAPE) {
      setEditMode(false);
    }
  };

  const saveOnBlur = e => {
    editListName({ ...list, name: e.target.value || '' }, e.target.value || '');
    setEditMode(false);
  };

  const confirmListDeletion = () => {
    if (list.items.length > 0) {
      const toastrConfirmOptions = {
        onOk: () => removeList(list.id),
        onCancel: () => {},
      };
      toastr.confirm(
        'Tem certeza que deseja excluir essa lista?',
        toastrConfirmOptions,
      );
    } else {
      removeList(list.id);
    }
  };

  return (
    <>
      <CardHeader onDoubleClick={() => setEditMode(true)}>
        <Container>
          <Row>
            <Col xs={{ size: 10 }}>
              <If c={editMode}>
                <input
                  autoFocus
                  id={`input-edit-list-${list.id}`}
                  className="form-control"
                  type="text"
                  onBlur={saveOnBlur}
                  onKeyUp={editNameOnEnter}
                />
              </If>
              <p className="h4 mt-2">
                {list.name || 'Clique 2 vezes para dar um nome'}{' '}
                <span className="text-secondary">{` (${list.items.length} ${
                  list.items.length === 1 ? 'item' : 'itens'
                })`}</span>
              </p>
            </Col>
            <Col xs={{ size: 2 }}>
              <Button
                color="link"
                className="text-decoration-none pop-hover"
                onClick={() => confirmListDeletion()}
              >
                <i className="fa fa-times fa-lg text-danger" />
              </Button>
              <Button
                color="link"
                className="text-decoration-none pop-hover"
                onClick={() => {
                  setAllItemsEnabledState(!allEnabled, list);
                  setAllEnabled(!allEnabled);
                }}
              >
                <i
                  className={`fas fa-${
                    !allEnabled ? 'ban text-warning' : 'check text-success'
                  }`}
                />
              </Button>
            </Col>
          </Row>
        </Container>
      </CardHeader>
    </>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editListName: editListNameAction,
      removeList: removeListAction,
      setAllItemsEnabledState: setAllItemsEnabledStateAction,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(ListHeader);
