import React from 'react';
import ReactDOM from 'react-dom';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import App from './components/App';
import rootReducer from './reducers';
import setAuthorizationToken from './utils/setAuthorizationToken';
import authAction from './actions/authAction';
import getUserGroupsAction from './actions/getUserGroupsAction';

require('./js/creategroup.js');

dotenv.config();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if(localStorage.token) {
  const token = localStorage.getItem('token');
  setAuthorizationToken(token);
  jwt.verify(token, 'postitapp', (err, decoded) => {
    if (decoded) {
      store.dispatch(authAction(decoded.data, 'Success'));
      store.dispatch(getUserGroupsAction(decoded.data));
    } else {
      console.log(err);
    }
  });
}

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));
