import '../../../../css/components/draw/pages/MyLists.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
} from 'reactstrap';
import Chance from 'chance';
import { toastr } from 'react-redux-toastr';
import {
  realtimeUpdateLists,
  stopListsRealtimeListener,
  createItemFromText,
} from '../../../services/firebase/lists';
import Template from '../../Template';
import List from '../subcomponents/Lists';
import {
  addList as addListAction,
  setLists as setListsAction,
} from '../../../redux/core/actions/listsActions';

import If from '../../utils/If';
import MyListsControlsSub from '../subcomponents/Lists/MyListsControlsSub';
import ListItemsCounters from '../subcomponents/Lists/ListItemsCounters';
import FilePicker from '../../utils/FilePicker';
import DrawResults from '../subcomponents/DrawResults';
import drawTypes from '../drawUtils/drawTypes';
import keyCodes from '../../utils/keycodes';
import ListsDrawResult from '../subcomponents/CommonViewStructures/ListsDrawResult';

const chance = new Chance();

const MyLists = ({ setLists, addList, uid, lists }) => {
  const [colsSize, setColsSize] = useState(6);
  const [isDropdownOpen, toggleDropDown] = useState(false);

  const [quantity, setQuantity] = useState();
  const [isQuantityInputTouched, setIsQuantityInputTouched] = useState(false);
  const [isQuantityInputValid, setIsQuantityInputValid] = useState(false);

  const [drawnItems, setDrawnItems] = useState([]);

  const startListsObserver = () => {
    realtimeUpdateLists(uid, newLists => {
      setLists(newLists);
    });
  };

  useEffect(() => {
    startListsObserver();
    return () => stopListsRealtimeListener(uid);
  }, []);

  useEffect(() => setIsQuantityInputValid(quantity > 0));

  const draw = () => {
    if (quantity > 0) {
      if (lists.length > 0) {
        let allItems = [];
        lists.forEach(l => {
          try {
            if (l.items) {
              let listItem = [];
              listItem = l.items.flatMap((item, index) => [
                item,
                listItem[index],
              ]);
              allItems = [
                ...allItems,
                ...listItem
                  .filter(item => {
                    if (item) if (item.enabled) return item;
                    return false;
                  })
                  .map(item => item.text)
                  .filter(text => text),
              ];
            }
          } catch (error) {
            console.error(error);
          }
        });
        if (allItems.length > 0) {
          setDrawnItems(chance.pickset(chance.shuffle(allItems), quantity));
          setIsQuantityInputTouched(false);
        } else {
          toastr.warning(
            'Atenção',
            'Você não tem nenhum item habilitado para sortear',
          );
        }
      } else {
        toastr.warning(
          'Atenção',
          'Você não tem nenhuma lista de itens para sortear',
        );
      }
    } else {
      setDrawnItems([]);
      toastr.warning(
        'Atenção',
        'Você precisa informar quantos itens deseja sortear',
      );
    }
  };

  const loadListFromFile = content => {
    const lines = content.split('\n').filter(p => p !== '');
    if (lines.length > 0) {
      addList({ name: '', items: lines.map(i => createItemFromText(i)) });
    }
  };

  const addEmptyListIfNotExists = () => {
    let canCreateList = true;

    lists.forEach(l => {
      if (l.items.length <= 0) canCreateList = false;
    });

    if (canCreateList) {
      addList();
    } else {
      toastr.warning('Atenção', 'Você já possui uma lista vazia');
    }
  };

  const setInputTouchedAndDrawOnEnter = e => {
    const code = e.keyCode || e.which;
    if (code === keyCodes.ENTER) {
      draw();
    }
    setIsQuantityInputTouched(true);
  };

  return (
    <Template>
      <Container>
        <Row className="mt-3">
          <Col>
            <h1 className="sofia">
              <strong>Minhas listas</strong>
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="my-5">
              <CardBody>
                <Row className="mt-4">
                  <Col xs={{ size: 12 }}>
                    <Row>
                      <Col sm={{ size: 6 }}>
                        <Input
                          className="text-center bg-light mb-2"
                          type="number"
                          placeholder="Sortear quantos items?"
                          invalid={
                            isQuantityInputTouched && !isQuantityInputValid
                          }
                          valid={isQuantityInputTouched && isQuantityInputValid}
                          onChange={e =>
                            setQuantity(parseInt(e.target.value, 10))
                          }
                          onKeyUp={setInputTouchedAndDrawOnEnter}
                        />
                      </Col>
                      <Col sm={{ size: 6 }}>
                        <Button
                          color="warning"
                          block
                          className={`${
                            isQuantityInputTouched && isQuantityInputValid
                              ? 'btn-pulse-warning'
                              : ''
                          }`}
                          onClick={() => draw()}
                        >
                          Sortear
                        </Button>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <If c={drawnItems.length > 0} cssHide hideClassName>
                          <div className="scrollable-y">
                            <DrawResults
                              title="Os itens sorteados foram:"
                              date={`${new Date().toLocaleString()}`}
                              drawType={drawTypes.LISTS}
                              result={drawnItems}
                            >
                              <ListsDrawResult items={drawnItems} />
                            </DrawResults>
                          </div>
                        </If>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={{ size: 12 }} md={{ size: 6 }}>
            <MyListsControlsSub />
          </Col>
        </Row>
        <Row className="my-5">
          <Col xs={{ size: 12 }} md={{ size: 10 }}>
            <ListItemsCounters lists={lists} />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={{ size: 12 }} lg={{ size: 2 }}>
            <Button
              color="primary"
              block
              outline
              size="lg"
              onClick={() => addEmptyListIfNotExists()}
            >
              Nova lista
            </Button>
          </Col>
          <Col xs={{ size: 12 }} lg={{ size: 4 }} className="mt-3 mt-lg-0">
            <FilePicker
              onPicked={loadListFromFile}
              text="Carregar arquivo"
              tooltip="Criar uma lista a partir de um arquivo. Os itens precisam estar separados por quebras de linha (enter)"
              labelClassName="btn btn-outline-primary btn-lg btn-block pointer"
            />
          </Col>
          <Col xs={{ size: 1 }} className="d-none d-lg-block">
            <Dropdown
              isOpen={isDropdownOpen}
              toggle={() => toggleDropDown(!isDropdownOpen)}
            >
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
          </Col>
        </Row>
        <Row>
          {lists.map((l, i) => (
            <div
              key={`list-div-${l.id}--${i}`}
              className={`col-md-${colsSize}`}
            >
              <List list={l} items={l.items} />
            </div>
          ))}
        </Row>
      </Container>
    </Template>
  );
};

const mapStateToProps = state => ({
  lists: state.lists,
  uid: state.user.uid,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addList: addListAction,
      setLists: setListsAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MyLists);
