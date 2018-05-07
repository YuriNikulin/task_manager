import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './design/css/main.css';
import App from './App';
import store from './app/redux';
import './design/fonts/fonts.css';
import './design/fonts/icons.css';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';

let rootEl = document.querySelector('#root');
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootEl
)
