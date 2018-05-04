import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const mapStateToProps = (state) => {
    return ({
        'currentUser': state.auth
    })
}

export default ProtectedRoute;