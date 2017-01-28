import React, { Component } from 'react';
import { connect } from 'react-redux';

import sprites from '../../../assets/sprites.svg';

import Dialog from 'material-ui/Dialog';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import * as action from '../../../actions/entry';

@connect((store) => {
  return {
    store: store
  }
})
export default class AddEntry extends Component {
  componentWillMount(){
    this.setState({
      classes: '',
      labels_initial_load: true,
      labels: [],
      open: false,
      titleValid: true,
      submitDisabled: false,
      labelsPopoverOpen: false
    });
  }


  handleOpen = () => {
    this.setState({open: true});
  };


  handleClose = () => {
    this.setState({
      title: '',
      description: '',
      submitDisabled: false,
      titleValid: true,
      open: false,
      labels: []
    });
  };
  

  handleChange(event) {
    switch(event.target.id){
      case 'title': {
        var title = event.target.value
        this.setState({
          title: title
        });
        if(title.length === 0){
          this.setState({ titleValid: false, submitDisabled: true });
        } else {
          this.setState({ titleValid: true, submitDisabled: false });
        }
        break;
      }
      case 'description': {
        var description = event.target.value 
        this.setState({
          description: description
        });
        break;
      }
      default: {
        break;
      }
    }
  }


  handleSubmit = (e) => {
    e.preventDefault()

    var entry = {
        title: this.state.title,
        description: this.state.description,
        date: (new Date()).toString(),
        images: [],
        labels: this.state.labels
    };

    this.props.dispatch(action.saveEntry(entry, this.props.store.user.uid));
    this.handleClose();
  }


  toggleLabel(id){
    let current = this.state.labels;

    let idx = current.indexOf(id);
    if(idx !== -1){
      current.splice(idx, 1);
    } else {
      current.push(id);
    }

    this.setState({ labels: current }, function(){ console.log(this.state);});
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
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
        disabled={this.state.submitDisabled ? true : false}
      />,
    ];

    return (
      <div className="topbar-link add-entry-wrap">
        <FlatButton 
          onTouchTap={this.handleOpen} 
          children={
            <div>
              <svg className="icon icon-add"><use xlinkHref={`${sprites}#icon-add`}></use></svg>
              <span>Add entry</span>
            </div>
          }
        />

        <Dialog
          title="Add entry"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <div className="add-entry-form">
            <form>
              <TextField
                hintText="Title"
                fullWidth={true}
                onChange={(event) => this.handleChange(event)}
                id="title"
                errorText={!this.state.titleValid ? 'This field is required' : null }
              /> <br />

              <TextField
                hintText="Description"
                fullWidth={true}
                onChange={(event) => this.handleChange(event)}
                id="description"
              /> <br />

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
                          onCheck={(e) => this.toggleLabel(label.id)}
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
                {this.props.store.labels.list.map(function(label){
                  return ( <span onClick={this.toggleLabel.bind(this)} key={label.id} id={label.id} > {label.title} </span>)
                }.bind(this))}
              </div>
            </form>
          </div>
        </Dialog>
      </div>
    )
  }
}
