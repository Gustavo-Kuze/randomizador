import listsTypes from '../core/actions/types/listsTypes'
import faceTypes from '../core/actions/types/facebookLoginTypes'
import { takeLatest, all } from 'redux-saga/effects'

import { setPageAccessTokenSaga } from "./facebookLoginSagas";
import {
    addItemSaga, addListSaga, editItemTextSaga,
    editListNameSaga, removeItemSaga, removeListSaga,
    setAllItemsEnabledStateSaga, setItemEnabledStateSaga, setListsSaga
} from "./listsSagas";

export default function* root() {
    yield all([
        takeLatest(listsTypes.ADD_LIST_SAGA, addListSaga),
        takeLatest(listsTypes.SET_LISTS_SAGA, setListsSaga),
        takeLatest(listsTypes.REMOVE_LIST_SAGA, removeListSaga),
        takeLatest(listsTypes.EDIT_LIST_NAME_SAGA, editListNameSaga),
        takeLatest(listsTypes.ADD_ITEM_SAGA, addItemSaga),
        takeLatest(listsTypes.REMOVE_ITEM_SAGA, removeItemSaga),
        takeLatest(listsTypes.EDIT_ITEM_TEXT_SAGA, editItemTextSaga),
        takeLatest(listsTypes.SET_ITEM_ENABLED_STATE_SAGA, setItemEnabledStateSaga),
        takeLatest(listsTypes.SET_ALL_ITEMS_ENABLED_STATE_SAGA, setAllItemsEnabledStateSaga),
        takeLatest(faceTypes.SET_ACCESS_TOKEN_SAGA, setPageAccessTokenSaga),
    ])
}