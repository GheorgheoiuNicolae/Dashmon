import React, { Component } from 'react';
import * as action from '../../../actions/entry';
import sprites from '../../../assets/sprites.svg';

export default class Entry extends Component {
  removeEntry(){
    this.props.dispatch(action.removeEntry(this.props.uid, this.props.data.id));
  }

  render () {
    let labels = ( this.props.data.labels ? (this.props.data.labels.map(function(label){
                      return ( <div key={label.id} className="label"><p>{ label.title }</p></div> )
                  })) : null );

    return (
      <div className='Entry'>
        <p className="time"> {new Date(this.props.data.date).getHours()}: {new Date(this.props.data.date).getMinutes()} </p>
        <div className="main-label">
          <svg className="icon icon-photo_camera"><use xlinkHref={`${sprites}#icon-photo_camera`}></use></svg>
        </div>
        <h3 className="title">{this.props.data.title}</h3>
        <div className="labels">
          {labels}
        </div>
        <div className="entry-info-icons">
          <svg className="icon icon-photo_camera"><use xlinkHref={`${sprites}#icon-photo_camera`}></use></svg>
          <svg className="icon icon-sort"><use xlinkHref={`${sprites}#icon-sort`}></use></svg>
          <svg className="icon icon-room"><use xlinkHref={`${sprites}#icon-room`}></use></svg>
        </div>
        
        <span className="remove" onClick={this.removeEntry.bind(this)}>X</span>
      </div>
    )
  }
}
