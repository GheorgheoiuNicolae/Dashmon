import React, {Component} from 'react';
import './App.less';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className={`rendered-view`}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
