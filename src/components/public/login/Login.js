import React, { Component } from 'react'
import { connect } from 'react-redux';

import * as action from '../../../actions/user';
import { firebaseAuth } from '../../../config/constants';
import { checkAuthState } from '../../../actions/user';
import { Link } from 'react-router';

@connect((store) => {
  return {
    store: store
  }
})
export default class Login extends Component {
  componentWillMount(){
    let observer = (user) => {
      this.props.dispatch(checkAuthState(user));
      unsubscribe();
    }
    var unsubscribe = firebaseAuth().onAuthStateChanged(observer);
  }


  handleSubmit = (e) => {
    e.preventDefault()
    this.props.dispatch(action.login(this.email.value, this.pw.value));
  }

  render () {
    return (
      <div className="login-box">
        <h1> Login </h1>
        
        <form onSubmit={this.handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
          </div>
          <div className="controls">
            <button type="submit">Login</button>

            <div className="section">
              <p>Or you can 
                <Link to="/register" activeClassName="active">register</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

