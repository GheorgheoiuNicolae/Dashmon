import React, { Component } from 'react';
import { connect } from 'react-redux';

import sprites from '../../../assets/sprites.svg';

import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';

// import * as action from '../../../actions/entry';

@connect((store) => {
  return {
    store: store
  }
})
export default class EntryLabels extends Component {
  componentWillMount(){
    this.setState({
      presentationLabels: [],
      labels: [],
      labelsPopoverOpen: false
    });
  }

  toggleLabel(label){
    let current = this.state.labels;
    let presentationLabels = this.state.presentationLabels;

    let idx = current.indexOf(label.id);
    let idx2 = presentationLabels.indexOf(label);

    if(idx !== -1){
      current.splice(idx, 1);
      presentationLabels.splice(idx2, 1);
    } else {
      presentationLabels.push(label)
      current.push(label.id);
    }

    this.setState({ labels: current, presentationLabels: presentationLabels }, function(){ console.log(this.state);});
    this.props.updateLabelList(presentationLabels);
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
                {this.props.store.labels.list.map(function(label){
                    return ( <div key={label.id} id={label.id} >
                    <Checkbox
                        checkedIcon={ <div className="check-icon"><svg className="icon icon-check"><use xlinkHref={`${sprites}#icon-check`}></use></svg></div> }
                        uncheckedIcon={ <div></div> }
                        checked={this.state.labels.indexOf(label.id) ? false : true}
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
      </div>
    )
  }
}
