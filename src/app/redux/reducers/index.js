import { combineReducers } from 'redux';
import track from './track.js';
import playlist from './playlist.js';
import filter from './filter.js';
import auth from './auth.js';
import { routerReducer } from 'react-router-redux';


export default combineReducers({
    routing: routerReducer,
    playlist,
    track,
    filter,
    auth
})