import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'reactstrap';

const ListItemsCounters = props => {
  let [enabledItems, setEnabledItems] = useState(0);
  let [totalItems, setTotalItems] = useState(0);

  const calculateItems = () => {
    let itensCount = 0;
    let enabledCount = 0;

    props.lists.forEach(list => {
      itensCount += list.items.length;
      list.items.forEach(item => {
        if (item.enabled) {
          enabledCount += 1;
        }
      });
    });

    setTotalItems(itensCount);
    setEnabledItems(enabledCount);
  };

  useEffect(() => {
    calculateItems();
  });

  return (
    <Container>
      <Row>
        <Col xs={{ size: 12 }} sm={{ size: 5 }}>
          <p className="h4">Total de itens: {totalItems}</p>
        </Col>
        <Col xs={{ size: 12 }} sm={{ size: 7 }}>
          <p className="h4">Itens habilitados para o sorteio: {enabledItems}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ListItemsCounters;
