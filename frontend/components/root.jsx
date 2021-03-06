import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router-3';
import { requestAllResidencies } from '../actions/residency_actions';

//Components
import App from './app';
import ResidencyFormContainer from './residencyform/residency_form_container';
import SessionForm from './sessionform/session_form_container';

function requestResidencies(store, discipline) {
    return () => {store.dispatch(requestAllResidencies(discipline))};
}

const Root = ({ store }) => (
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ App } onEnter={ requestResidencies(store) } />
      <Route path="/login" component={ SessionForm } />
      <Route path="/signup" component={ () => <SessionForm formType="signup" /> } />
      <Route path="/residencyform" component={ ResidencyFormContainer } />
      <Route path="/orthopedic" component={ App } onEnter={ requestResidencies(store, "orthopedic") } />
      <Route path="/earnosethroat" component={ App } onEnter={ requestResidencies(store, "earnosethroat") } />
    </Router>
  </Provider>
);

export default Root;
