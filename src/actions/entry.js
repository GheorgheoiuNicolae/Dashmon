import { ref } from '../config/constants';
import { parseObject, matchLabelsToEntries } from '../helpers/utils';

export function getEntries(uid, labels){
    return dispatch => {
        let entriesRef = ref.child(`entries/${uid}`);
        entriesRef.on('value', (snap) => {
            let entries = parseObject(snap.val());
            let parsedEntries = matchLabelsToEntries(entries, labels);
            dispatch({
                type: 'UPDATE_ENTRY_LIST',
                payload: parsedEntries
            })
        })
    }
}

export function saveEntry(data, uid){
    return dispatch => {
        let entriesRef = ref.child(`entries/${uid}`).push();
        console.log('data: ', data);
        entriesRef.set({
          title: data.title,
          description: data.description,
          labels: data.labels || [],
          images: data.images || [],
          date: (data.date).toString()
        }).then( () => {
            dispatch({
                type: "SAVE_ENTRY",
                payload: data
            });
        });
    }
}

export function removeEntry(uid, entryId){
    return dispatch => {
        let entryRef = ref.child(`entries/${uid}/${entryId}`);
        entryRef.remove().then( (res) => {
            dispatch({
                type: 'REMOVE_ENTRY',
                payload: null
            });
        }).catch(() => {
            console.log('the entry was not removed for some reason...')
        })
    }
}

export function editEntry(uid, newData, image){
    console.log('new entry data: ', newData);
    return dispatch => {
        let entryRef = ref.child(`entries/${uid}/${newData.id}`);
        console.log('newData: ', newData, image);

        entryRef.set({...newData}).then( (res) => {
            console.log('entry was updated', newData);
            // dispatch({
            //     type: 'REMOVE_ENTRY',
            //     payload: null
            // });
        }).catch(() => {
            console.log('the entry was not removed for some reason...')
        })
    }
}