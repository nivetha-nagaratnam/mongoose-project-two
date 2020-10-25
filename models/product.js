const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

// const imageSchema = new Schema({
//   img: {
//       data: Buffer, 
//       contentType: String 
//     },
// }); 

const reviewSchema = new Schema({
  content: String,
  rating: {
    type: Number,
    enum: [0, 1, 2, 3, 4 ,5],
  }
}, {
  timestamps: true
});

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true
  },
  rating: {
    type: Number,
    enum: [0, 1, 2, 3, 4 ,5],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  colour: {
    type: String,
  },
  review:[reviewSchema],
  // img:[imageSchema],
  dupe: {
    type: String,
    required: true
  },
},{
    timestamps: true
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Product', productSchema);

