import { put, call } from 'redux-saga/effects';
import types from '../core/actions/types/facebookLoginTypes';
import { getPageAccessToken } from '../../services/facebook';

function* setPageAccessTokenSaga(action) {
  const response = yield call(getPageAccessToken, action.payload);
  yield put({ type: types.SET_ACCESS_TOKEN, payload: response.access_token });
}

export { setPageAccessTokenSaga };
