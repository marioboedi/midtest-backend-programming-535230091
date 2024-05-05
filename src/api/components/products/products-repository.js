const { Product } = require('../../../models');

// Menampilkan semua produk
async function getProducts() {
    return Product.find({});
  }

// Menampilkan produk berdasarkan id
async function getProduct(id) {
  return Product.findById(id);
}


/**
 * Create new product
 * @param {string} merek - Merek
 * @param {string} jenis - Jenis
 * @param {string} stok - Stok
 * @param {string} harga - Harga
 * @param {string} kedaluwarsa - Kedaluwarsa
 * @param {string} deskripsi - Deskripsi
 * @returns {Promise}
 */

// Menginput produk
async function createProduct(merek, jenis, stok, harga, kedaluwarsa, deskripsi ) {
  return Product.create({
    merek, 
    jenis, 
    stok, 
    harga, 
    kedaluwarsa, 
    deskripsi,
  });
}


/**
 * Update product
 * @param {string} id - User id
 * @param {string} merek - Merek
 * @param {string} jenis - Jenis
 * @param {string} stok - Stok
 * @param {string} harga - Harga
 * @param {string} kedaluwarsa - Kedaluwarsa
 * @param {string} deskripsi - Deskripsi
 * @returns {Promise}
 */

// Mengupdate produk
async function updateProduct(id, merek, jenis, stok, harga, kedaluwarsa, deskripsi) {
  return Product.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        merek, jenis, stok, harga, kedaluwarsa, deskripsi
      },
    }
  );
}



/**
 * Delete a product
 * @param {string} id - User ID
 * @returns {Promise}
 */

// Menghapus produk
async function deleteProduct(id) {
  return Product.deleteOne({ _id: id });
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,

};