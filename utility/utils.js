function obj_is_empty(obj) {
    /*
     *Returns true if the obj is empty else
     *Returns false
    */
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

function get_array_without_value(arr, value) {
    /*
     *Returns an arrays that is without the given value 
    */
  let return_value = [];
  for (let i of arr) {
    if (!_.isEqual(i, value)) {
      return_value.push(i);
    }
  }
  return return_value;
}
function get_obj_slice(obj, limit) {
    /*
    *Returns limit(number) of items in obj 
    */
  let return_list = [];
  let keys = Object.keys(obj);
  for (let i = 0; i < limit; i++) {
    return_list.push(obj[keys[i]]);
  }
  return return_list;
}
module.exports = { get_array_without_value, obj_is_empty, get_obj_slice };