import { SET_USER_LOGGEDIN } from '../actions';

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOGGEDIN:
      return {
        ...state,
        ...action.user,
      };
    default:
      return state;
  }
};

export default userReducer;
