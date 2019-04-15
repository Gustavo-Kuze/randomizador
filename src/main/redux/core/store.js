import { createStore, applyMiddleware, compose } from 'redux'
import combinedReducers from './combinedReducers'
import sagas from '../saga/sagas'
import createSaga from 'redux-saga'

const sagaMiddleware = createSaga()

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default createStore(combinedReducers, compose(applyMiddleware(sagaMiddleware), devTools))

sagaMiddleware.run(sagas)