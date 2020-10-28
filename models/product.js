const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: String,
  rating: {
    type: Number,
    enum: [0, 1, 2, 3, 4 ,5],
  }
}, {
  timestamps: true
});

const userSchema = new Schema({ 
  name: String,
  email: String,
  googleId: String,
}, {
  timestamps: true
}); 

const likeSchema = new Schema({ 
  likes_count: Number,
}, {
  timestamps: true
}); 

const productSchema = new Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
    min: 0,
  },
  rating: {
    type: Number,
    enum: [0, 1, 2, 3, 4 ,5],
  },
  description: {
    type: String,
  },
  brand: {
    type: String,
  },
  colour: {
    type: String,
  },
  review:[reviewSchema],
  img: [{type: Schema.Types.ObjectId, ref: 'Image'}],
  imgs: [{type: Schema.Types.ObjectId, ref: 'Dupe'}],
},{
    timestamps: true
});


// Compile the schema into a model and export it
module.exports = mongoose.model('Product', productSchema);

