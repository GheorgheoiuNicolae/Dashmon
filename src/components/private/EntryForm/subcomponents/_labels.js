import React, { Component } from 'react';
import { connect } from 'react-redux';

import sprites from '../../../../assets/sprites.svg';

import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';

// import * as action from '../../../actions/entry';

@connect((store) => {
  return {
    store: store.labels
  }
})
export default class EntryLabels extends Component {
  componentWillMount(){
    console.log('EntryLabels: ', this);
    if(this.props.labels){
      console.log('edit entry');
      this.setState({
        labels: this.props.labels,
        labelsPopoverOpen: false
      });
    } else {
      console.log('add entry');
      this.setState({
        labels: [],
        labelsPopoverOpen: false
      });
    }
  }

  toggleLabel(label){
    let currentLabels = this.state.labels;
    let idx = currentLabels.indexOf(label);

    if(idx !== -1){
      currentLabels.splice(idx, 1);
    } else {
      currentLabels.push(label);
    }

    this.setState({ labels: currentLabels});
    this.props.updateLabelList(currentLabels);
  }


  handleCloseLabelsPopover = () => {
    this.setState({
      labelsPopoverOpen: false
    });
  }


  handleTouchTap = (event) => {
    event.preventDefault();

    this.setState({
      labelsPopoverOpen: true,
      anchorEl: event.currentTarget,
    });
  };

  render () {
    return (
      <div className="entry-labels">
        <FlatButton
          onTouchTap={this.handleTouchTap}
          children={
              <div className="button-choose-labels">
              <svg className="icon icon-label_outline"><use xlinkHref={`${sprites}#icon-label_outline`}></use></svg>
              <span>Labels</span>
              </div>
          }
        />

        <Popover
            open={this.state.labelsPopoverOpen}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleCloseLabelsPopover}
            animation={PopoverAnimationVertical}
            className="choose-labels"
            style={{width: '250px'}}
        >
          <div className="wrap">
              <div className="header">
                  <h5>Choose Labels</h5>
              </div>
              
              <div className="labels">
              {this.props.store.list.map(function(label){
                  return ( <div key={label.id} id={label.id} >
                  <Checkbox
                      checkedIcon={ <div className="check-icon"><svg className="icon icon-check"><use xlinkHref={`${sprites}#icon-check`}></use></svg></div> }
                      uncheckedIcon={ <div></div> }
                      checked={this.state.labels.indexOf(label) ? false : true}
                      onCheck={(e) => this.toggleLabel(label)}
                      label={
                      <div className="label">
                          <div className="label-color" style={{backgroundColor: label.color, width: '5px', height: '5px'}}></div>
                          <span>{label.title}</span>
                      </div>
                      }
                      labelPosition="left"
                  />
                  </div>)
              }.bind(this))}
              </div>
          </div>
        </Popover>

        <div className="labels">
          {this.state.labels.map(function(label){
            return ( <div className="presentation-label" style={{backgroundColor: label.color, color: '#fff'}} key={label.id} id={label.id} >{label.title}</div>)
          })}
        </div>
      </div>
    )
  }
}
