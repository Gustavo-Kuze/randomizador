import React, { useState, useEffect } from 'react'

const ListItemsCounters = (props) => {

  let [enabledItems, setEnabledItems] = useState(0)
  let [totalItems, setTotalItems] = useState(0)

  const calculateItems = () => {
    let itensCount = 0
    let enabledCount = 0

    props.lists.forEach(list => {
      itensCount += list.items.length
      list.items.forEach(item => {
        if (item.enabled) {
          enabledCount += 1
        }
      })
    })

    setTotalItems(itensCount)
    setEnabledItems(enabledCount)
  }

  useEffect(() => { calculateItems() })

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-5">
          <p className="h4">Total de itens: {totalItems}</p>
        </div>
        <div className="col-12 col-sm-7">
          <p className="h4">Itens habilitados para o sorteio: {enabledItems}</p>
        </div>
      </div>
    </div>
  )
}

export default ListItemsCounters
