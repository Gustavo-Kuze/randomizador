import '../../../../../css/components/draw/subcomponents/Lists/List.css'
import React from 'react'
import Item from './Item'
import ListTitle from './ListTitle'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addItem, editListName, removeList, removeItem } from "../../../../redux/core/actions/listsActions"
import { Button, Card, CardBody, ListGroup, ListGroupItem } from "reactstrap"
import { Droppable } from "react-drag-and-drop"

const List = (props) => {

    const onDrop = (data) => {
        let listitem = JSON.parse(data.listitem)
        if (listitem.item.text) {
            props.removeItem(listitem.item, listitem.list)
            props.addItem(props.list, listitem.item.text)
        }
    }

    return (
        <Droppable
            types={['listitem']}
            onDrop={onDrop.bind(this)}>

            <Card className="mt-5">
                <ListTitle list={props.list} />
                <CardBody >
                    <ListGroup >
                        {props.items ? props.items.map((item, i) => (
                            <Item key={`${item.text}--${props.list.id}--${i}`}
                                item={item} list={props.list} listId={props.list.id} />
                        )) : ''}
                        <ListGroupItem className="d-flex justify-content-between align-items-center">
                            <Button outline block color="success" onClick={() => props.addItem(props.list)}>
                                <i className="fa fa-plus fa-lg"></i>
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </CardBody>
            </Card>
        </Droppable>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({
    addItem, editListName, removeList, removeItem
}, dispatch)

export default connect(null, mapDispatchToProps)(List)