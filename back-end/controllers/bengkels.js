const query = require("../database");
// const { login } = require("./auth");



const getOrders = async (req, res) => {
    try {

        // Logika handling
        const results = await query(
            `SELECT 
                p.id_pemesanan,
                u.nama AS nama_user,
                b.nama_mitra AS nama_bengkel,
                p.merek_kendaraan,
                p.plat_kendaraan,
                p.jenis_layanan,
                p.tanggal,
                p.jam,
                p.alamat
            FROM pemesanan p
            JOIN users u ON p.id_user = u.id_user
            JOIN bengkel b ON p.id_bengkel = b.id_bengkel
            ;`,
        );
        console.log(results);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(`Error fetching orders: ${error.message}`);
    }
};

const getBengkel = async (req, res) => { 

    try {
        const results = await query(
            `SELECT
            b.id_bengkel,
            b.nama_mitra,
            b.alamat,
            b.buka,
            b.tutup,
            b.deskripsi,
            b.gambar,
            b.id_layanan,
            j.nama_layanan, -- Kolom dari tabel jenis_layanan
            b.id_user,
            u.nama AS nama_user -- Kolom dari tabel users
        FROM
            bengkel b
        JOIN jenis_layanan j ON b.id_layanan = j.id_layanan
        JOIN users u ON b.id_user = u.id_user;
        `,
        );
        console.log(results);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(`Error fetching orders: ${error.message}`);
    }
};

const pemesanan = async (req, res) => {
    const { id_user, id_bengkel, merek_kendaraan, plat_kendaraan, jenis_layanan, tanggal, jam, alamat } = req.body;
    try {
        const result = await query(
            `
            INSERT INTO pemesanan (id_user, id_bengkel, merek_kendaraan, plat_kendaraan, jenis_layanan, tanggal, jam, alamat) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `,
            [id_user, id_bengkel, merek_kendaraan, plat_kendaraan, jenis_layanan, tanggal, jam, alamat]
        );

        res.status(200).json({ message: "Pemesanan berhasil" });
    } catch (error) {
        console.error('Error during pemesanan:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    getOrders,
    getBengkel,
    pemesanan
};
