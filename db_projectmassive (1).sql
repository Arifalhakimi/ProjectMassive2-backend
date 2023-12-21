-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 21, 2023 at 03:04 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_projectmassive`
--

-- --------------------------------------------------------

--
-- Table structure for table `bengkel`
--

CREATE TABLE `bengkel` (
  `id_bengkel` int(11) NOT NULL,
  `nama_mitra` varchar(255) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `buka` time NOT NULL,
  `tutup` time NOT NULL,
  `deskripsi` text NOT NULL,
  `gambar` varchar(100) NOT NULL,
  `id_layanan` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bengkel`
--

INSERT INTO `bengkel` (`id_bengkel`, `nama_mitra`, `alamat`, `buka`, `tutup`, `deskripsi`, `gambar`, `id_layanan`, `id_user`) VALUES
(1, 'Arif Bengkel', 'Jalan Karang Patri - Pebayuran', '07:00:00', '18:00:00', 'Bengkel Kami melayani pelanggan dengan segenap hati.kami befokus kepada layanan yang kami berikan.', 'bengkel1.jpeg', 1, 1),
(2, 'bengkelkita', 'sebelah pebayuran', '08:00:00', '14:00:00', 'bengkel kita adalah bengkel kita .bengkel kita memiliki pesan moral yang tinggi dan menjunjung kejujuran.', 'bengkel2.jpeg', 2, 2),
(3, 'warung bengkel', 'samping pebayuran', '09:00:00', '18:00:00', 'warung bengkel menyediakan jajanan motor yang menarik dan ramah ramah pengguna .selain dari itu...', 'bengkel3.jpeg', 3, 3),
(4, 'bengkel kami', 'jl.depan pebayuran', '09:00:00', '05:00:00', 'bengkel kami adalah bengkel kami yang mempunyai arti sebagai bengkel kami.', 'bengkel4.jpeg', 1, 4),
(5, 'bengkel jaya', 'jl.pebayuran', '07:00:00', '23:00:00', 'bengkel jaya sudah berdiri sejak 1965.kami berkomitmen tetap menjunjung tinggi kejujuran bagi seluruh rakyak indonesia.', 'bengkel5.jpeg', 2, 5),
(6, 'ahass bengkel ', 'jl.mukmin pebayuran', '07:00:00', '24:00:00', 'ahass bengkel senantiasa memperbaiki layanan kendaraan anda. kejujuran dan keuletan yang mempuni serta kelihaian dalam memperbaiki kendaraan anda yang rusak.', 'bengkel6.jpg', 3, 6);

-- --------------------------------------------------------

--
-- Table structure for table `jenis_layanan`
--

CREATE TABLE `jenis_layanan` (
  `id_layanan` int(11) NOT NULL,
  `nama_layanan` varchar(255) NOT NULL,
  `harga_layanan` bigint(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jenis_layanan`
--

INSERT INTO `jenis_layanan` (`id_layanan`, `nama_layanan`, `harga_layanan`) VALUES
(1, 'tambal_ban', 15000),
(2, 'servis_ringan', 80000),
(3, 'ganti_oli', 65000);

-- --------------------------------------------------------

--
-- Table structure for table `pemesanan`
--

CREATE TABLE `pemesanan` (
  `id_pemesanan` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_bengkel` int(11) NOT NULL,
  `merek_kendaraan` varchar(50) NOT NULL,
  `plat_kendaraan` varchar(50) NOT NULL,
  `jenis_layanan` text NOT NULL,
  `tanggal` date NOT NULL,
  `jam` time NOT NULL,
  `alamat` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pemesanan`
--

INSERT INTO `pemesanan` (`id_pemesanan`, `id_user`, `id_bengkel`, `merek_kendaraan`, `plat_kendaraan`, `jenis_layanan`, `tanggal`, `jam`, `alamat`) VALUES
(1, 2, 1, 'Supra Bapak', 'B 2038 AIR', 'Servis Ringan', '2023-12-21', '08:00:00', 'Jl. daerah Perbayuran');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `telp` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `nama`, `email`, `password`, `role`, `telp`) VALUES
(1, 'Arif', 'arif@gmail.com', '$2a$12$4v6VQ4eDVKw3qlNLnAgBN.4D08UlwkbNPyO6iLJ/memc2dgGUGLp2', 'mitra', '089812345678'),
(2, 'hakimi', 'hakimi@gmail.com', '$2a$12$EYoYgkRF2gHbt8eCGUbnseHVr7AalJ5jI/HKt.F4coC5CKIc.fRve', 'user', '089887654321'),
(3, 'rifai', 'rifai@gmail.com', '$2a$12$j08yY68v/8tZziLi/NQkxeErk12pdSwRq1QSNOhRUKGfwT2Jn4DvG', 'user', '0897123456'),
(4, 'coba', 'coba@gmail.com', '$2a$12$MUkpRZAdkyckhlFDg3.haeY2yyvl81ZZ1L9OmxnSU0QiRbrEt9DOK', 'user', '089712345'),
(5, 'il', 'il@gmail.com', '$2a$12$03ATD.vMZOc/zULQ2cnGHux8dvhZ8nKPUCaDmDQI3ah/t/LFVVomS', 'user', '02112344321'),
(6, 'saya', 'saya@gmail.com', '$2a$12$K0nybikigrVhoH/l41J8yOjbu/e0pMSjc8IbRxCuNFMWmSv5xwYJC', 'user', '0891234521'),
(7, 'bisa', 'bisa@gmail.com', '$2a$12$QxGQY2lu7kLbo.wX202GyeBU7BOob0/2FGwpNA7rgwQ/DZqENINH.', 'user', '098789876'),
(8, 'pusing', 'pusing@gmail.com', '$2a$12$dkcr3UzCRv641BdXtn9QK.FZR2jLfW3.Z99igkxmmUX5yfJ/JM1Nm', 'user', '010101');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bengkel`
--
ALTER TABLE `bengkel`
  ADD PRIMARY KEY (`id_bengkel`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `jenis_layanan`
--
ALTER TABLE `jenis_layanan`
  ADD PRIMARY KEY (`id_layanan`);

--
-- Indexes for table `pemesanan`
--
ALTER TABLE `pemesanan`
  ADD PRIMARY KEY (`id_pemesanan`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_bengkel` (`id_bengkel`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bengkel`
--
ALTER TABLE `bengkel`
  MODIFY `id_bengkel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `jenis_layanan`
--
ALTER TABLE `jenis_layanan`
  MODIFY `id_layanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pemesanan`
--
ALTER TABLE `pemesanan`
  MODIFY `id_pemesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bengkel`
--
ALTER TABLE `bengkel`
  ADD CONSTRAINT `bengkel_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bengkel_ibfk_2` FOREIGN KEY (`id_layanan`) REFERENCES `jenis_layanan` (`id_layanan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pemesanan`
--
ALTER TABLE `pemesanan`
  ADD CONSTRAINT `pemesanan_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pemesanan_ibfk_2` FOREIGN KEY (`id_bengkel`) REFERENCES `bengkel` (`id_bengkel`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
