import {
  receiveCurrentUser,
  receiveErrors,
  removeCurrentUser,
  LOG_IN,
  LOG_OUT,
  SIGN_UP
} from '../actions/session_actions';

import { signUp, logIn, logOut } from '../util/session_api_util';
import { browserHistory } from 'react-router-3';

export default ({ getState, dispatch }) => next => action => {
  const successCallback = (currentUser) => {dispatch(receiveCurrentUser(currentUser)); browserHistory.push('/residencyform')};

  const successLogOutCallback = () => {
    dispatch(removeCurrentUser());
    browserHistory.push('/');
  };

  const errorCallback = (xhr) => dispatch(receiveErrors(xhr.responseJSON));

  switch(action.type){
    case SIGN_UP:
      signUp(action.user, successCallback, errorCallback);
      return next(action);
    case LOG_IN:
      logIn(action.user, successCallback, errorCallback);
      return next(action);
    case LOG_OUT:
      logOut(successCallback, errorCallback);
      return next(action);
    default:
      return next(action);
  }
};
