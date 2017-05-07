import React, { Component } from 'react';
import { connect } from 'react-redux';

import sprites from '../../../assets/sprites.svg';
import EntryForm from '../EntryForm/EntryForm';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import * as action from '../../../actions/entry';

@connect((store) => {
  return {
    store: store
  }
})
export default class AddEntry extends Component {
  componentWillMount(){
    this.setState({
      open: false,
      submitDisabled: false,
      entry: {}
    });
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };


  handleSubmit = (e) => {
    e.preventDefault();
    const { uid } = this.props.store.user;
    const { currentEntry } = this.props.store;
    console.log('save current entry', currentEntry);
    this.props.dispatch(action.saveEntry(currentEntry, uid));
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
         
          <EntryForm />
        </Dialog>
      </div>
    )
  }
}
