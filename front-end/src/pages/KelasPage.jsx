import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from "react-bootstrap";
// import { semuaKelas } from "../data/index";
import { useNavigate } from "react-router-dom";


const KelasPage = () => {
  const [bengkel, setBengkel] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:7730/api/v1/kelas');
            console.log('Bengkel:', response.data);
            setBengkel(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    fetchOrders();
}, []);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/informasi")
  }
  return (
    <div className="service-page">
      <div className="service min-vh-100">
        <Container fluid>
          <Row className="headingBengkel">
            <Col lg="6" className="pilih-bengkel">
              <div className="text-bengkel mt-3 ">
                <h1 className="fw-bold animate__animated animate__fadeInUp animate__delay-1s">Pilih Bengkel</h1>
              </div>
            </Col>
            <Col lg="6" className="seacrh-bengkel d-flex justify-content-end">
              <div className="search2-bengkel">
                <form action="">
                  <div className="mb-3 mt-3 ">
                    <input type="text" className="form-control animate__animated animate__fadeInUp animate__delay-1s jus" id="seacrh" placeholder="Cari" name="seacrh" />

                  </div>
                </form>
                <div className="button-bengkel animate__animated animate__fadeInUp animate__delay-1s text-end">
                  <button className="btn btn-danger mx-2 rounded-4 ">Terdekat</button>
                  <button className="btn btn-danger rounded-4">Populer</button>
                </div>
              </div>

            </Col>

          </Row>
          <Row>
            {bengkel.map((bengkel) => {
              return <Col key={bengkel.id_bengkel} className='shadow rounded-5 mt-5' data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
                <img src={`/assets/img/bengkel/${bengkel.gambar}`} alt="unsplash.com" className='w-100 mb-3 rounded-top' />
                <div className="addres d-flex justtify-content-center ">
                  <div className="jalan col-lg-10 d-flex">
                    <i className="fas fa-map-marker"></i>
                    <p>{bengkel.alamat}</p>
                  </div>
                  <div className="open col-lg-2 d-flex justify-content-end">
                    <p>buka</p>
                    <i className="fas fa-circle"></i>
                  </div>
                  {/* <h6 className="align-items-center"></h6> */}
                </div>
                <div className="title">
                  <h5 className=''> {bengkel.nama_mitra} </h5>
                </div>
                <div className='ket d-flex justify-content-between align-items-center pb-3'>
                  <div className='start d-flex col-lg-6'>
                    <i className="fa-solid fa-star"></i>
                    <p>4.5</p>
                  </div>
                  <div className="button-detail col-lg-6 d-flex justify-content-end">
                    <button className='btn btn-danger rounded-4' onClick={handleClick} >Detail</button>
                  </div>
                </div>
              </Col>
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default KelasPage