import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { requestAllResidencies } from '../actions/residency_actions';

//Components
import App from './app';

const _requestAllResidencies = () => {
    store.dispatch(requestAllResidencies());
};

const Root = ({ store }) => (
  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ App } onEnter={_requestAllResidencies}>
      </Route>
    </Router>
  </Provider>
);

export default Root;
