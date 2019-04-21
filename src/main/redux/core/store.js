import { createStore, applyMiddleware, compose } from 'redux'
import combinedReducers from './combinedReducers'
import sagas from '../saga/sagas'
import createSaga from 'redux-saga'

const sagaMiddleware = createSaga()

export default createStore(combinedReducers, compose(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(sagas)
