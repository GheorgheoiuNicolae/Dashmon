import React, { Component } from 'react';
import * as action from '../../../actions/user';
import { connect } from 'react-redux';
import sprites from '../../../assets/sprites.svg';
import logo from '../../../assets/logo.png';

import Avatar from 'material-ui/Avatar';
import userAvatar from '../../../assets/user-avatar.png';
import FlatButton from 'material-ui/FlatButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import AddEntry from '../addEntry/AddEntry';

@connect((store) => {
  return {
    store: store
  }
})
export default class TopBar extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      style: {
        padding: '0 20px'
      }
    };
  }

  logoutUser(){
    this.props.dispatch(action.logout());
  }

  handleTouchTap = (event) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  
  render (){
    return (
      <div className='TopBar'>
        <div className="topbar-link sort-entries-wrap">
          <FlatButton
            className="sort-entries-button"
            children={
              <div className="sort-entries">
                <svg className="icon icon-filter_list"><use xlinkHref={`${sprites}#icon-filter_list`}></use></svg>
                <span>Sort entries</span>
              </div>
            }
          />
        </div>
        <div className="topbar-link add-entry-wrap">
          <AddEntry />
        </div>
        
        <div className="brand">
          <img src={logo} className="logo" alt="logo" />
        </div>

        <div className="user-account-dropdown">
          <FlatButton
            onTouchTap={this.handleTouchTap}
            children={
              <div className="username">
                <div className="avatar">
                  <Avatar src={`${userAvatar}`} size={35} />
                </div>
                <div className="user">
                  {this.props.store.user.displayName ? this.props.store.user.displayName : this.props.store.user.email}
                </div>
              </div>
            }
          />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
            animation={PopoverAnimationVertical}
          >
            <Menu>
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help &amp; feedback" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Sign out" onClick={this.logoutUser.bind(this)} />
            </Menu>
          </Popover>
        </div>

        
      </div>
    )
  }
}
