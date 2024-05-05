const productsRepository = require('./products-repository');

// MENAMPILKAN SELURUH PRODUCT
async function getProducts() {
  const products = await productsRepository.getProducts();

  const results = [];
  for (let i = 0; i < products.length; i += 1) {
    const product = products[i];
    results.push({
      id: product.id,
      merek: product.merek,
      jenis: product.jenis,
      stok : product.stok,
      harga: product.harga,
      kedaluwarsa: product.kedaluwarsa,
      deskripsi: product.deskripsi
    });
  }

  return results;
}

// MENAMPILKAN PRODUK BERDASARKAN ID
async function getProduct(id) {
  const product = await productsRepository.getProduct(id);

  // product not found
  if (!product) {
    return null;
  }

  return {
    id: product.id,
    merek: product.merek,
    jenis: product.jenis,
    stok : product.stok,
    harga: product.harga,
    kedaluwarsa: product.kedaluwarsa,
    deskripsi: product.deskripsi,
  };
}


// MENGINPUT PRODUCT
async function createProduct(merek, jenis, stok, harga, kedaluwarsa, deskripsi) {

  try {
    await productsRepository.createProduct(merek, jenis, stok, harga, kedaluwarsa, deskripsi);
  } catch (err) {
    return null;
  }

  return true;
}

// MENGUPDATE PRODUCT
async function updateProduct(id, merek, jenis, stok, harga, kedaluwarsa, deskripsi) {
  const product = await productsRepository.getProduct(id);

  // product not found
  if (!product) {
    return null;
  }

  try {
    await productsRepository.updateProduct(id, merek, jenis, stok, harga, kedaluwarsa, deskripsi);
  } catch (err) {
    return null;
  }

  return true;
}

// MENGHAPUS PRODUCT
async function deleteProduct(id) {
  const product = await productsRepository.getProduct(id);

  // product not found
  if (!product) {
    return null;
  }

  try {
    await productsRepository.deleteProduct(id);
  } catch (err) {
    return null;
  }

  return true;
}


module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};