const authenticationRepository = require('./authentication-repository');
const { generateToken } = require('../../../utils/session-token');
const { passwordMatched } = require('../../../utils/password');

let cobaGagal = {}; // Object to track failed login attempts

/**
 * Check username and password for login.
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {object} An object containing, among others, the JWT token if the email and password are matched. Otherwise returns null.
 */
async function checkLoginCredentials(email, password) {
  const user = await authenticationRepository.getUserByEmail(email);

  // Initialize failed login attempts for this email if not exist
  cobaGagal[email] = cobaGagal[email] || { percobaan: 0, percobaanAkhir: null };

  const sekarang = Date.now();
  const batasWaktu = 30 * 60 * 1000; // 30 menit dalam milidetik
  const resetWaktu = 30 * 60 * 1000; // 30 menit dalam milidetik

  // Reset failed login attempts jika sudah lewat lebih dari 30 menit sejak percobaan terakhir
  if (sekarang - cobaGagal[email].percobaanAkhir >= resetWaktu) {
    cobaGagal[email].percobaan = 0; // Reset failed attempts
    console.log(`[${new Date().toISOString()}] User ${email} bisa mencoba login kembali karena sudah lebih dari 30 menit sejak pengenaan limit. Attempt di-reset kembali ke 0.`);
  }

  // mengecek 5 kali kesalahan percobaan login
  if (cobaGagal[email].percobaan >= 5 && sekarang - cobaGagal[email].percobaanAkhir < batasWaktu) {
    throw new Error(`User ${email} mencoba login, error 403 melebihi limit attempt.`);
  }

  // Bandingkan password yang dimasukkan dengan password user
  const userPassword = user ? user.password : '<RANDOM_PASSWORD_FILLER>';
  const passwordChecked = await passwordMatched(password, userPassword);

  // Increment failed login attempts jika password tidak cocok atau user tidak ditemukan
  if (!user || !passwordChecked) {
    const attempt = ++cobaGagal[email].percobaan;
    cobaGagal[email].percobaanAkhir = sekarang;
    console.log(`[${new Date().toISOString()}] User ${email} gagal login. Attempt = ${attempt}.`);
    throw { message: 'Wrong email or password', attempt }; // Melemparkan error dengan informasi percobaan
  }

  // Reset percobaan login gagal jika login berhasil
  cobaGagal[email].percobaan = 0;
  cobaGagal[email].percobaanAkhir = null;

  // Jika login berhasil, kembalikan informasi user dan token
  return {
    email: user.email,
    name: user.name,
    user_id: user.id,
    token: generateToken(user.email, user.id),
  };
}

module.exports = {
  checkLoginCredentials,
};
