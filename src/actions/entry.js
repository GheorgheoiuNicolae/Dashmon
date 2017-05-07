import { ref } from '../config/constants';
import { matchLabelsToEntry } from '../helpers/utils';

export function getEntries(uid, labels) {
  return dispatch => {
    let entriesRef = ref.child(`entries/${uid}`);
    entriesRef.on('child_added', (snap) => {
      console.log('snap', snap.val())
      let entryWithLabels = matchLabelsToEntry(snap.val(), labels);
      dispatch({
        type: 'UPDATE_ENTRY_LIST',
        payload: entryWithLabels
      })
    })
  }
}

export function create300Entries(data, uid) {
  console.log('create300Entries: ', data)
  for(let i = 0; i < 30; i++){
    let entriesRef = ref.child(`entries/${uid}`).push();
    const pushkey = entriesRef.getKey()
    entriesRef.set({
      ...data,
      id: pushkey
    })
  }
}

export function saveEntry(data, uid) {
  console.log('action - saveEntry: ', data)
  return dispatch => {
    let entriesRef = ref.child(`entries/${uid}`).push();
    const pushkey = entriesRef.getKey()
    entriesRef.set({
      ...data,
      id: pushkey
    }).then(() => {
      dispatch({
        type: "SAVE_ENTRY",
        payload: data
      });
    });
  }
}

export function removeEntry(uid, entry) {
  console.log('entry: ', entry)
  return dispatch => {
    let entryRef = ref.child(`entries/${uid}/${entry.id}`);
    entryRef.remove().then((res) => {
      dispatch({
        type: 'REMOVE_ENTRY',
        payload: entry
      });
      console.log('firebase removed the entry')
    }).catch(() => {
      console.log('the entry was not removed for some reason...')
    })
  }
}

export function editEntry(uid, newData) {
  newData.date = newData.date.toString();
  return dispatch => {
    let entryRef = ref.child(`entries/${uid}/${newData.id}`);

    entryRef.set({ ...newData }).then(() => {
      dispatch({
        type: 'EDIT_ENTRY',
        payload: newData
      });
    }).catch((e) => {
      console.log('the entry was not edited for some reason...', e)
    })
  }
}

export function setCurrentEntry(data) {
  return {
    type: 'ADD_ENTRY_DATA',
    payload: data
  }
}