import { createStore, applyMiddleware, compose } from 'redux'
import combinedReducers from './core/combinedReducers'
import sagas from './sagas'
import createSaga from 'redux-saga'
import { loadState } from './storage/localStorage'

const sagaMiddleware = createSaga()

// const dev = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default createStore(combinedReducers, loadState(), compose(applyMiddleware(sagaMiddleware)
// , dev
))

sagaMiddleware.run(sagas)
