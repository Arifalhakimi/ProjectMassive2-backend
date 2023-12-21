const query = require("../database");
const bcryptjs = require("bcryptjs");

// Tidak perlu membuat instance express di sini
// Hapus penggunaan sessionStorage, karena itu hanya berlaku di lingkungan browser (front-end)

async function register(req, res) {
  const { nama, email, password, confPassword, telp } = req.body;

  if (!nama || !email || !password || !confPassword) {
    return res.status(400).json("Invalid data!");
  }

  if (password !== confPassword) {
    return res.status(400).json("Password not match!");
  }

  try {
    // logic handling
    const isDuplicate = await query(
      `
        SELECT id_user FROM users WHERE email = ? 
    `,
      [email]
    );

    if (isDuplicate.length > 0) {
      return res.status(400).json("User already exists!");
    }

    const salt = await bcryptjs.genSalt(12);
    const hash = await bcryptjs.hash(password, salt);
    const role = "user";

    await query(
      `
        INSERT INTO users (nama, email, password, role, telp) VALUES (?, ?, ?, ?,?);
    `,
      [nama, email, hash, role, telp]
    );

    return res.status(200).json("Register success!");
  } catch (error) {
    return res.status(400).json(`Error during registration: ${error.message}`);
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    // logic handling
    const user = await query(
      `
        SELECT id_user, email, password, role, nama,telp FROM users WHERE email = ? 
      `,
      [email]
    );

    // Jika pengguna tidak ditemukan
    if (user.length === 0) {
      return res.status(401).json("Invalid email or password");
    }

    // Bandingkan password yang dimasukkan dengan password di database
    const isPasswordValid = await bcryptjs.compare(password, user[0].password);

    // Jika password tidak valid
    if (!isPasswordValid) {
      return res.status(401).json("Invalid email or password");
    }

    // Role-based routing
    if (user[0].role === 'user' || user[0].role === 'mitra') {
      // Set sesi user di sisi server
      req.session.user = {
        id: user[0].id_user,
        email: user[0].email,
        nama: user[0].nama,
        role: user[0].role,
        telp: user[0].telp,
      };

      // Send response with userData and redirectUrl
      return res.status(200).json({
        userData: {
          id: user[0].id_user,
          email: user[0].email,
          nama: user[0].nama,
          role: user[0].role,
          telp: user[0].telp,
        },
        redirectUrl: user[0].role === 'mitra' ? "/mitra/dashboard" : "/"
      });
    }
    // Jika role tidak valid
    return res.status(401).json({ message: "Invalid role" });
  } catch (error) {
    return res.status(400).json(`Error during login: ${error.message}`);
  }
}
async function getSessionData(req, res) {
  try {
    if (req.session.user) {
      // Jika pengguna sudah login, kirim data pengguna
      return res.status(200).json({
        isLoggedIn: true,
        user: req.session.user,
      });
    } else {
      // Jika pengguna belum login
      return res.status(200).json({
        isLoggedIn: false,
      });
    }
  } catch (error) {
    return res.status(500).json(`Error getting session data: ${error.message}`);
  }
}

module.exports = {
  register,
  login,
  getSessionData,
};
