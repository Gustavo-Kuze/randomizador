import '../../../../../css/components/draw/subcomponents/Lists/List.css';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Card, CardBody, ListGroup, ListGroupItem } from 'reactstrap';
import { Droppable } from 'react-drag-and-drop';
import {
  addItem as addItemAction,
  removeItem as removeItemAction,
} from '../../../../redux/core/actions/listsActions';
import ListTitle from './ListTitle';
import Item from './Item';

const List = ({ list, items, removeItem, addItem }) => {
  const onDrop = data => {
    const listitem = JSON.parse(data.listitem);
    if (listitem.item.text) {
      removeItem(listitem.item, listitem.list);
      addItem(list, listitem.item.text);
    }
  };

  return (
    <Droppable types={['listitem']} onDrop={onDrop}>
      <Card className="mt-5">
        <ListTitle list={list} />
        <CardBody>
          <ListGroup>
            {items
              ? items.map((item, i) => (
                  <Item
                    key={`${item.text}--${list.id}--${i}`}
                    item={item}
                    list={list}
                    listId={list.id}
                  />
                ))
              : ''}
            <ListGroupItem className="d-flex justify-content-between align-items-center">
              <Button
                outline
                block
                color="success"
                onClick={() => addItem(list)}
              >
                <i className="fa fa-plus fa-lg" />
              </Button>
            </ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    </Droppable>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addItem: addItemAction,
      removeItem: removeItemAction,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(List);
