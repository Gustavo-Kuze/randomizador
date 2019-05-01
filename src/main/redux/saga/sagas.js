import types from '../../redux/core/actions/types/listsTypes'
import { takeLatest, put, call, all, select } from 'redux-saga/effects'
import { addList, deleteList, editListName, addItem } from '../../services/firebase/lists'

function* addListSaga() {
    let listDocRef = yield call(addList, { name: '', item: [] })
    // yield put({ type: types.ADD_LIST, payload: { name: '', id: listDocRef.id } })
}

function* removeListSaga(action) {
    let listDocRef = yield call(deleteList, action.payload)
    // yield put({ type: types.ADD_LIST, payload: { name: '', id: listDocRef.id } })
}

function* editListNameSaga(action) {
    let listDocRef = yield call(editListName, action.payload.list, action.payload.name)
    // yield put({ type: types.ADD_LIST, payload: { name: '', id: listDocRef.id } })
}

function* setListsSaga(action){
    yield put({type: types.SET_LISTS, payload: action.payload})
}

function* addItemSaga(action){
    let listDocRef = yield call(addItem, action.payload)
}

export default function* root() {
    yield all([
        takeLatest(types.ADD_LIST_SAGA, addListSaga),
        takeLatest(types.SET_LISTS_SAGA, setListsSaga),
        takeLatest(types.REMOVE_LIST_SAGA, removeListSaga),
        takeLatest(types.EDIT_LIST_NAME_SAGA, editListNameSaga),
        takeLatest(types.ADD_ITEM_SAGA, addItemSaga),
    ])
}