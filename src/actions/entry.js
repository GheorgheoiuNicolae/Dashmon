import { ref } from '../config/constants';
import { parseObject, matchLabelsToEntries } from '../helpers/utils';

export function getEntries(uid, labels) {
  return dispatch => {
    let entriesRef = ref.child(`entries/${uid}`);
    entriesRef.on('child_added', (snap) => {
      console.log('get entries snap', snap.val());
      // let entries = parseObject(snap.val());
      let parsedEntries = matchLabelsToEntries(snap.val(), labels);
      dispatch({
        type: 'UPDATE_ENTRY_LIST',
        payload: parsedEntries
      })
    })
  }
}

export function create1000Entries(data, uid) {
  console.log('action - create1000Entries: ', data)
  
  for(let i = 0; i < 1000; i++){
    let entriesRef = ref.child(`entries/${uid}`).push();
    const pushkey = entriesRef.getKey()
    console.log('entriesRef', entriesRef.getKey());
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
    console.log('entriesRef', entriesRef.getKey());
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

export function removeEntry(uid, entryId) {
  return dispatch => {
    let entryRef = ref.child(`entries/${uid}/${entryId}`);
    entryRef.remove().then((res) => {
      dispatch({
        type: 'REMOVE_ENTRY',
        payload: null
      });
    }).catch(() => {
      console.log('the entry was not removed for some reason...')
    })
  }
}

export function editEntry(uid, newData) {
  newData.date = newData.date.toString();
  // formatted date is a property set in the FE to order entries
  // remove it before saving in the db
  delete newData.formatedDate

  return dispatch => {
    let entryRef = ref.child(`entries/${uid}/${newData.id}`);
    console.log('editEntry: ', newData);

    entryRef.set({ ...newData }).then((res) => {
    }).catch(() => {
      console.log('the entry was not edited for some reason...')
    })
  }
}

export function setCurrentEntry(data) {
  return {
    type: 'ADD_ENTRY_DATA',
    payload: data
  }
}