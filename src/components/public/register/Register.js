import React, { Component } from 'react'
import { connect } from 'react-redux';

import * as action from '../../../actions/user';


@connect((store) => {
  return {
    store: store
  }
})
export default class Register extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.dispatch(action.registerUser(this.email.value, this.pw.value));
  }
  
  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    )
  }
}