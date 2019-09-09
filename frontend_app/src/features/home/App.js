import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  render() {
    return (
      <div className="home-app">
        <div className="page-container">{this.props.children}</div>
      </div>
    );
  }
}
