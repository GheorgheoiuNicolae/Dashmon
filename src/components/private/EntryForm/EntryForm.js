import React, { Component } from 'react';
import { connect } from 'react-redux';

import EntryLabels from './subcomponents/_labels';
import EntryImages from './subcomponents/_images';

import TextField from 'material-ui/TextField';

@connect((store) => {
  return {
    store: store
  }
})
export default class EntryForm extends Component {
  componentWillMount(){
    // populate the state as EntryForm is in edit mode
    if(this.props.entry){
      console.log('editing entry: ', this.props.entry);
      this.setState({...this.props.entry, titleValid: true, editMode: true});
    }
    // else the form is used to create a new entry
    else {
      this.setState({
        labelIds: [],
        images: [],
        titleValid: true,
        editMode: false
      });
    }
  }

  // Handle change for title and description
  handleChange(event) {
    switch(event.target.id){
      case 'title': {
        var title = event.target.value
        this.setState({
          title: title
        });
        if(title.length === 0){
          this.setState({ titleValid: false }, () => this.makeEntry());
        } else {
          this.setState({ titleValid: true }, () => this.makeEntry());
        }
        break;
      }
      case 'description': {
        var description = event.target.value 
        this.setState({
          description: description
        }, () => this.makeEntry());
        break;
      }
      default: {
        break;
      }
    }
  }

  makeEntry(){
    let entry = {
        title: this.state.title,
        description: this.state.description || null,
        date: (new Date()).toString(),
        created_at: (new Date()).toString(),
        labels: this.state.labelIds,
        images: this.state.images,
        recurrent: false,
        repeat_every: 0 // numbers of days to repeat
    };
    // send the entry object to parent component
    this.props.getEntryData(entry);
  }
  
  updateLabelList(labels){
    let labelIds = []
    for(let i = 0; i < labels.length; i++){
      labelIds.push(labels[i].id);
    }
    this.setState({
      labelIds: labelIds
    }, function(){
      this.makeEntry();
    });
  }

  updateEntryImageList(images){
    console.log('images: ', images);
    if(images){
      if(this.state.images.length !== images.length){
        this.setState({
          images: images
        }, function(){
          this.makeEntry();
        });
      }
    }
  }

  render () {
    return (
      <div className="entry-form">
        <form>
          <TextField
            hintText="Title"
            defaultValue={this.state.title}
            fullWidth={true}
            onChange={(event) => this.handleChange(event)}
            id="title"
            errorText={!this.state.titleValid ? 'This field is required' : null }
          />

          <TextField
            hintText="Description"
            defaultValue={this.state.description}
            fullWidth={true}
            onChange={(event) => this.handleChange(event)}
            id="description"
          />

          <EntryLabels 
            labels={this.state.labels} 
            updateLabelList={this.updateLabelList.bind(this)} 
          />

          <EntryImages 
            uid={this.props.store.user.uid} 
            dispatch={this.props.dispatch}
            updateEntryImageList={this.updateEntryImageList.bind(this)}
            images={this.state.images}
            entry={this.props.entry}
          />
        </form>
      </div>
    )
  }
}
