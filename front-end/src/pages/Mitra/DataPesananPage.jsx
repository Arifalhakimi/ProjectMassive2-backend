// import DahboardMitraComponent from "../../components/DasboardMitraComponent";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from "react-bootstrap"
import Table from 'react-bootstrap/Table';
import { tableHeaderDataPesanan } from "../../data/index";

// tableDataPesanan,
const DataPesananPage = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:7730/api/v1/mitra/datapesanan');
                console.log('Data Pesanan:', response.data);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);
    return (
        <>
            {/* <DahboardMitraComponent/> */}
            <Container fluid className="data-pesanan">
                <Row>
                    <Col className="content mb-1 text-center">
                        <h1>Data Pesanan</h1>
                    </Col>
                </Row>
                <Row className="content-body pt-3">
                    <Col >
                        <Table responsive>
                            <thead>
                                {tableHeaderDataPesanan.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <th>{data.no} </th>
                                            <th>{data.nama} </th>
                                            <th>{data.email} </th>
                                            <th>{data.merekKendaraan} </th>
                                            <th>{data.platKendaraan} </th>
                                            <th>{data.layanan} </th>
                                            <th>{data.tanggal} </th>
                                            <th>{data.jam} </th>
                                            <th>{data.alamat} </th>
                                            <th>{data.pesanan} </th>
                                            <th>Aksi</th>
                                        </tr>
                                    );
                                })}
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id_pemesanan}>
                                        <td>{order.id_pemesanan}</td>
                                        <td>{order.nama_user}</td>
                                        <td>{order.nama_bengkel}</td>
                                        <td>{order.merek_kendaraan}</td>
                                        <td>{order.plat_kendaraan}</td>
                                        <td>{order.jenis_layanan}</td>
                                        <td>{order.tanggal}</td>
                                        <td>{order.jam}</td>
                                        <td>{order.alamat}</td>
                                        <td className="btnaksi pb-1 ">
                                            <button className="btn btn-primary mb-1 w-75">Terima</button>
                                            <button className="btn btn-danger w-75">Tolak</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default DataPesananPage

// {tableDataPesanan.map((data) => {
//     return (
//         <tr key={data.id}>
//             <td> {data.no} </td>
//             <td>{data.nama} </td>
//             <td>{data.telepon} </td>
//             <td>{data.email} </td>
//             <td>{data.merekKendaraan} </td>
//             <td>{data.layanan} </td>
//             <td>{data.platKendaraan} </td>
//             <td>{data.waktuPesan} </td>
//             <td>{data.alamat} </td>
//             <td className="btnaksi pb-1 ">
//                 <button className="btn btn-primary mb-1 w-100">Terima</button>
//                 <button className="btn btn-danger w-100">Tolak</button>
//             </td>
//         </tr>
//     );
//     } )}

{/* <tr>
                                    <td>1</td>
                                    {Array.from({ length: 12 }).map((_, index) => (
                                        <td key={index}>Table cell {index}</td>
                                    ))}
                                </tr> */}