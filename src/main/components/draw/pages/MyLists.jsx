import '../../css/MyLists.css'
import React, { useState, useEffect } from 'react'
import { realtimeUpdateLists, stopListsRealtimeListener, createItemFromText } from '../../../services/firebase/lists'
import Template from '../../Template'
import List from '../subcomponents/Lists/'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addList, setLists } from '../../../redux/core/actions/listsActions'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Input } from 'reactstrap'
import If from '../../utils/If'
import MyListsControlsSub from '../subcomponents/Lists/MyListsControlsSub';
import ListItemsCounters from '../subcomponents/Lists/ListItemsCounters';
import Chance from 'chance'
import { toastr } from 'react-redux-toastr'
import FilePicker from '../../utils/FilePicker'
import DrawResults from '../subcomponents/DrawResults'
import drawTypes from '../drawUtils/drawTypes'
import keyCodes from '../../utils/keycodes'
import ListsDrawResult from '../subcomponents/CommonViewStructures/ListsDrawResult'

let chance = new Chance()

const MyLists = (props) => {

    let [colsSize, setColsSize] = useState(6)
    let [isDropdownOpen, toggleDropDown] = useState(false)

    let [quantity, setQuantity] = useState()
    let [isQuantityInputTouched, setIsQuantityInputTouched] = useState(false)
    let [isQuantityInputValid, setIsQuantityInputValid] = useState(false)

    let [drawnItems, setDrawnItems] = useState([])

    useEffect(() => {
        startListsObserver()
        return () => stopListsRealtimeListener(props.uid)
    }, [])

    useEffect(() => setIsQuantityInputValid(quantity > 0))

    const startListsObserver = () => {
        realtimeUpdateLists(props.uid, (lists) => {
            props.setLists(lists)
        })
    }

    const draw = () => {
        if (quantity > 0) {
            if (props.lists.length > 0) {
                let allItems = []
                props.lists.forEach((l) => {
                    try {
                        if (l.items) {
                            let listItem = []
                            listItem = l.items.flatMap((item, index) => [item, listItem[index]])
                            allItems = [...allItems, ...(listItem.filter(item => {
                                if (item)
                                    if (item.enabled)
                                        return item
                                return false
                            }
                            ).map(item => item.text).filter(text => text))]
                        }
                    } catch (error) { }
                })
                if (allItems.length > 0) {
                    setDrawnItems(chance.pickset(chance.shuffle(allItems), quantity))
                } else {
                    toastr.warning('Atenção', 'Você não tem nenhum item habilitado para sortear')
                }
            } else {
                toastr.warning('Atenção', 'Você não tem nenhuma lista de itens para sortear')
            }
        } else {
            setDrawnItems([])
            toastr.warning('Atenção', 'Você precisa informar quantos itens deseja sortear')
        }
    }

    const loadListFromFile = (content) => {
        let lines = content.split('\n').filter(p => p !== '')
        if (lines.length > 0) {
            props.addList({ name: '', items: lines.map(i => createItemFromText(i)) })
        }
    }

    const addEmptyListIfNotExists = () => {
        let canCreateList = true

        props.lists.forEach(l => {
            if (l.items.length <= 0)
                canCreateList = false
        })

        if (canCreateList) {
            props.addList()
        } else {
            toastr.warning('Atenção', 'Você já possui uma lista vazia')
        }
    }

    const setInputTouchedAndDrawOnEnter = (e) => {
        let code = e.keyCode || e.which
        if (code === keyCodes.ENTER) {
            draw()
        }
        setIsQuantityInputTouched(true)
    }

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
                        <div className="card my-5">
                            <div className="card-body">
                                <div className="row mt-4">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <Input className="text-center bg-light mb-2" type="number"
                                                    placeholder="Sortear quantos items?"
                                                    invalid={isQuantityInputTouched && !isQuantityInputValid}
                                                    valid={isQuantityInputTouched && isQuantityInputValid}
                                                    onChange={e => setQuantity(parseInt(e.target.value))}
                                                    onKeyUp={setInputTouchedAndDrawOnEnter}
                                                />
                                            </div>
                                            <div className="col-sm-6">
                                                <button className="btn btn-warning btn-block" onClick={() => draw()}>Sortear</button>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col">
                                                <If c={drawnItems.length > 0} cssHide hideClassName>
                                                    <div className="scrollable-y">
                                                        <DrawResults
                                                            title="Os itens sorteados foram:"
                                                            date={`${new Date().toLocaleString()}`}
                                                            drawType={drawTypes.LISTS}
                                                            result={drawnItems}>

                                                            <ListsDrawResult items={drawnItems} />
                                                        </DrawResults>
                                                    </div>
                                                </If>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 col-12">
                        <MyListsControlsSub />
                    </div>
                    <div className="col-md-10 col-12">
                        <ListItemsCounters lists={props.lists} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-lg-2">
                        <button className="btn btn-outline-primary btn-block btn-lg" onClick={() => addEmptyListIfNotExists()}>Nova lista</button>
                    </div>
                    <div className="col-12 col-lg-4 mt-3 mt-lg-0">
                        <FilePicker onPicked={loadListFromFile} text="Carregar arquivo"
                            tooltip="Criar uma lista a partir de um arquivo. Os itens precisam estar separados por quebras de linha (enter)"
                            labelClassName="btn-block" />
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
    lists: state.lists,
    uid: state.user.uid
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addList, setLists
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyLists)