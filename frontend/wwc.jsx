import React from 'react';
import ReactDOM from 'react-dom';

// Testing
import { signUp, logIn, logOut } from './util/session_api_util';
window.signUp = signUp;
window.login = logIn;
window.logout = logOut;

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<h1>Welcome to White Coat Coaching</h1>);
});
