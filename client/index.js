import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
// import Store from './store';
import App from './components/App';

const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
);

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));
