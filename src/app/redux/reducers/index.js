import { combineReducers } from 'redux';
import auth from './auth.js';
import tasks from './tasks.js';
import notifications from './notifications.js';
import { routerReducer } from 'react-router-redux';


export default combineReducers({
    routing: routerReducer,
    auth,
    tasks,
    notifications
})