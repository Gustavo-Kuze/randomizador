import types from './types/loginTypes';

export const setAuthResult = authResult => {
  return {
    type: types.SET_AUTH_RESULT,
    payload: authResult,
  };
};
