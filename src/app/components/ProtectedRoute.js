import React from 'react';
import * as routes from './tools/routes';
import {
    BrowserRouter as Router,
    Route, withRouter, Redirect
} from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={(props) => (
            rest.currentUser !== null
              ? <Component {...props} />
              : <Redirect to='/signin' />
          )} />
    )
}

export default withRouter(ProtectedRoute);