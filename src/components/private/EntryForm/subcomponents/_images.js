import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as action from '../../../../actions/imageUpload';

@connect((store) => {
  return {
    store: store.imageUpload
  }
})
export default class EntryImages extends Component {
  componentWillMount(){
    console.log('_images', this)
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

  getImageFromFirebase(filename){
    console.log('getImageFromFirebase: ', filename)
    // this.props.dispatch(action.uploadImage(this.props.uid, filename));
  }

  componentWillUnmount(){
    // delete the uploaded images 
    if(this.props.store.images.length) {
      for(let i = 0; i < this.props.store.images.length; i++){
        this.props.dispatch(action.deleteImage(this.props.uid, this.props.store.images[i]));
      }
    }
  }

  componentWillReceiveProps(newProps){
    this.props.updateEntryImageList(newProps.store.images);
  }

  render () {
    return (
      <div className="images">
        <div className="image-upload">
          <input type="file" onChange={this.handleFileInputChange.bind(this)} />
        </div>

        <div className="entry-images">
          {this.props.store.images.map(function(image, index){
            return <img key={index} className="thumbnail" src={image.url} alt="asd asd"/>
          })}

          {this.state.images.map(function(image, index){
            return <img key={index} className="thumbnail" src={image.url} alt="iasd asdmage"/>
          })}
          <span>images</span>
        </div>
      </div>
    )
  }
}
