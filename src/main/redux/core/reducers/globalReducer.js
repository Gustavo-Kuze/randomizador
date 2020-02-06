import types from '../actions/types/globalTypes';

const STATE = {
  isMenuOpen: false,
};

export default (state = STATE, action) => {
  switch (action.type) {
    case types.SET_IS_MENU_OPEN:
      return { ...state, isMenuOpen: action.payload };
    default:
      return state;
  }
};
