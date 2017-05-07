import { addEntryToStore } from '../helpers/utils';
import _ from 'lodash';

export default function reducer(state = {
  entries_initial_load: true,
  list: [],
}, action) {
  switch (action.type) {
    case 'UPDATE_ENTRY_LIST': {
      const list = addEntryToStore(action.payload, state.list);
      return { ...state, list, entries_initial_load: false }
    }
    case 'EDIT_ENTRY': {
      let listIdx;
      let entryIdx;

      for (let i = 0; i < state.list.length; i++) {
        let editedEntry = _.find(state.list[i].entries, {
          id: action.payload.id
        });

        if (editedEntry) {
          listIdx = state.list.indexOf(state.list[i])
          entryIdx = state.list[listIdx].entries.indexOf(editedEntry);
        }

        break
      }

      state.list[listIdx].entries[entryIdx] = action.payload;
      return { ...state }
    }
    case 'REMOVE_ENTRY': {
      let listIdx;
      let entryIdx;

      for (let i = 0; i < state.list.length; i++) {
        let entryToRemove = _.find(state.list[i].entries, {
          id: action.payload.id
        });

        if (entryToRemove) {
          listIdx = state.list.indexOf(state.list[i])
          entryIdx = state.list[listIdx].entries.indexOf(entryToRemove);
        }

        break
      }

      state.list[listIdx].entries.splice(entryIdx, 1);
      return { ...state }
    }
    default: {
      return { ...state }
    }
  }
}