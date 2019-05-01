import types from '../../redux/core/actions/types/listsTypes'
import { takeLatest, put, call, all, select } from 'redux-saga/effects'
import { addList } from '../../services/firebase/lists'

function* addListSaga() {
    let listDocRef = yield call(addList, { name: '' })
    yield put({ type: types.ADD_LIST, payload: { name: '', id: listDocRef.id } })
}

export default function* root() {
    yield all([
        takeLatest(types.ADD_LIST_SAGA, addListSaga)
    ])
}