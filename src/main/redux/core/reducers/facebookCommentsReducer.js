import types from '../actions/types/facebookCommentsTypes';

const STATE = {
  userPages: [],
  pagePosts: [],
  selectedPage: {},
  selectedPost: {},
  comments: [],
};

export default (state = STATE, action) => {
  switch (action.type) {
    case types.SET_USER_PAGES:
      return { ...state, userPages: action.payload };
    case types.SET_PAGE_POSTS:
      return { ...state, pagePosts: action.payload };
    case types.SET_SELECTED_PAGE:
      return { ...state, selectedPage: action.payload };
    case types.SET_SELECTED_POST:
      return { ...state, selectedPost: action.payload };
    case types.SET_POST_COMMENTS:
      return { ...state, comments: action.payload };
    case types.RESET_STATE:
      return STATE;
    default:
      return state;
  }
};
