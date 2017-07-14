import React, { Component } from 'react';
import App from '../../src/index';


class Example extends Component {

  render() {
    return (
      <App user={{ name: 'Andrew', age: 20 }}>
        <App.Button>分享</App.Button>
        <App.Avatar src="https://work.alibaba-inc.com/photo/98764.100x100.jpg"/>
      </App>
    );
  }
}

module.exports = Example;
