// https://stackoverflow.com/a/12189963/1597360
function insertAt(array, index) {
  var arrayToInsert = Array.prototype.splice.apply(arguments, [2]);
  return insertArrayAt(array, index, arrayToInsert);
}

function insertArrayAt(array, index, arrayToInsert) {
  Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert));
  return array;
}

module.exports = {
  insertAt,
  insertArrayAt
};
