import React, { useState } from 'react'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import { Collapse } from 'reactstrap'
import If from '../../../../utils/If'
import DrawResults from '../../DrawResults'
import drawTypes from '../../../drawUtils/drawTypes'
import { Input } from 'reactstrap'
import InstagramCommentsDrawResult from '../../CommonViewStructures/InstagramCommentsDrawResult'
import keycodes from '../../../../utils/keycodes'
import { toastr } from 'react-redux-toastr'

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
            <button className={`btn btn-outline-info btn-block text-left mt-3 ${props.enabled ? '' : 'disabled'}`}
                disabled={!props.enabled}
                onClick={() => props.setIsOpen(!props.isOpen)}>4- Sorteie!</button>
            <Collapse isOpen={props.isOpen}>
                <div className="card p-5 my-3">

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
                                <button onClick={drawComments} className={`btn btn-success btn-block ${isQuantityInputValid ? 'btn-pulse-success' : ''}`}>Sortear!</button>
                            </If>
                            <If c={drawnComments.length > 0}>
                                <DrawResults title="Os comentários sorteados foram:" colClasses="col-lg-10 col-12 offset-lg-1"
                                    date={`${new Date().toLocaleString()}`}
                                    drawType={drawTypes.INSTAGRAM_COMMENTS}
                                    result={drawnComments}>

                                    <InstagramCommentsDrawResult items={drawnComments} link={props.selectedPost ? props.selectedPost.permalink : ''} />
                                </DrawResults>
                            </If>
                        </If>
                        <If c={props.comments.length === 0}>
                            <p className="lead">Este post não tem comentários</p>
                        </If>
                    </If>

                </div>
            </Collapse>
        </>
    )
}

const mapStateToProps = state => ({
    medias: state.instagramComments.medias,
    selectedMedia: state.instagramComments.selectedMedia,
    comments: state.instagramComments.comments
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FbCommentsDraw)