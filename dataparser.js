// take river data and return array of arrays, each inner array is data points for one river
export function buildRiverArrays(data) {
  // get a list of unique river names
  var riverNames = getRiverNames(data);

  // create separate arrays for each river's data points and append those arrays to riverData
  // so we can plot each river's data points as a single line
  // d is an array representing data for one river for one year, the river name is at index 8 
  var riverData = riverNames.map( (name) => {
    return data.filter( (river) => { return river[8] == name; } );
  });
  
  return riverData;
}

function getRiverNames(data) {

  // get a list of unique river names
  var riverNames = data.map( (d) => {return d[8];} );
  riverNames = Array.from(new Set(riverNames));

  return riverNames;
}
