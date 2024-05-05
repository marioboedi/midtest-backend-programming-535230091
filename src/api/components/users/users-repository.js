const { User } = require('../../../models');

/**
 * Get a list of users
 * @returns {Promise}
 */
// async function getUsers() {
//   return User.find({});
// }

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}

// MENAMPILKAN LIST PRODUK MENGGUNAKAN PAGINATION
async function getUsers(
  nomerHalaman = 1, 
  ukuranHalaman = 10, 
  sort = { email: 1 }, 
  search = {}
) {
    // Menghitung jumlah data yang sesuai dengan kriteria pencarian
  const skip = (nomerHalaman - 1) * ukuranHalaman;
  const users = await User.find(search).sort(sort).skip(skip).limit(ukuranHalaman);
 
  const jumlahData = await User.countDocuments(search); // hitung jumlah data
  const jumlahHalaman = Math.ceil(jumlahData / ukuranHalaman); // total halaman

  // Kembalikan objek yang berisi data pengguna yang sudah disederhanakan, informasi paginasi, dan jumlah total data
  return {
    page_number: nomerHalaman,
    page_size: ukuranHalaman,
    count: jumlahData,
    total_pages: jumlahHalaman,
    has_previous_page: nomerHalaman > 1,
    has_next_page: nomerHalaman < jumlahHalaman,
    data: users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
    })),
  }
}


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
  
};
