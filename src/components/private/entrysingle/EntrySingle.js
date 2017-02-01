import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import * as action from '../../../actions/entry';

@connect((store) => {
  return {
    store: store
  }
})
export default class EntrySingle extends Component {
  componentWillMount(){
    this.setState({
      classes: '',
      labels_initial_load: true,
      // labels to display when the user picks them
      presentationLabels: [],
      labels: [],
      open: false,
      titleValid: true,
      submitDisabled: false
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
      labels: [],
      presentationLabels: []
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
        description: this.state.description || null,
        date: (new Date()).toString(),
        images: [],
        labels: this.state.labels
    };

    this.props.dispatch(action.saveEntry(entry, this.props.store.user.uid));
    this.handleClose();
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
  }


  updateLabelList(labels){
    this.setState({
      presentationLabels: labels
    });
    console.log('updateLabelList', labels)
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
          title="Edit entry"
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
              <div className="labels">

              </div>
            </form>
          </div>
        </Dialog>
      </div>
    )
  }
}
