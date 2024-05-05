const productsService = require('./products-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

// MENAMPILKAN SELURUH PRODUCT
async function getProducts(request, response, next) {
  try {
    const products = await productsService.getProducts();
    
    return response.status(200).json(products);
  } catch (error) {
    return next(error);
  }
}

// MENAMPILKAN PRODUCT BERDASARKAN ID
async function getProduct(request, response, next) {
  try {
    const product = await productsService.getProduct(request.params.id);

    if (!product) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown product');
    }

    return response.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

// MENGINPUT PRODUCT
async function createProduct(request, response, next) {
  try {
    const merek = request.body.merek;
    const jenis = request.body.jenis;
    const stok = request.body.stok;
    const harga = request.body.harga;
    const kedaluwarsa = request.body.kedaluwarsa;
    const deskripsi = request.body.deskripsi;

    
   

    const success = await productsService.createProduct(merek, jenis, stok, harga, kedaluwarsa, deskripsi);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create product'
      );
    }

    return response.status(200).json({merek, jenis, stok, harga, kedaluwarsa, deskripsi});
  } catch (error) {
    return next(error);
  }
}

// MENGUPDATE PRODUCT
async function updateProduct(request, response, next) {
  try {
    const id = request.params.id;
    const merek = request.body.merek;
    const jenis = request.body.jenis;
    const stok = request.body.stok;
    const harga = request.body.harga;
    const kedaluwarsa = request.body.kedaluwarsa;
    const deskripsi = request.body.deskripsi;

  

    const success = await productsService.updateProduct(id, merek, jenis, stok, harga, kedaluwarsa, deskripsi);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update user'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

// MENGHAPUS PRODUCT
async function deleteProduct(request, response, next) {
  try {
    const id = request.params.id;

    const success = await productsService.deleteProduct(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete user'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}


module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};