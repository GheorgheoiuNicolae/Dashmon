import React, { Component } from 'react';
import { connect } from 'react-redux';

import sprites from '../../../assets/sprites.svg';
import * as action from '../../../actions/imageUpload';

import LinearProgress from 'material-ui/LinearProgress';

@connect((store) => {
  return {
    store: store.imageUpload
  }
})
export default class ImageUpload extends Component {
  componentWillMount(){
    this.setState({
      images: []
    })
  }
  handleFileInputChange(e){
    let image = e.target.files[0];
    if(image){
      this.props.dispatch(action.uploadImage(this.props.uid, image));
    }
  }

  componentWillUnmount(){
    // delete the uploaded images 
    console.log('componentWillUnmount - clear props');
    if(this.props.store.images.length) {
      for(let i = 0; i < this.props.store.images.length; i++){
        this.props.dispatch(action.deleteImage(this.props.uid, this.props.store.images[i]));
      }
    }
  }

  componentWillReceiveProps(newProps){
    if(newProps.store.images !== this.state.images){
      console.log('asdads', this.props.store.images, this.state.images)
      this.setState({
        images: this.props.store.images
      }, function(){
        // send the images to the component above
        this.props.getImages(this.props.store.images);
      });
    }
  }

  render () {
    return (
      <div className="images">
        <div className="image-upload">
          <input type="file" onChange={this.handleFileInputChange.bind(this)} />
        </div>

        <div className="entry-images">
          {this.props.store.images.map(function(image, index){
            return <img key={index} className="thumbnail" src={image.url} alt="image"/>
          })}
          <span>images</span>
        </div>
      </div>
    )
  }
}
