import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import EntryListItem from './EntryListItem/EntryListItem';

@connect((store) => {
  return {
    store: store
  }
})
export default class EntryList extends Component {
  render () {
    let mappedDays = this.props.store.entries.list.map((day, index) => {
      let mappedEntries = day.entries.map( (entry) => {
        return <EntryListItem entry={entry} key={entry.id} />
      })
      return (
        <div key={index}>
          <h3>{moment(day.date).format("dddd, D")} {moment(day.date).format("MMMM YYYY")}</h3>
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