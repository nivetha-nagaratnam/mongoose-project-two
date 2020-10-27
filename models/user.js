var mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const userSchema = new Schema({ 
    name: String,
    email: String,
    googleId: String,
  }, {
    timestamps: true
  }); 

module.exports = new mongoose.model('User', userSchema); 