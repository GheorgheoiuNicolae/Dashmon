import groupArray from 'group-array';

export function parseObject(obj){
  var arr = []
  for (let key in obj) {
    if( obj.hasOwnProperty(key) ) {
      console.log('key: ', key, obj[key]);
      obj[key].id = key
      arr.push(obj[key])
    }
  }
  return arr
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
  return splitEntriesByDay(entries)
}

function splitEntriesByDay(entries){
  for(let i = 0; i < entries.length; i++){
    let date = new Date(entries[i].date);
    let YMD = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    // add formated date to sort the entries easier
    entries[i].formatedDate = YMD;
  }

  let grouped = groupArray(entries, 'formatedDate');

  var arr = [];
  for (let key in grouped) {
    if( grouped.hasOwnProperty(key) ) {
      let newEntries = [...grouped[key]];

      arr.push({
        date: new Date(key),
        entries: newEntries
      });
      newEntries = [];
    }
  }

  return arr
}