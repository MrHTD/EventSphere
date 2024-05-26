import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, Dropdown, Form, FloatingLabel, Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Sidebar } from '../sidebar';
import { Link } from 'react-router-dom'
import PPagination from '../Components/pagination';
import { DashboardHeader } from '../dashboardheader';

export const ExhibitorList = () => {
    const [data, setdata] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5); // Number of users per page

    useEffect(() => {
        axios.get('http://localhost:3000/getUser')
            .then(response => {
              setdata(response.data.filter(user => user.role === "Exhibitor"));
            })
            .catch(error => console.log(error));
    }, []);

    // Pagination
    const totalPages = Math.ceil(data.length / postsPerPage);

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    const paginatedData = data.slice(startIndex, endIndex);

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">
            <Sidebar />
            <div className="body-wrapper">
                <header className="app-header">
                    <DashboardHeader />
                </header>
                <Container fluid>
                    {/* Table */}
                    <Row>
                        <Col lg={12}>
                            <div className="row">
                                <div className="col-lg-12 d-flex align-items-stretch">
                                    <div className="card w-100">
                                        <div className="card-body p-4">
                                            <Row>
                                                <Col>
                                                    <h5 className="card-title fw-semibold mb-4">Exhibitor List</h5>
                                                </Col>
                                            </Row>
                                            <div className="table-responsive">
                                                <table className="table text-nowrap mb-0 align-middle text-center">
                                                    <thead className="text-dark fs-4">
                                                        <tr>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Username</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Email</h6>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {paginatedData.length === 0 ? (
                                                            <tr>
                                                                <td colSpan="4"><h4 className='fw-semibold'>No data available</h4></td>
                                                            </tr>
                                                        ) : (
                                                            paginatedData.map((user, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td className="border-bottom-0 text-wrap"><h6 className="fw-semibold mb-0">{user.username}</h6></td>
                                                                        <td className="border-bottom-0 text-wrap"><h6 className="fw-semibold mb-0">{user.email}</h6></td>
                                                                    </tr>
                                                                );
                                                            }
                                                            )
                                                        )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    {/* Pagination */}
                    <Row className='mx-lg-auto'>
                        <Col className='col-lg-12 d-flex justify-content-center'>
                            <PPagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </Col>
                    </Row>

                </Container>
            </div>
        </div>
    )
}