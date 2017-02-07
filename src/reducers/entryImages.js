export default function reducer(state={
    isUploading: false,
    uploadProgress: null,
    uploadError: null,
    downloadError: null,
    images: []
}, action){
  switch(action.type){
    case 'UPLOAD_PROGRESS': {
        return {...state, 
          isUploading: true, 
          uploadProgress: action.payload,
          uploadError: null,
          downloadError: null
        }
    }

    case 'UPLOAD_ERROR': {
        return {...state, 
          uploadProgress: null, 
          isUploading: false, 
          uploadError: action.payload,
          downloadError: null
        }    
    }

    case 'UPLOAD_COMPLETE': {
      return {...state, 
        uploadProgress: null, 
        isUploading: false, 
        uploadError: false,
        downloadError: null
      }
    }

    case 'UPDATE_IMAGE_URL': {
      let images = state.images;
      images.push({url: action.payload, fileName: action.imageName})
      return {...state, 
        uploadProgress: null, 
        isUploading: false,
        uploadError: false,
        downloadError: null,
        images: images
      }    
    }

    case 'DOWNLOAD_IMAGE_ERROR': {
      return {...state, 
        uploadProgress: null, 
        isUploading: false, 
        uploadError: false, 
        downloadError: action.payload
      }
    }

    case 'REMOVE_IMAGE_FROM_STORE': {
      let images = state.images;
      let idx = images.indexOf(action.payload);
      images.splice(idx, 1);

      return {...state,
        images: images
      }
    }

    case 'CLEAR_IMAGES_FROM_STORE': {
      return {...state,
        images: []
      }
    }

    default: {
        return {...state}
    }
  }
}