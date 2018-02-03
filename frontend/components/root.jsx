import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { requestAllResidencies } from '../actions/residency_actions';

//Components
import App from './app';
import ResidencyFormContainer from './residencyform/residency_form_container';

const _requestAllResidencies = () => {
    store.dispatch(requestAllResidencies());
};

const Root = ({ store }) => (
  <Provider store={ store }>
    <BrowserRouter>
      <div>
        <Route path="/" component={ App } />
        <Route path="/residencyform" component={ ResidencyFormContainer } />
      </div>
    </BrowserRouter>
  </Provider>
);

export default Root;
