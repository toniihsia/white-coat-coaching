// React
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Root from './components/root';
import configureStore from './store/store';

// Testing
import { signUp, logIn, logOut } from './util/session_api_util';
window.signUp = signUp;
window.login = logIn;
window.logout = logOut;
window.store = configureStore();

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {session: { currentUser: window.currentUser, errors: [] }};
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }

  const rootEl = document.getElementById('root');

  ReactDOM.render(<Root store={ store } />, rootEl);
});
