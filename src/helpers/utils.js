// import groupArray from 'group-array';
import _ from 'lodash';

export function parseObject(obj){
  var arr = []
  for (let key in obj) {
    if( obj.hasOwnProperty(key) ) {
      obj[key].id = key
      arr.push(obj[key])
    }
  }
  return arr
}

export function matchLabelsToEntry(entry, labels){
  if (entry.labels) {
    let entryLabels = [...entry.labels];
    entry.labels = []
    for(let j = 0; j < entryLabels.length; j++){
      for(let z = 0; z < labels.length; z++){
        if(entryLabels[j] === labels[z].id){
          entry.labels.push(labels[z])
        }
      }
    }
  }
  return entry;
}

export function matchLabelsToEntries(entries, labels){
  for(let i = 0; i < entries.length; i++){
    if (entries[i].labels) {
      let entryLabels = [...entries[i].labels];
      entries[i].labels = []
      for(let j = 0; j < entryLabels.length; j++){
        for(let z = 0; z < labels.length; z++){
          if(entryLabels[j] === labels[z].id){
            entries[i].labels.push(labels[z])
          }
        }
      }
    }
  }
  console.log('matchLabelsToEntries: ', entries);
  // return splitEntriesByDay(entries)
}

export function addEntryToStore(entry, entryList){
  const date = new Date(entry.date);
  const entryFormatedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  const YMD = new Date(date.getFullYear(), date.getMonth()+1, date.getDate());

  const day = _.find(entryList, {
    date: YMD,
  });

  if(day){
    day.entries.push(entry)
  } else {
    entryList.push({
      date: YMD,
      entries: [entry]
    });
  }

  console.log('entryList: ', entryList);

  return entryList
}