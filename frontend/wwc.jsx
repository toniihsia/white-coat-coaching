// React
import React from 'react';
import ReactDOM from 'react-dom';

// Components
// import Root from './components/root';
import configureStore from './store/store';

// Testing
import { signUp, logIn, logOut } from './util/session_api_util';
window.signUp = signUp;
window.login = logIn;
window.logout = logOut;
window.store = configureStore();

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<h1>Welcome to White Coat Coaching</h1>, root);
});
