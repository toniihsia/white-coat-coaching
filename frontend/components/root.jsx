import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router-3';
import { requestAllResidencies } from '../actions/residency_actions';

//Components
import App from './app';
import ResidencyFormContainer from './residencyform/residency_form_container';
import SessionForm from './sessionform/session_form_container';

const _requestAllResidencies = () => {
    store.dispatch(requestAllResidencies());
};

const Root = ({ store }) => (
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ App } />
      <Route path="/login" component={ SessionForm } />
      <Route path="/residencyform" component={ ResidencyFormContainer } />
    </Router>
  </Provider>
);

export default Root;
