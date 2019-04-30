import '../../css/MyLists.css'
import React, { useState, useEffect } from 'react'
import Template from '../../Template'
import List from '../subcomponents/Lists/'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addList } from '../../../redux/core/actions/listsActions'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Input } from 'reactstrap'
import If from '../../utils/If'
import MyListsControlsSub from '../subcomponents/Lists/MyListsControlsSub';

const MyLists = (props) => {

    let [colsSize, setColsSize] = useState(6)
    let [isDropdownOpen, toggleDropDown] = useState(false)

    let [quantity, setQuantity] = useState()
    let [isQuantityInputTouched, setIsQuantityInputTouched] = useState(false)
    let [isQuantityInputValid, setIsQuantityInputValid] = useState(false)

    let [drawnItems, setDrawnItems] = useState([])

    useEffect(() => { setIsQuantityInputValid(quantity > 0) })

    return (
        <Template>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Minhas listas</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="jumbotron jumbotron-padding-25">
                            <div className="row mt-4">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <Input className="text-center bg-light mb-2" type="number"
                                                placeholder="Sortear quantos items?"
                                                invalid={isQuantityInputTouched && !isQuantityInputValid}
                                                valid={isQuantityInputTouched && isQuantityInputValid}
                                                onChange={e => setQuantity(parseInt(e.target.value))}
                                                onKeyUp={setIsQuantityInputTouched}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <button className="btn btn-warning btn-block">Sortear</button>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <If c={drawnItems.length > 0} cssHide hideClassName>
                                                <div className="scrollable-y">
                                                    <table className="table table-striped table-borderless">
                                                        <thead>
                                                            <tr>
                                                                <th>Posição</th>
                                                                <th>Item sorteado</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>1</td>
                                                                <td><span>Excluir um item</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td>1</td>
                                                                <td><span>Adicionar um novo item</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td>1</td>
                                                                <td><span>Este item não será sorteado</span></td>
                                                            </tr>
                                                            <tr>
                                                                <td>1</td>
                                                                <td><span>Este item será sorteado</span></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </If>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-12">
                        <MyListsControlsSub />
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