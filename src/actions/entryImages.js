import { storage } from '../config/constants';

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

      function complete(res){
          dispatch({
              type: 'UPLOAD_COMPLETE',
              payload: ''
            });
          imageRef.getDownloadURL().then(function(url){
            console.log('action - image url: ', url)
            dispatch({
              type: 'UPDATE_IMAGE_URL',
              payload: url,
              imageName: image.name
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

export function deleteImage(uid, image){
  let imageRef = storage.ref().child(`images/${uid}/${image.fileName}`);
  return dispatch => {
    imageRef.delete().then(function() {
      // File deleted successfully
      dispatch({
        type: "REMOVE_IMAGE_FROM_STORE",
        payload: image
      })
    }).catch(function(error) {
      console.log('error deleting image');
    });
  }
}


export function getImageFromFirebase(uid, filename){
  let imageRef = storage.ref().child(`images/${uid}/${filename}`);
  return dispatch => {
    imageRef.getDownloadURL().then(function(url){
      console.log('got url: ', url)
      dispatch({
        type: 'UPDATE_IMAGE_URL',
        payload: url
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