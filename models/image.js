const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  img: {
      data: Buffer, 
      contentType: String 
    },
}); 

// Compile the schema into a model and export it
module.exports = mongoose.model('Image', imageSchema);