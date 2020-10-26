var mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const dupeSchema = new Schema({ 
    name: {
        type:String,
        required: true,
    },
    price: {
        type:Number,
        required: true,
    },
    imgs: {
        data: Buffer, 
        contentType: String 
      },
}, {
    timestamps: true
}); 

module.exports = new mongoose.model('Dupe', dupeSchema); 