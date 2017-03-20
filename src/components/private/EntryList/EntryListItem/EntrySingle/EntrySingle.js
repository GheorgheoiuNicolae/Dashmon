import React, { Component } from 'react';
import { connect } from 'react-redux';

// import sprites from '../../../../../assets/sprites.svg';
import EntryForm from '../../../EntryForm/EntryForm';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import * as action from '../../../../../actions/entry';

@connect((store) => {
  return {
    store: store
  }
})
export default class EntrySingle extends Component {
  componentWillMount(){
    console.log('EntrySingle', this.props)
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
    this.props.dispatch(action.editEntry(this.props.store.user.uid, this.props.store.currentEntry));
    this.handleClose();    
  }

  // getEntryData(entry){
  //   this.setState({entry: entry});
  // }

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
