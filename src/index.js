import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './design/css/main.css';
import App from './App';
import store from './app/redux';
import './fonts.css';

ReactDOM.render(
  <Provider store={store}>
    <App />  
  </Provider>,
  document.getElementById('root')
);
