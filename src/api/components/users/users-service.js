const usersRepository = require('./users-repository');
const { hashPassword, passwordMatched } = require('../../../utils/password');

/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers() {
  const users = await usersRepository.getUsers();

  const results = [];
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    results.push({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  return results;
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Check whether the email is registered
 * @param {string} email - Email
 * @returns {boolean}
 */
async function emailIsRegistered(email) {
  const user = await usersRepository.getUserByEmail(email);

  if (user) {
    return true;
  }

  return false;
}

/**
 * Check whether the password is correct
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function checkPassword(userId, password) {
  const user = await usersRepository.getUser(userId);
  return passwordMatched(password, user.password);
}

/**
 * Change user password
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function changePassword(userId, password) {
  const user = await usersRepository.getUser(userId);

  // Check if user not found
  if (!user) {
    return null;
  }

  const hashedPassword = await hashPassword(password);

  const changeSuccess = await usersRepository.changePassword(
    userId,
    hashedPassword
  );

  if (!changeSuccess) {
    return null;
  }

  return true;
}


// Fungsi untuk mengurai query pengurutan
function pengurutan (kueriUrut) {
  if (!kueriUrut)
    return { email: 1 }; // Urutkan email secara naik
  const [field, order] = kueriUrut.split(':');
  return { [field]: order === 'desc' ? -1 : 1 }; // Operator ternary untuk pengurutan
}

// Fungsi untuk mengurai query pencarian
function pencarian (kueriPencarian) {
  if (!kueriPencarian)
    return {};
  const [field, key] = kueriPencarian.split(':');
  return { [field]: { $regex: key, $options: 'i' } }; // Pencarian yang tidak memperhatikan huruf besar atau kecil
}

// Fungsi untuk mengurai parameter kueri
async function parameterKueri(nomerHalaman, ukuranHalaman, sort, search) {
  const page_number = parseInt(nomerHalaman) || 1;
  const page_size = parseInt(ukuranHalaman) || 10;
  const sortParams = await pengurutan(sort);
  const searchParams = await pencarian(search);

  return {
    page_number,
    page_size,
    sortParams,
    searchParams
  };
}

// Fungsi utama untuk mendapatkan data pengguna berdasarkan parameter kueri
async function getUsers(nomerHalaman, ukuranHalaman, sort, search) {
  // Parsing parameter kueri
  const parameterParsed = await parameterKueri(nomerHalaman, ukuranHalaman, sort, search);
 
  // Mendapatkan data pengguna dari repository berdasarkan parameter kueri yang sudah diurai
  return await usersRepository.getUsers(
    parameterParsed.page_number, 
    parameterParsed.page_size, 
    parameterParsed.sortParams, 
    parameterParsed.searchParams
  );
}



module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  emailIsRegistered,
  checkPassword,
  changePassword,
};
