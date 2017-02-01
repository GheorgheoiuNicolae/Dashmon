import React, { Component } from 'react';
import moment from 'moment';
import * as action from '../../../actions/entry';
import sprites from '../../../assets/sprites.svg';

import EntrySingle from '../entrysingle/EntrySingle';

export default class Entry extends Component {
  removeEntry(){
    this.props.dispatch(action.removeEntry(this.props.uid, this.props.data.id));
  }

  handleTouchTap = (event) => {
    event.preventDefault();

    this.setState({
      labelsPopoverOpen: true,
      anchorEl: event.currentTarget,
    });
  };

  render () {
    let labels = ( this.props.data.labels ? (this.props.data.labels.map(function(label){
                      return ( <div key={label.id} className="label"><p>{ label.title }</p></div> )
                  })) : null );

    return (
      <div className='Entry'>
        <p className="time"> {moment(this.props.data.date).format('hh:mm')} </p>
        <div className="main-label">
          <svg className="icon icon-photo_camera"><use xlinkHref={`${sprites}#icon-photo_camera`}></use></svg>
        </div>
        <EntrySingle entry={this.props.data} style={{color: 'red', flex: 1}} />
        {/* <h3 className="title">{this.props.data.title}</h3>*/}
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
