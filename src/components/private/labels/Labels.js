import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as action from '../../../actions/label';
import Label from './label/Label';

@connect((store) => {
  return {
    store: store
  }
})
export default class Labels extends Component {

  createLabel(e){
    e.preventDefault()
    let label = {
      title: this.title.value,
      color: this.color.value,
    };
    
    this.props.dispatch(action.saveLabel(label, this.props.store.user.uid));
    // clear inputs
    this.title.value = '';
    this.color.value = '';
  }

  render () {
    let mappedLabels = this.props.store.labels.list.map((label) => {
      return <Label data={label} key={label.id} uid={this.props.store.user.uid} dispatch={this.props.dispatch} />
    });

    return (
      <div className='LabelsList'>
        { mappedLabels } 

        <div className="create-label">
          <input type="text" className="name" ref={(title) => this.title = title} />
          <input type="text" className="color" ref={(color) => this.color = color} />
          <button onClick={this.createLabel.bind(this)}>Create label</button>
        </div>
      </div>
    )
  }
}