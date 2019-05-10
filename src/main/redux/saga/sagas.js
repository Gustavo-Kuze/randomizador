import types from '../../redux/core/actions/types/listsTypes'
import { takeLatest, put, call, all } from 'redux-saga/effects'
import {
    addItemSaga, addListSaga, editItemTextSaga,
    editListNameSaga, removeItemSaga, removeListSaga,
    setAllItemsEnabledStateSaga, setItemEnabledStateSaga, setListsSaga
} from "./listsSagas";

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