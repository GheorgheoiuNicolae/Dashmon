import React, { Component } from 'react';
import { connect } from 'react-redux';

import EntryForm from '../../../EntryForm/EntryForm';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import * as action from '../../../../../actions/entry';

@connect((store) => {
  return {
    currentEntry: store.currentEntry,
    user: store.user
  }
})
export default class EntrySingle extends Component {
  componentWillMount(){
    this.setState({
      open: false,
      submitDisabled: false
    });
  }

  handleOpen = () => {
    this.props.dispatch(action.setCurrentEntry(this.props.entry));
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { user, currentEntry } = this.props;

    this.props.dispatch(action.editEntry(user.uid, currentEntry));
    this.handleClose();    
  }


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
      <div className='EntrySingle'>
        <h3 className="title" onTouchTap={this.handleOpen} >{this.props.entry.title}</h3>

        <Dialog
          title="edit entry"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          
          <EntryForm editMode={true} />
        
        </Dialog>
      </div>
    )
  }
}
