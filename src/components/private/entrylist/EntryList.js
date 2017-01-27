import React, { Component } from 'react';
import { connect } from 'react-redux';
import Entry from '../entry/Entry';

@connect((store) => {
  return {
    store: store
  }
})
export default class EntryList extends Component {
  componentWillMount(){
  }
  render () {
    let mappedDays = this.props.store.entries.list.map((day, index) => {
      let mappedEntries = day.entries.map( (entry) => {
        return <Entry data={entry} key={entry.id} uid={this.props.store.user.uid} dispatch={this.props.dispatch} />
      })
      return (
        <div key={index}>
          <h3>{day.date}</h3>
          { mappedEntries }
        </div>
      )
    });
    
    return (
      <div className='EntryList'>
        { mappedDays }
      </div>
    )
  }
}