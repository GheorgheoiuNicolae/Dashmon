import { storage } from '../config/constants';
import * as entryActions from './entry.js';

console.log('entryActions: ', entryActions);

export function uploadImage(uid, image){
  let imageRef = storage.ref().child(`images/${uid}/${image.name}`);
  let task = imageRef.put(image);
  return dispatch => {
    task.on('state_changed', 
      function progress (snap){
          let uploadProgress = (snap.bytesTransferred / snap.totalBytes) * 100;
          dispatch({
              type: 'UPLOAD_PROGRESS',
              payload: uploadProgress
          })
      }, 

      function error(err){
          dispatch({
              type: 'UPLOAD_ERROR',
              payload: err
          })
      },

      function complete(){
          dispatch({
              type: 'UPLOAD_COMPLETE',
              payload: ''
            });
          imageRef.getDownloadURL().then(function(url){
            dispatch({
              type: 'UPDATE_IMAGE_URL',
              payload: url,
              fileName: image.name
            });
          }).catch(function(error) {
            dispatch({
              type: 'DOWNLOAD_IMAGE_ERROR',
              payload: error
            });
          });
      }
    )
  }
}

export function deleteImage(uid, entry, image){
  // the user deleted an image from an existing entry
  if(entry){
    // find entry to remove
    // for(let i = 0; i < entry.images.length; i++){
    //   if(entry.images[i].fileName === image.fileName){
    //     let idx = entry.images.indexOf(entry.images[i]);
    //     entry.images.splice(idx, 1);
    //   }
    // }
    // entryActions.editEntry(uid, entry);
    return dispatch => {
      dispatch({
        type: "REMOVE_IMAGE_FROM_STORE_AND_ENTRY",
        payload: {uid: uid, entry: entry, image: image}
      });
    }
  }
  // the user deleted an image from 'Add new entry'
  // let imageRef = storage.ref().child(`images/${uid}/${image.fileName}`);
  // return dispatch => {
  //   imageRef.delete().then(function() {
  //     // File deleted successfully
  //     dispatch({
  //       type: "REMOVE_IMAGE_FROM_STORE",
  //       payload: image
  //     })
  //   }).catch(function(error) {
  //     console.log('error deleting image');
  //   });
  // }
}


export function getImageFromFirebase(uid, filename){
  let imageRef = storage.ref().child(`images/${uid}/${filename}`);
  return dispatch => {
    imageRef.getDownloadURL().then(function(url){
      dispatch({
        type: 'UPDATE_IMAGE_URL',
        payload: url,
        fileName: filename
      });
    }).catch(function(error) {
      console.log('cought error: ', error)
      dispatch({
        type: 'DOWNLOAD_IMAGE_ERROR',
        payload: error
      });
    });
  }
}

export function clearImagesFromStore(){
  return {
    type: 'CLEAR_IMAGES_FROM_STORE',
    payload: null
  }
}