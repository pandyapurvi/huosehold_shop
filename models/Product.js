import mongoose from 'mongoose';
import shortid from 'shortid'; //This will generate default value

const { String, Number } = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sku: {
    type: String,
    unique: true,
    default: shortid.generate()
  },
  description: {
    type: String,
    required: true
  },
  mediaUrl: {
    type: String,
    required: true
  }
})


/*As we are using serverless configuration, checking if model we want is already 
existed then use it else create new model from scratch.*/
export default mongoose.models.Product || mongoose.model('Product', ProductSchema)