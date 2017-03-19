import React, { Component } from 'react';
// import * as action from '../../../actions/user';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import sprites from '../../../assets/sprites.svg';
// import logo from '../../../assets/logo.png';

// import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';


@connect((store) => {
  return {
    store: store
  }
})
export default class SideBar extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      menuExpanded: false
    };
  }
  
  toggleMenu = () => {
      const currentState = this.state.menuExpanded;
      this.setState({
          menuExpanded: !currentState
      })
  }

  render (){
    return (
      <div className={`SideBar ${this.state.menuExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="sidebar-link menu-toggler">
          <FlatButton
            className="menu-toggler-button"
            style={{maxWidth: '100%', minWidth: 'initial', width: '100%', height: '50px'}}
            children={
              <div className="menu-toggler" onClick={this.toggleMenu}>
              {this.state.menuExpanded ? (<svg className="icon icon-keyboard_arrow_left"><use xlinkHref={`${sprites}#icon-keyboard_arrow_left`}></use></svg>) : (<svg className="icon icon-sort"><use xlinkHref={`${sprites}#icon-sort`}></use></svg>)}
                
              </div>
            }
          />
        </div>
        <div className="sidebar-link">
          <FlatButton
            className="link-dashboard"
            style={{maxWidth: '100%', minWidth: 'initial', width: '100%', height: '50px'}}
            children={
                <Link to='/dashboard' key={Math.floor(Math.random() * (1 - 1000 + 1))}>
                    <div className="link-wrap link-dashboard" key={Math.floor(Math.random() * (1 - 1000 + 1))}>
                        <svg className="icon icon-dashboard"><use xlinkHref={`${sprites}#icon-dashboard`}></use></svg>
                        <span>Entry List</span>
                    </div>
                </Link>
            }
          />
        </div>
        <div className="sidebar-link">
          <FlatButton
            className="link-labels"
            style={{maxWidth: '100%', minWidth: 'initial', width: '100%', height: '50px'}}
            children={
                <Link to='/labels' key={Math.floor(Math.random() * (1 - 1000 + 1))}>
                    <div className="link-wrap link-labels" key={Math.floor(Math.random() * (1 - 1000 + 1))}>
                        <svg className="icon icon-turned_in"><use xlinkHref={`${sprites}#icon-turned_in`}></use></svg>
                        <span>Labels</span>
                    </div>
                </Link>
            }
          />
        </div>
      </div>
    )
  }
}
