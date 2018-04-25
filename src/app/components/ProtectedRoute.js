import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

const TestRoute = () => {
    console.log('test');
    return (
        <div>
            hi
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        'currentUser': state.auth
    })
}

export default TestRoute;