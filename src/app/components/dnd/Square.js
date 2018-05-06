import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Square extends React.Component {
  static propTypes = {
    black: PropTypes.bool
  };

  render() {
    const { black } = this.props;
    console.log(black);
    const fill = black ? 'black' : 'white';
    const stroke = black ? 'white' : 'black';

    return (
        <div style={{ 
                backgroundColor: fill,
                color: stroke,
                height: '100%'
            }}>
            {this.props.children}
        </div>
    );
  }
}