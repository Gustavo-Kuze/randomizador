import React, { useState } from 'react'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import { Collapse } from 'reactstrap'
import If from '../../../../utils/If'
import DrawResults from '../../DrawResults'
import drawTypes from '../../../drawUtils/drawTypes'
import { Input } from 'reactstrap'
import FacebookCommentsDrawResult from '../../CommonViewStructures/FacebookCommentsDrawResult'
import keycodes from '../../../../utils/keycodes'
import { toastr } from 'react-redux-toastr'
import { Card, Button } from 'reactstrap'

import Chance from 'chance'
let chance = new Chance()

const FbCommentsDraw = (props) => {

    let [isQuantityInputValid, setQuantityInputValid] = useState(true)
    let [quantity, setQuantity] = useState(1)
    let [drawnComments, setDrawnComments] = useState([])

    const drawComments = () => {
        if (isQuantityInputValid) {
            let drawn = chance.pickset(props.comments, quantity)
            setDrawnComments(drawn)
            props.onCommentsDrawn()
        } else {
            toastr.warning('Atenção!', 'Você precisa definir uma quantidade maior que zero e menor que o número de comentários do post!')
        }
    }

    const setQuantityInputValidAndDrawOnEnter = (e) => {
        let code = e.keyCode || e.which
        if (code === keycodes.ENTER) {
            drawComments()
        }
    }

    const setQuantityAndValidate = (value) => {
        setQuantity(value)
        setQuantityInputValid(value > 0 && value <= props.comments.length && value <= 10)
    }

    return (
        <>
            <Button color="primary" outline block className={`text-left mt-3 ${props.enabled ? '' : 'disabled'}`}
                disabled={!props.enabled}
                onClick={() => props.setIsOpen(!props.isOpen)}>3- Sorteie!</Button>
            <Collapse isOpen={props.isOpen}>
                <Card className="p-5 my-3">
                    <If c={!props.comments}>
                        <p className="lead">Ocorreu um erro ao listar os comentários deste post.</p>
                    </If>
                    <If c={props.comments}>
                        <If c={props.comments.length > 0}>
                            <If c={drawnComments.length === 0}>
                                <p className="lead text-center">Finalmente, você já pode sortear! <span role="img" aria-label="Positivo">👍</span></p>
                                <p className="text-center">Você pode sortear até 10 comentários</p>
                                <Input className="text-center bg-light mb-3"
                                    type="number"
                                    placeholder="Quantidade"
                                    invalid={!isQuantityInputValid}
                                    valid={isQuantityInputValid}
                                    value={quantity}
                                    onChange={e => setQuantityAndValidate(parseInt(e.target.value))}
                                    onKeyUp={setQuantityInputValidAndDrawOnEnter}
                                    max="10"
                                />
                                <Button
                                    color="success" block
                                    onClick={drawComments}
                                    className={`${isQuantityInputValid ? 'btn-pulse-success' : ''}`}>
                                    Sortear!
                                </Button>
                            </If>
                            <If c={drawnComments.length > 0}>
                                <DrawResults title="Os comentários sorteados foram:" colClasses="col-lg-10 col-12 offset-lg-1"
                                    date={`${new Date().toLocaleString()}`}
                                    drawType={drawTypes.FACEBOOK_COMMENTS}
                                    result={drawnComments}>

                                    <FacebookCommentsDrawResult items={drawnComments} />
                                </DrawResults>
                            </If>
                        </If>
                        <If c={props.comments.length === 0}>
                            <p className="lead">Este post não tem comentários</p>
                        </If>
                    </If>
                </Card>
            </Collapse>
        </>
    )
}

const mapStateToProps = state => ({
    userPages: state.facebookComments.userPages,
    selectedPage: state.facebookComments.selectedPage,
    comments: state.facebookComments.comments
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FbCommentsDraw)