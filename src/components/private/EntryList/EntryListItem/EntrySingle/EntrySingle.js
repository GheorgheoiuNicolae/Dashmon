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
    console.log('EntrySingle!');
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
    console.log('submiting: ', this.state.entry)
    e.preventDefault()
    if(this.props.entry){
      // save entry edits
      console.log('save entry edits')
      this.props.dispatch(action.editEntry(this.props.store.user.uid, this.state.entry, ));
      this.handleClose();
    }    
  }

  getEntryData(entry){
    this.setState({entry: entry});
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
          
          <EntryForm entry={this.props.entry} getEntryData={this.getEntryData.bind(this)} />
        
        </Dialog>
      </div>
    )
  }
}
