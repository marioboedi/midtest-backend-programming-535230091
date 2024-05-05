const joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const { kedaluwarsa } = require('../../../models/products-schema');
const joiPassword = joi.extend(joiPasswordExtendCore);


module.exports = {
  createProduct: {
    body: {
      merek: joi.string().min(1).max(100).required().label('Merek'),
      jenis: joi.string().min(1).max(100).required().label('Jenis'),
      stok: joi.number().min(1).max(10000000000).required().label('Stok'),
      harga: joi.number().min(1).max(1000000000).required().label('Harga'),
      kedaluwarsa: joi.string().min(1).max(100).required().label('Kedaluwarsa'),
      deskripsi: joi.string().min(1).max(100).required().label('Deskripsi'),
      
    },
  },

  updateProduct: {
    body: {
      merek: joi.string().min(1).max(100).required().label('Merek'),
      jenis: joi.string().min(1).max(100).required().label('Jenis'),
      stok: joi.number().min(1).max(10000000000).required().label('Stok'),
      harga: joi.number().min(1).max(1000000000).required().label('Harga'),
      kedaluwarsa: joi.string().min(1).max(100).required().label('Kedaluwarsa'),
      deskripsi: joi.string().min(1).max(100).required().label('Deskripsi'),
    },
  },

};
