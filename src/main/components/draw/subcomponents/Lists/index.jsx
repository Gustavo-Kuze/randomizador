import '../../../css/List.css'
import React from 'react'
import Item from './Item'
import ListTitle from './ListTitle'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addItem, editListName, removeList } from "../../../../redux/core/actions/listsActions"
import { Button, Card, CardBody, ListGroup, ListGroupItem } from "reactstrap"

const List = (props) => {
    return (
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
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({
    addItem, editListName, removeList
}, dispatch)

export default connect(null, mapDispatchToProps)(List)