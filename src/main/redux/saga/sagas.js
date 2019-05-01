import types from '../../redux/core/actions/types/listsTypes'
import { takeLatest, put, call, all, select } from 'redux-saga/effects'
import {
    addList, deleteList, editListName,
    addItem, deleteItem, editItemText,
    setItemEnabledState, setAllItemsEnabledState
} from '../../services/firebase/lists'

function* addListSaga() {
    yield call(addList, { name: '', items: [] })
}

function* removeListSaga(action) {
    yield call(deleteList, action.payload)
}

function* editListNameSaga(action) {
    yield call(editListName, action.payload.list, action.payload.name)
}

function* setListsSaga(action) {
    yield put({ type: types.SET_LISTS, payload: action.payload })
}

function* addItemSaga(action) {
    yield call(addItem, action.payload)
}

function* removeItemSaga(action) {
    yield call(deleteItem, action.payload.item, action.payload.list)
}

function* editItemTextSaga(action) {
    yield call(editItemText, action.payload.item, action.payload.list)
}

function* setItemEnabledStateSaga(action) {
    yield call(setItemEnabledState, action.payload.item, action.payload.list)
}

function* setAllItemsEnabledStateSaga(action) {
    yield call(setAllItemsEnabledState, action.payload.enabled, action.payload.list)
}

export default function* root() {
    yield all([
        takeLatest(types.ADD_LIST_SAGA, addListSaga),
        takeLatest(types.SET_LISTS_SAGA, setListsSaga),
        takeLatest(types.REMOVE_LIST_SAGA, removeListSaga),
        takeLatest(types.EDIT_LIST_NAME_SAGA, editListNameSaga),
        takeLatest(types.ADD_ITEM_SAGA, addItemSaga),
        takeLatest(types.REMOVE_ITEM_SAGA, removeItemSaga),
        takeLatest(types.EDIT_ITEM_TEXT_SAGA, editItemTextSaga),
        takeLatest(types.SET_ITEM_ENABLED_STATE_SAGA, setItemEnabledStateSaga),
        takeLatest(types.SET_ALL_ITEMS_ENABLED_STATE_SAGA, setAllItemsEnabledStateSaga),
    ])
}