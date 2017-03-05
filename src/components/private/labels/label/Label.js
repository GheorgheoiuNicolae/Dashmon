import React, { Component } from 'react';
import LabelColor from '../LabelColor/LabelColor';
import * as action from '../../../../actions/label';

export default class Label extends Component {
  componentWillMount(){
    this.setState({
      isOnHover: false,
      color: ''
    })
  }

  removeLabel(){
    this.props.dispatch(action.removeLabel(this.props.uid, this.props.data.id));
  }

  enableHover(){
    this.setState({
      isOnHover: true
    })
  }

  disableHover(){
    this.setState({
      isOnHover: false
    })
  };
  setColor(color){
    this.setState({color: color})
  }

  render () {
    let classes = this.state.isOnHover ? 'label-colors show' : 'label-colors hide';

    return (
      <div className='Label' 
        onMouseEnter={this.enableHover.bind(this)}
        onMouseLeave={this.disableHover.bind(this)}
        >
        <div className="colorPicked" style={{backgroundColor: `${this.state.color.code}`}}></div>
        <div className="label-title">{this.props.data.title}</div>
        <div className={classes}>
          <LabelColor getColor={this.setColor.bind(this)}  />
        </div>
        <div className="remove" onClick={this.removeLabel.bind(this)}>X</div>
      </div>
    )
  }
}