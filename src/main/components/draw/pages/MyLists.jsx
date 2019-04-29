import React, { useState } from 'react'
import Template from '../../Template'
import List from '../subcomponents/Lists/'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addList } from '../../../redux/core/actions/listsActions'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const MyLists = (props) => {

    let [colsSize, setColsSize] = useState(6)
    let [isDropdownOpen, toggleDropDown] = useState(false)

    return (
        <Template>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Minhas listas</h1>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-lg-2">
                        <button className="btn btn-outline-primary" onClick={props.addList}>Nova lista</button>
                    </div>
                    <div className="col-1 d-none d-lg-block">
                        <Dropdown isOpen={isDropdownOpen} toggle={() => toggleDropDown(!isDropdownOpen)}>
                            <DropdownToggle caret>
                                Visualizar ({12 / colsSize})
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Número de colunas</DropdownItem>
                                <DropdownItem onClick={() => setColsSize(4)}>3</DropdownItem>
                                <DropdownItem onClick={() => setColsSize(6)}>2</DropdownItem>
                                <DropdownItem onClick={() => setColsSize(12)}>1</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="row">
                    {
                        props.lists.map((l, i) => (
                            <div key={`list-div-${l.id}--${i}`} className={`col-md-${colsSize}`}>
                                <List list={l} items={l.items} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </Template>
    )
}

const mapStateToProps = state => ({
    lists: state.lists
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addList
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyLists)