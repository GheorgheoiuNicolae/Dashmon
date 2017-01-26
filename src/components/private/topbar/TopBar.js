import React, { Component } from 'react';
import { Link } from 'react-router';
import * as action from '../../../actions/user';
import * as addEntryActions from '../../../actions/addEntry';
import { connect } from 'react-redux';
import sprites from '../../../assets/sprites.svg';
import logo from '../../../assets/logo.png';
import userAvatar from '../../../assets/user-avatar.png';

@connect((store) => {
  return {
    store: store
  }
})
export default class TopBar extends Component {  
  logoutUser(){
    this.props.dispatch(action.logout());
  }

  showAddEntryForm(){
    this.props.dispatch(addEntryActions.showAddEntry());
  }
  
  render (){
    return (
      <div className='TopBar'>
        <div className="topbar-link menu-toggler">
          <svg className="icon icon-sort"><use xlinkHref={`${sprites}#icon-sort`}></use></svg>
        </div>
        <div className="topbar-link sort-entries">
          <svg className="icon icon-filter_list"><use xlinkHref={`${sprites}#icon-filter_list`}></use></svg>
          <span>Sort entries</span>
        </div>
        <div className="topbar-link add-entry" onClick={this.showAddEntryForm.bind(this)}>
          <svg className="icon icon-add"><use xlinkHref={`${sprites}#icon-add`}></use></svg>
          <span>Add entry</span>
        </div>
        
        <div className="brand">
          <img src={logo} className="logo" alt="logo" />
        </div>
        
        <div className="account-dropdown">
          <div className="avatar">
            <img src={userAvatar} alt="user avatar" />
          </div>
          <span className="username">{`${this.props.store.user.displayName ? this.props.store.user.displayName : this.props.store.user.email}`}</span>
          <button onClick={this.logoutUser.bind(this)}> Logout </button>
        </div>
      </div>
    )
  }
}
