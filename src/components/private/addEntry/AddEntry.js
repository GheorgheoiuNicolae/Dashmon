import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as action from '../../../actions/entry';
import * as addEntryFormAction from '../../../actions/addEntry';

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
      labels: []
    });
  }
  

  componentWillReceiveProps(nextProps){
    let shownStateClass = nextProps.store.addEntry.displayAddEntryForm ? 'shown' : 'hidden';
    let classes = `AddEntry ${shownStateClass}`;

    this.setState({
      classes: classes
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()

    var entry = {
        title: this.title.value,
        description: this.description.value,
        date: (new Date()).toString(),
        images: [],
        labels: this.state.labels
    };
    
    this.props.dispatch(action.saveEntry(entry, this.props.store.user.uid));
    // clear inputs
    this.title.value = '';
    this.description.value = '';

    // hide the overlay
    this.hideAddEntryForm();
  }

  toggleLabel(e){
    let current = this.state.labels;

    let idx = current.indexOf(e.target.id);
    if(idx !== -1){
      current.splice(idx, 1);
    } else {
      current.push(e.target.id);
    }

    this.setState({
      labels: current
    });
  }

  hideAddEntryForm(){
    this.setState({
      labels: []
    })
    this.props.dispatch(addEntryFormAction.hideAddEntry());
  }

  render () {
    return (
        <div className={ this.state.classes }>
            <span className="close" onClick={this.hideAddEntryForm.bind(this)}> X </span>
            <div className="title">Create a new entry</div>
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="title" ref={(title) => this.title = title} />
                <input type="text" placeholder="description" ref={(description) => this.description = description} />
                <div className="labels">
                  {this.props.store.labels.list.map(function(label){
                    return ( <span onClick={this.toggleLabel.bind(this)} key={label.id} id={label.id} > {label.title} </span>)
                  }.bind(this))}
                </div>
                <button type="submit" className="btn btn-primary">Submit Entry</button>
            </form>
        </div>
    )
  }
}