import ImagePemesanan from "../assets/img/imgpesanan.png";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from 'axios'; // Import axios untuk mengirim data ke backend
import { useState, useEffect } from 'react';
const PemesananPage = () => {
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [formData, setFormData] = useState({
        id_user: '1',
        id_bengkel: '1',
        nama: '',
        telp: '',
        email: '',
        merek_kendaraan: '',
        plat_kendaraan: '',
        jenis_layanan: '1', // Ganti dengan nilai default sesuai kebutuhan
        tanggal: '',
        jam: '',
        alamat: ''
    });

    useEffect(() => {
        const getSessionData = async () => {
            try {
                const response = await axios.get('http://localhost:7730/api/v1/session-data');
                console.log('Response from server:', response.data);
                if (response.data.isLoggedIn) {
                    setUserData(response.data.user);
                    setFormData(prevData => ({
                        ...prevData,
                        id_user: response.data.userData.id,
                    }));
                    setLoggedIn(true);
                }
            } catch (error) {
                console.error('Error getting session data:', error);
            }
        };
        getSessionData();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            if (!userData || !userData.id_user) {
                console.error('Error submitting pemesanan: User data or id_user is missing.');
                return;
            }
    
            // Pastikan bahwa id_user ada dalam formData sebelum mengirim permintaan
            const formDataWithUserId = { ...formData, id_user: userData.id_user };
    
            console.log('Form Data:', formDataWithUserId); // Cetak log formData untuk pemeriksaan
    
            const response = await axios.post('http://localhost:7730/api/v1/pemesanan', formDataWithUserId);
            console.log(response.data);
            // Tambahkan logika atau perpindahan halaman sesuai kebutuhan
        } catch (error) {
            console.error('Error submitting pemesanan:', error);
        }
    };
    



    return (
        <div className="pemesanan-page">
            <Container className="pemesanan pb-5 ">
                <Form action="" onSubmit={handleSubmit} >
                    <Row className="form-pemsanan-input">
                        <Col className="gambar d-flex justify-content-center">
                            <img src={ImagePemesanan} alt="" className="mx-auto d-block" />
                        </Col>
                        <h3>Informasi Pelanggan</h3>
                        <Col className="inputan">
                            {isLoggedIn && (
                                // Render form dan elemen lainnya di sini
                                <Form.Group className="mb-3" controlId="formBasicNama" style={{ display: 'none' }}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Masukan Nama"
                                        name="id"
                                        value={userData ? userData.id_user : ''}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            )}
                            <Form.Group className="mb-3" controlId="formBasicNama">
                                <Form.Control
                                    type="text"
                                    placeholder="Masukan Nama"
                                    name="nama"
                                    value={formData.nama}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicTelepon">
                                <Form.Control
                                    type="text"
                                    placeholder="Masukan No Telephone"
                                    name="telepon"
                                    value={formData.telp}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control
                                    type="email"
                                    placeholder="Masukan email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <h3 >Informasi Kendaraan</h3>
                        <Col className="inputan">
                            <Form.Group className="mb-3" controlId="formBasicMerek">
                                <Form.Control
                                    type="text"
                                    placeholder="Masukan Merek Kendaraan"
                                    name="merek_kendaraan"
                                    value={formData.merek_kendaraan}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPlat">
                                <Form.Control
                                    type="text"
                                    placeholder="Masukan Plat kendaraan"
                                    name="plat_kendaraan"
                                    value={formData.plat_kendaraan}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 w-50" controlId="formBasicJenis">
                                <Form.Label>Pilih Jenis Layanan</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name="jenis_layanan"
                                    value={formData.jenis_layanan}
                                    onChange={handleInputChange}
                                >
                                    <option value="1">Ganti Oli</option>
                                    <option value="2">Servis Ringan</option>
                                    <option value="3">Tambal Ban</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <h3>Waktu yang di inginkan</h3>
                        <Col className="inputan">
                            <Form.Group className="mb-3" controlId="formBasicTanggal">
                                <Form.Control
                                    type="date"
                                    placeholder="YYYY-MM-DD"
                                    name="tanggal"
                                    value={formData.tanggal}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicJam">
                                <Form.Control
                                    type="time"
                                    name="jam"
                                    value={formData.jam}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <h3>Alamat</h3>
                        <Col className="inputan">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="alamat"
                                    value={formData.alamat}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <button type="submit" className="btn btn-danger rounded-5 w-25 fw-bold">Pesan</button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    )
}

export default PemesananPage