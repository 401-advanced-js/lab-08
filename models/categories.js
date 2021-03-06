'use strict';

const uuid = require('uuid/v4');

const schema = {
  name: {required:true},
  id: {required:true},
};

class Categories {

  /**
 * Instantiates the 'database'
 * @constructor
 */
  constructor() {
    this.database = [];
  }
  /**
 * The get request method for our API
 * @param {*} _id 
 * @returns database entry or database entries
 */
  get(_id) {
    return _id
      ? this.database.filter(record => record.id === _id)[0]
      : this.database;
  }
  /**
   * Posts to db
   * @param {*} record
   * @returns record, or null 
   */
  post(record) {
    record.id = uuid();
    if(this.validate(record)){
      this.database.push(record);
      return record;
    }
    else{
      return null;
    }

  }
  /**
 * updates an existing record
 * @param {*} _id 
 * @param {*} record 
 */
  put(_id, record) {
    if(this.validate(record)){
      this.database.forEach(entry => {
        if(_id === entry.id){
          entry = record;
        }
      });
    }
    else{
      return null;
    }
  }
  /**
 * deletes a specified entry
 * @param {*} _id 
 */
  delete(_id) {
    let loop = this.database.length;
    for(let i = 0; i < loop; i++){
      if(this.database[i].id === _id){
        this.database.splice(i,1);
      }
    }
    return {};
  }
  
  /**
   * Validates the input record if it fits schema
   * @param {} entry
   * @returns boolean
   */
  validate(entry) {  //Taken from the one and only madman's code, John Cokos

    let valid = true;
    let record = {};

    Object.keys(schema).forEach( field => {
      if ( schema[field].required ) {
        if (entry[field]) {
          record[field] = entry[field];
        } else {
          valid = false;
        }
      }
      else {
        record[field] = entry[field];
      }
    });

    return valid ? record : undefined;

  }
}



module.exports = Categories;
