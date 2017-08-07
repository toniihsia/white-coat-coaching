import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { requestAllResidencies } from '../actions/residency_actions';

//Components
import App from './app';
import ResidencyFormContainer from './residencyform/residency_form_container';

const _requestAllResidencies = () => {
    store.dispatch(requestAllResidencies());
};

const Root = ({ store }) => (
  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ App } />
      <Route path="/residencyform" component={ ResidencyFormContainer } />
    </Router>
  </Provider>
);

export default Root;
