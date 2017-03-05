import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as action from '../../../../actions/entryImages';
import sprites from '../../../../assets/sprites.svg';

@connect((store) => {
  return {
    store: store.entryImages
  }
})
export default class EntryImages extends Component {
  componentWillMount(){
    // component will receive 'images' prop if an entry is beeing edited
    if(this.props.images){
      // download and set current entry's images to store
      for(let i = 0; i < this.props.images.length; i++){
        this.props.dispatch(action.getImageFromFirebase(this.props.uid, this.props.images[i].fileName));
      }
      this.setState({
        editMode: true
      })
    }
  }

  handleFileInputChange(e){
    let image = e.target.files[0];
    if(image){
      this.props.dispatch(action.uploadImage(this.props.uid, image));
    }
  }

  componentWillUnmount(){
    // delete the uploaded images if the user is not in edit mode
    if(this.props.store.images.length && this.state.editMode !== true) {
      for(let i = 0; i < this.props.store.images.length; i++){
        this.props.dispatch(action.deleteImage(this.props.uid, this.props.store.images[i]));
      }
    } else {
      // remove the images from store as the user was editing an entry
      this.props.dispatch(action.clearImagesFromStore());
    }
  }

  componentWillReceiveProps(newProps){
    this.props.updateEntryImageList(newProps.store.images);
  }

  deleteImage = (image) => {
    this.props.dispatch(action.deleteImage(this.props.uid, this.props.entry, image));
  }

  render () {
    return (
      <div className="images">
        <div className="image-upload">
          <input type="file" onChange={this.handleFileInputChange.bind(this)} />
        </div>

        <div className="entry-images">
          {this.props.store.images.map((image, index) => {
            return (
              <div className="image-box" key={index}>
                <div className="thumbnail">
                  <img src={image.url} alt="Entry gallery" />
                </div>
                <span className="delete-image" onClick={()=> this.deleteImage(image)} >
                  <svg className="icon icon-close"><use xlinkHref={`${sprites}#icon-close`}></use></svg>
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
