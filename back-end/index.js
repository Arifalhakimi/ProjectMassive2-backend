const express = require("express");
const session = require("express-session");
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require("body-parser");
const cors = require("cors");
const { createServer } = require("http");
const routes = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 7730;
const server = createServer(app);

const sessionStore = new MySQLStore({
    /* konfigurasi penyimpanan sesi */
    user: 'root',
    password: '',
    database: 'db_projectmassive',
});

// Gunakan express-session untuk mengelola sesi
app.use(session({
    secret: 'secret-key', // Ganti dengan secret key yang lebih aman
    resave: false,
    saveUninitialized: false,
    // saveUninitialized: false,
}));
app.use(express.json());
// Middleware untuk memeriksa apakah pengguna sudah login
app.use((req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user; // Tambahkan pengguna ke lokal agar dapat diakses di seluruh aplikasi
    }
    next();
});


app.use(cors());
app.use(bodyParser.json());
app.use(routes); // Ubah path routes sesuai kebutuhan

server.listen(PORT, () => console.log(`Server already running at http://localhost:${PORT}`));
