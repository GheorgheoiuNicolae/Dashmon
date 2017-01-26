import { ref } from '../config/constants';
import { parseObject } from '../helpers/utils';

export function getLabels(uid){
    return dispatch => {
        let labelsRef = ref.child(`labels/${uid}`);
        labelsRef.on('value', (snap) => {
            let data = parseObject(snap.val());
            dispatch({
                type: 'UPDATE_LABELS_LIST',
                payload: data
            });
        })
    }
}

export function saveLabel(data, uid){
    return dispatch => {
        let labelsRef = ref.child(`labels/${uid}`).push();
        labelsRef.set({
          title: data.title,
          color: data.color,
          date: (new Date()).toString()
        }).then( () => {
            dispatch({
                type: "SAVE_LABEL",
                payload: data
            });
        });
    }
}

export function removeLabel(uid, labelId){
    return dispatch => {
         let labelRef = ref.child(`labels/${uid}/${labelId}`);
        labelRef.remove().then( (res) => {
            dispatch({
                type: 'REMOVE_LABEL',
                payload: null
            });
        }).catch(() => {
            console.log('the label was not removed for some reason...')
        })
    }
}