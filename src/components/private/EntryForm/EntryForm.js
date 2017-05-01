import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../actions/entry';
import TextField from 'material-ui/TextField';

@connect((store) => {
  return {
    store: store
  }
})
export default class EntryForm extends Component {
  componentWillMount(){
    if(this.props.editMode){
      const { currentEntry } = this.props.store;
      this.setState({...currentEntry, editMode: true});
    }
    else {
      this.setState({ editMode: false })
    }
  }

  handleChange(event) {
    switch(event.target.id){
      case 'title': {
        this.setState({
          title: event.target.value
        }, () => this.makeEntry());
        break;
      }
      case 'description': {
        this.setState({
          description: event.target.value
        }, () => this.makeEntry());
        break;
      }
      default: {
        break;
      }
    }
  }

  makeEntry(){
    const entry = this.state;
    console.log('make entry', entry);
    if(!entry.editMode){
      console.log('setting new date')
      entry.date = new Date().toString();
    }
    delete entry.editMode;
    
    this.props.dispatch(action.setCurrentEntry(entry));
  }
  
  // updateLabelList(labels){
  //   let labelIds = []
  //   for(let i = 0; i < labels.length; i++){
  //     labelIds.push(labels[i].id);
  //   }
  //   this.setState({
  //     labelIds: labelIds
  //   }, function(){
  //     this.makeEntry();
  //   });
  // }

  // updateEntryImageList(images){
  //   if(images && this.state.images){
  //     if(this.state.images.length !== images.length){
  //       this.setState({
  //         images: images
  //       }, function(){
  //         this.makeEntry();
  //       });
  //     }
  //   }
  // }

  render () {
    const { title, description, editMode } = this.state;
    return (
      <div className="entry-form">
        <form>
          <TextField
            hintText="Title"
            defaultValue={ title ? title : ''}
            fullWidth={true}
            onChange={(event) => this.handleChange(event)}
            id="title"
            errorText={editMode && !title ? 'This field is required' : null }
          />

          <TextField
            hintText="Description"
            defaultValue={description ? description : ''}
            fullWidth={true}
            onChange={(event) => this.handleChange(event)}
            multiLine={true}
            id="description"
          />

          {/* <EntryLabels 
            labels={this.state.labels} 
            updateLabelList={this.updateLabelList.bind(this)} 
          />

          <EntryImages 
            uid={this.props.store.user.uid} 
            dispatch={this.props.dispatch}
            updateEntryImageList={this.updateEntryImageList.bind(this)}
            images={this.state.images}
            entry={this.props.entry}
          />*/}
        </form>
      </div>
    )
  }
}
