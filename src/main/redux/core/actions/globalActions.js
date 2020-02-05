import types from './types/globalTypes';

export const setIsMenuOpen = isOpen => {
  return {
    type: types.SET_IS_MENU_OPEN,
    payload: isOpen,
  };
};
