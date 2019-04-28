import '../../../css/List.css'
import React from 'react'
import Item from './Item'
import ListTitle from './ListTitle'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addItem, editListName, removeList } from "../../../../redux/core/actions/listsActions";

const List = (props) => {
    return (
        <div className="card mt-5">
            <ListTitle list={props.list} />
            <div className="card-body">
                <ul className="list-group">
                    {props.items ? props.items.map((item, i) => (
                        <Item key={`${item.text}--${props.list.id}--${i}`}
                            item={item} listId={props.list.id} />
                    )) : ''}
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <button className="btn btn-outline-success btn-block" onClick={() => props.addItem(props.list.id)}>
                            <i className="fa fa-plus fa-lg"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({
    addItem, editListName, removeList
}, dispatch)

export default connect(null, mapDispatchToProps)(List)