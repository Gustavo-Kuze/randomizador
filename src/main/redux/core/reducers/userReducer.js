import types from '../actions/types/userTypes';

const STATE = {
  displayName: '',
  email: '',
  photoURL: '',
  emailVerified: false,
  uid: '',
};

export default (state = STATE, action) => {
  switch (action.type) {
    case types.USER_LOGIN:
      return action.payload;
    case types.USER_LOGOUT:
      return STATE;
    default:
      return state;
  }
};
