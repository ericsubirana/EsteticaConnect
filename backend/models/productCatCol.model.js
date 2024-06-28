const mongoose = require('mongoose');

const productCatColSchema = new mongoose.Schema(
  {
    collections: {
      type: [String], 
      default: [],    
      validate: {
        validator: function (v) {
          return Array.isArray(v); 
        },
        message: (props) => `${props.value} is not an array!`
      }
    },
    categories: {
      type: [String],
      default: [],    
      validate: {
        validator: function (v) {
          return Array.isArray(v); 
        },
        message: (props) => `${props.value} is not an array!`
      }
    }
  },
  {
    timestamps: true,
    collection: 'productsCatCol'
  }
);

module.exports = mongoose.model('ProductsCatCol', productCatColSchema);
