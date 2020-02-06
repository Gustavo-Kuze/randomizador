import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Collapse, Input, Card, Button } from 'reactstrap';
import { toastr } from 'react-redux-toastr';
import Chance from 'chance';
import If from '../../../../utils/If';
import DrawResults from '../../DrawResults';
import drawTypes from '../../../drawUtils/drawTypes';
import FacebookCommentsDrawResult from '../../CommonViewStructures/FacebookCommentsDrawResult';
import keycodes from '../../../../utils/keycodes';

const chance = new Chance();

const FbCommentsDraw = ({
  comments,
  onCommentsDrawn,
  enabled,
  isOpen,
  setIsOpen,
}) => {
  const [isQuantityInputValid, setQuantityInputValid] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [drawnComments, setDrawnComments] = useState([]);

  const drawComments = () => {
    if (isQuantityInputValid) {
      const drawn = chance.pickset(comments, quantity);
      setDrawnComments(drawn);
      onCommentsDrawn();
    } else {
      toastr.warning(
        'Atenção!',
        'Você precisa definir uma quantidade maior que zero e menor que o número de comentários do post!',
      );
    }
  };

  const setQuantityInputValidAndDrawOnEnter = e => {
    const code = e.keyCode || e.which;
    if (code === keycodes.ENTER) {
      drawComments();
    }
  };

  const setQuantityAndValidate = value => {
    setQuantity(value);
    setQuantityInputValid(value > 0 && value <= comments.length && value <= 10);
  };

  return (
    <>
      <Button
        color="primary"
        outline
        block
        className={`text-left mt-3 ${enabled ? '' : 'disabled'}`}
        disabled={!enabled}
        onClick={() => setIsOpen(!isOpen)}
      >
        3- Sorteie!
      </Button>
      <Collapse isOpen={isOpen}>
        <Card className="p-5 my-3">
          <If c={!comments}>
            <p className="lead">
              Ocorreu um erro ao listar os comentários deste post.
            </p>
          </If>
          <If c={comments}>
            <If c={comments.length > 0}>
              <If c={drawnComments.length === 0}>
                <p className="lead text-center">
                  Finalmente, você já pode sortear!{' '}
                  <span role="img" aria-label="Positivo">
                    👍
                  </span>
                </p>
                <p className="text-center">
                  Você pode sortear até 10 comentários
                </p>
                <Input
                  className="text-center bg-light mb-3"
                  type="number"
                  placeholder="Quantidade"
                  invalid={!isQuantityInputValid}
                  valid={isQuantityInputValid}
                  value={quantity}
                  onChange={e =>
                    setQuantityAndValidate(parseInt(e.target.value, 10))
                  }
                  onKeyUp={setQuantityInputValidAndDrawOnEnter}
                  max="10"
                />
                <Button
                  color="success"
                  block
                  onClick={drawComments}
                  className={`${
                    isQuantityInputValid ? 'btn-pulse-success' : ''
                  }`}
                >
                  Sortear!
                </Button>
              </If>
              <If c={drawnComments.length > 0}>
                <DrawResults
                  title="Os comentários sorteados foram:"
                  colClasses="col-lg-10 col-12 offset-lg-1"
                  date={`${new Date().toLocaleString()}`}
                  drawType={drawTypes.FACEBOOK_COMMENTS}
                  result={drawnComments}
                >
                  <FacebookCommentsDrawResult items={drawnComments} />
                </DrawResults>
              </If>
            </If>
            <If c={comments.length === 0}>
              <p className="lead">Este post não tem comentários</p>
            </If>
          </If>
        </Card>
      </Collapse>
    </>
  );
};

const mapStateToProps = state => ({
  userPages: state.facebookComments.userPages,
  selectedPage: state.facebookComments.selectedPage,
  comments: state.facebookComments.comments,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FbCommentsDraw);
