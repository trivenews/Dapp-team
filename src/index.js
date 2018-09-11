
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
//const initialState = {}
const middleware = [ReduxThunk, logger];
let store = createStore(
  reducers,
  {},
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
  );
  

// middleware.push(logger);

ReactDOM.render(
  <Provider store={store}>
  <Router >
    <App />
  </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
