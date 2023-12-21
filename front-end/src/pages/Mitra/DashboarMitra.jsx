// import DasboardMitraComponent from "../components/DasboardMitraComponent"
import { Container, Row, Col } from "react-bootstrap";
import IconDashboard from "../../assets/img/logoBengkelin.png";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// const axiosHandler = async (url, data) => await axios.post(url, data);

const DashboarMitra = () => {
    // const {
    //     // register,
    //     // handleSubmit,
    //     // formState: { errors },
    //     // reset,
    // } = useForm();
    // const navigate = useNavigate();

    // const onSubmit = async (data) => {
    //     const formData = new FormData();
    //     // formData.append("email", data.email);
    //     formData.append("nama_mitra", data.nama_mitra);
    //     formData.append("buka", data.buka);
    //     formData.append("tutup", data.tutup);
    //     formData.append("alamat", data.alamat);
    //     formData.append("deskripsi", data.text);
    //     formData.append("gambar", data.gambar[0]); // Assuming persyaratan is a file input

    //     if (data.gambar && data.gambar[0]) {
    //         formData.append("gambar", data.gambar[0]);
    //     }
    //     try {
    //         const response = await axios.post("http://localhost:7730/api/v1/register", formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //             },
    //         });

    //         Swal.fire({
    //             icon: "success",
    //             title: "Berhasil",
    //             text: response.data,
    //         });

    //         reset();
    //         // Redirect or navigate to another page after successful registration
    //         navigate("/redirect-path");
    //     } catch (error) {
    //         Swal.fire({
    //             icon: "error",
    //             title: "Oops...",
    //             text: error.response.data,
    //         });
    //     }
    // };

    return (
        <>
            <Container fluid className="Dashboard-mitra-content">
                <Row>
                    <Col className="content mb-1 text-center">
                        <h1>Dahboard</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className="content-body text-center pt-3">
                        <div>
                            <h3>SELAMAT DATANG DI <br /> <span>BENGKEL.IN</span></h3>
                            <p>Solusi layanan perbaikan kendaraanmu</p>
                        </div>
                        <div>
                            <img src={IconDashboard} alt="" />
                        </div>
                    </Col>
                </Row>
                <Row className="form-daftar">
                    <div className="form-regis-bengkel ">
                        <form  encType="multipart/form-data" action="" className="form d-flex justify-content-around">
                            <Col lg="4" >
                                {/* <div className="mb-3 mt-3">
                                    <label className="form-label">Email:</label>
                                    <input type="email" className="form-control" id="email" placeholder="Masukan email" name="email" />
                                </div> */}
                                <div className="mb-3 mt-3">
                                    <label className="form-label">Nama mitra:</label>
                                    <input type="text" className="form-control" id="namamitra" placeholder="Masukan nama mitra" name="namamitra"  />
                                </div>
                                {/* <div className="mb-3 mt-3">
                                    <label className="form-label">Telp:</label>
                                    <input type="text" className="form-control" id="telp" placeholder="Masukan Telepon" name="telp" />
                                </div> */}
                                <div className="mb-3 mt-3">
                                    <label className="form-label">alamat:</label>
                                    <input type="text" className="form-control" id="alamat" placeholder="Masukan alamat" name="alamat" />
                                </div>
                                <div className="mb-3 mt-3">
                                    <label className="form-label">buka:</label>
                                    <input type="time" className="form-control" id="buka" placeholder="Masukan " name="buka" />
                                </div>
                                <div className="mb-3 mt-3">
                                    <label className="form-label">tutup:</label>
                                    <input type="time" className="form-control" id="tutup" placeholder="Masukan " name="tutup" />
                                </div>
                            </Col>
                            <Col lg="7">
                                
                                {/* <div className="form-check mb-3  d-flex  align-items-center">
                                    <label className="form-check-label mx-5  d-flex justify-content-center align-items-center">
                                        <input className="form-check-input" type="checkbox" name="motor" /> Motor
                                    </label>
                                    <label className="form-check-label  d-flex justify-content-center align-items-center">
                                        <input className="form-check-input" type="checkbox" name="mobil" /> Mobil
                                    </label>
                                </div> */}
                                <div className="mb-3 mt-3">
                                    <label className="form-label">gambar:</label>
                                    <input type="file" className="form-control" id="gambar" name="gambar"  />
                                </div>
                                <div className="mb-3 mt-3">
                                    <label className="form-label">deskripsi:</label>
                                    <textarea className="form-control" rows="5" id="comment" name="text"></textarea>
                                </div>
                                {/* {...register("deskripsi")} */}
                                <div className="submitregismitra">
                                    <button type="submit" className="btn btn-danger w-50 rounded-5  "  >Daftar</button>
                                </div>
                            </Col>
                        </form>
                    </div>
                </Row>
            </Container>
        </>
    )
}

export default DashboarMitra