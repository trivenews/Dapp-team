
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
const initialState = {}
let store = createStore(reducers, initialState, applyMiddleware(ReduxThunk));
const middleware = [ReduxThunk];
middleware.push(logger);

ReactDOM.render(
  <Provider store={store}>
  <Router >
    <App />
  </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
