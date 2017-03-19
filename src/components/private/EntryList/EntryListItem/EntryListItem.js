import React, { Component } from 'react';
import moment from 'moment';
import * as action from '../../../../actions/entry';
import sprites from '../../../../assets/sprites.svg';

import ConfirmRemoveEntryDialog from './confirmRemoveEntry';
import EntrySingle from './EntrySingle/EntrySingle';

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
        <p className="time"> {moment(this.props.data.timestamp).format('hh:mm')} </p>
        <div className="main-label">
          <svg className="icon icon-photo_camera"><use xlinkHref={`${sprites}#icon-photo_camera`}></use></svg>
        </div>
        <EntrySingle entry={this.props.data} />
        <div className="labels">
          {labels}
        </div>
        <div className="entry-info-icons">
          <svg className="icon icon-photo_camera"><use xlinkHref={`${sprites}#icon-photo_camera`}></use></svg>
          <svg className="icon icon-sort"><use xlinkHref={`${sprites}#icon-sort`}></use></svg>
          <svg className="icon icon-room"><use xlinkHref={`${sprites}#icon-room`}></use></svg>
        </div>
        
        <ConfirmRemoveEntryDialog 
          removeEntry={this.removeEntry.bind(this)} 
          entryTitle={this.props.data.title}
        />
      </div>
    )
  }
}
