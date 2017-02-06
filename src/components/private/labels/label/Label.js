import React, { Component } from 'react';
import * as action from '../../../../actions/label';

export default class Label extends Component {
  removeLabel(){
    this.props.dispatch(action.removeLabel(this.props.uid, this.props.data.id));
  }

  render () {
    return (
      <div className='Label'>
        <span className="label-title">{this.props.data.title}</span>
        <span className="remove" onClick={this.removeLabel.bind(this)}>X</span>
      </div>
    )
  }
}