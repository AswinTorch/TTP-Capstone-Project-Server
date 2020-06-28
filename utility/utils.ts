import * as _ from 'lodash';
export function obj_is_empty(obj: object): boolean {
    /*
     *Returns true if the obj is empty else
     *Returns false
    */
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export function get_array_without_value(arr:Array<any>, value:any) : Array<any> {
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
export function get_obj_slice(obj:object, limit:number):Array<any> {
    /*
    *Returns limit(number) of items in obj 
    */
  let return_list : Array<any> = [];
  let keys : any = Object.keys(obj);
  for (let i = 0; i < limit; i++) {
    return_list.push(obj[keys[i]]);
  }
  return return_list;
}
