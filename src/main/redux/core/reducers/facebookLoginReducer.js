import types from '../actions/types/facebookLoginTypes';

const STATE = {
  status: 'unknown',
  authResponse: null,
  FB: undefined,
};

export default (state = STATE, action) => {
  switch (action.type) {
    case types.SET_STATUS:
      return { ...state, status: action.payload };
    case types.SET_AUTH_RESULT:
      return { ...state, authResponse: action.payload };
    case types.SET_FB:
      return { ...state, FB: action.payload };
    default:
      return state;
  }
};
