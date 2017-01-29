import React, { Component } from 'react';
import { connect } from 'react-redux';

import { firebaseAuth } from '../../../config/constants';
import { checkAuthState } from '../../../actions/user';
import * as action from '../../../actions/entry';
import * as labelAction from '../../../actions/label';

import TopBar from '../topbar/TopBar';
import SideBar from '../sidebar/SideBar';

@connect((store) => {
  return {
    store: store
  }
})
export default class Dashboard extends Component {
  componentWillMount(){
    let observer = (user) => {
      this.props.dispatch(checkAuthState(user));
      unsubscribe();
    }
    var unsubscribe = firebaseAuth().onAuthStateChanged(observer);

    this.setState({
      entries_initial_load: true,
      labels_initial_load: true
    });
  }

  componentWillReceiveProps(nextProps){
    // Make firebase requests to get data
    if(this.props.store.entries.entries_initial_load && this.state.entries_initial_load && nextProps.store.user.uid){
      // If labels are not loaded, make the request
      if(this.props.store.labels.labels_initial_load && this.state.labels_initial_load){
          this.setState({
            labels_initial_load: false
          });
          this.props.dispatch(labelAction.getLabels(nextProps.store.user.uid));
      } else {
        // request the entries
        this.setState({
          entries_initial_load: false
        });
        this.props.dispatch(action.getEntries(nextProps.store.user.uid, nextProps.store.labels.list));
      }
    }
  }

  render () {
    return (
      <div className='dashboard'>
        <TopBar />
        <SideBar />
        <div className="dashboard-content">
          {this.props.children}
        </div>
        
      </div>
    )
  }
}
