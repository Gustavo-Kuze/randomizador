import types from '../../redux/core/actions/types/listsTypes';
import { put, call } from 'redux-saga/effects';
import {
  addList,
  deleteList,
  editListName,
  addItem,
  deleteItem,
  editItemText,
  setItemEnabledState,
  setAllItemsEnabledState,
} from '../../services/firebase/lists';

function* addListSaga(action) {
  if (action.payload) {
    yield call(addList, action.payload);
  } else {
    yield call(addList, {
      name: '',
      items: [],
      date: new Date().toLocaleString(),
    });
  }
}

function* removeListSaga(action) {
  yield call(deleteList, action.payload);
}

function* editListNameSaga(action) {
  yield call(editListName, action.payload.list, action.payload.name);
}

function* setListsSaga(action) {
  yield put({ type: types.SET_LISTS, payload: action.payload });
}

function* addItemSaga(action) {
  yield call(addItem, action.payload.list, action.payload.itemText);
}

function* removeItemSaga(action) {
  yield call(deleteItem, action.payload.item, action.payload.list);
}

function* editItemTextSaga(action) {
  yield call(editItemText, action.payload.item, action.payload.list);
}

function* setItemEnabledStateSaga(action) {
  yield call(setItemEnabledState, action.payload.item, action.payload.list);
}

function* setAllItemsEnabledStateSaga(action) {
  yield call(
    setAllItemsEnabledState,
    action.payload.enabled,
    action.payload.list,
  );
}

export {
  addListSaga,
  removeListSaga,
  editListNameSaga,
  setListsSaga,
  addItemSaga,
  removeItemSaga,
  editItemTextSaga,
  setItemEnabledStateSaga,
  setAllItemsEnabledStateSaga,
};
