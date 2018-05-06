import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './design/css/main.css';
import App from './App';
import store from './app/redux';
import './design/fonts/fonts.css';
import './design/fonts/icons.css';
import Board from './app/components/dnd/Board.js';
import {observe} from './app/components/dnd/Game.js';
let rootEl = document.querySelector('#root');
observe(knightPosition =>
  ReactDOM.render(
    <Board knightPosition={knightPosition} />,
    rootEl
  )
);