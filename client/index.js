import React from 'react';
import ReactDOM from 'react-dom';
import jwt from 'jsonwebtoken';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import setAuthorizationToken from './utils/setAuthorizationToken';
import App from './components/App';
import rootReducer from './reducers';
import authAction from './actions/authAction';
import getUserGroupsAction from './actions/getUserGroupsAction';
import verifyTokenAction from './actions/verifyTokenAction';
import './scss/main.scss';
import './js/grouploader';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
if (localStorage.token) {
  const token = localStorage.getItem('token');
  verifyTokenAction(token)
    .then(() => {
      const decoded = jwt.decode(token);
      setAuthorizationToken(token);
      store.dispatch(authAction(decoded.data, 'Success'));
      store.dispatch(getUserGroupsAction(decoded.data));
    })
    .catch(() => {
      Materialize.toast('Session Expired, Please Sign In', 6000, 'red white-text rounded');
      localStorage.removeItem('token');
      location.href = '/';
    });
}

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));
