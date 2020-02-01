import types from '../core/actions/types/facebookLoginTypes';
import { put, call } from 'redux-saga/effects';
import { getPageAccessToken } from '../../services/facebook/';

function* setPageAccessTokenSaga(action) {
  let response = yield call(getPageAccessToken, action.payload);
  yield put({ type: types.SET_ACCESS_TOKEN, payload: response.access_token });
}

export { setPageAccessTokenSaga };
