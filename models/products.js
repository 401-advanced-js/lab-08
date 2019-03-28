'use strict';

const uuid = require('uuid/v4');

const schema = {
  
};

class Products {

  constructor() {
  }

  get(id) {
    let request = id? {id}:{};
    return schema.find(request);
  }
  
  post(entry) {
    return new schema(entry).save();
  }

  put(id, entry) {
    return schema.findByIdAndUpdate(id, entry, {new:true});
  }

  delete(id) {
    return schema.findByIdAndDelete(id);
  }

}

module.exports = Products;
