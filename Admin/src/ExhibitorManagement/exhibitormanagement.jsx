import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, Dropdown, Form, FloatingLabel, Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Sidebar } from '../sidebar';
import { Header } from '../header';
import { Link } from 'react-router-dom';
import APagination from '../pagination';


export const ExhibitorManagement = () => {
    const [exporegister, setExporegister] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10); // Number of users per page

    useEffect(() => {
        axios.get('http://localhost:3000/getregisterexpo')
            .then(response => {
                setExporegister(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    // status
    const getApprovedStatus = (approvalStatus) => {
        switch (approvalStatus) {
            case 'Pending':
                return 'text-warning';
            case 'Approved':
                return 'text-success';
            case 'Rejected':
                return 'text-danger';
            default:
                return 'text-dark';
        }
    };

    const approveStatus = {
        approvalStatus: "Approved",
    };
    const rejectStatus = {
        approvalStatus: "Rejected",
    };

    // Handle approval
    const handleApprove = (id) => {
        axios.put("http://localhost:3000/updateapprovalstatus/" + id, { ...approveStatus })
            .then(response => {
                console.log(response.data);
                // Update exporegister state after successful approval
                const updatedExporegister = exporegister.map(expo => {
                    if (expo._id === id) {
                        return { ...expo, approvalStatus: 'Approved' };
                    }
                    return expo;
                });
                setExporegister(updatedExporegister);
            })
            .catch(error => console.log(error));
    };

    // Handle rejection
    const handleReject = (id) => {
        axios.put("http://localhost:3000/updateapprovalstatus/" + id, { ...rejectStatus })
            .then(response => {
                console.log(response.data);
                // Update exporegister state after successful rejection
                const updatedExporegister = exporegister.map(expo => {
                    if (expo._id === id) {
                        return { ...expo, approvalStatus: 'Rejected' };
                    }
                    return expo;
                });
                setExporegister(updatedExporegister);
            })
            .catch(error => console.log(error));
    };


    // Pagination
    const totalPages = Math.ceil(exporegister.length / postsPerPage);

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    const paginatedData = exporegister.slice(startIndex, endIndex);

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">
            <Sidebar />
            <div className="body-wrapper">
                <header className="app-header">
                    <Header />
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
                                                <Col className='text-center'>
                                                    <h5 className="card-title fw-semibold mb-4">Expo Event Management</h5>
                                                </Col>
                                            </Row>
                                            <div className="table-responsive">
                                                <table className="table text-nowrap mb-0 align-middle text-center">
                                                    <thead className="text-dark fs-4">
                                                        <tr>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Company Name</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Website</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Address</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Email</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Phone</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Approval Status</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Action</h6>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            paginatedData.map((expo, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td className="border-bottom-0 text-wrap"><h6 className="fw-semibold mb-0">{expo.companyName}</h6></td>
                                                                        <td className="border-bottom-0 text-wrap"><h6 className="fw-semibold mb-0">{expo.companyWebsite}</h6></td>
                                                                        <td className="border-bottom-0 text-wrap"><h6 className="fw-semibold mb-0">{expo.companyAddress}</h6></td>
                                                                        <td className="border-bottom-0 text-wrap"><h6 className="fw-semibold mb-0">{expo.contactEmail}</h6></td>
                                                                        <td className="border-bottom-0 text-wrap"><h6 className="fw-semibold mb-0">{expo.contactPhone}</h6></td>
                                                                        <td className="border-bottom-0 text-wrap"><h6 className={`fw-semibold mb-0 ${getApprovedStatus(expo.approvalStatus)}`}>{expo.approvalStatus}</h6></td>
                                                                        <td className="border-bottom-0 text-wrap">
                                                                            {expo.approvalStatus === 'Pending' && (
                                                                                <>
                                                                                    <Button type="button" className="btn btn-sm btn-success m-1" onClick={() => handleApprove(expo._id)}>Approve</Button>
                                                                                    <Button type="button" className="btn btn-sm btn-danger m-1" onClick={() => handleReject(expo._id)}>Reject</Button>
                                                                                </>
                                                                            )}
                                                                            {expo.approvalStatus === 'Approved' && (
                                                                                <Button type="button" className="btn btn-sm btn-danger m-1" onClick={() => handleReject(expo._id)}>Reject</Button>
                                                                            )}
                                                                            {expo.approvalStatus === 'Rejected' && (
                                                                                <Button type="button" className="btn btn-sm btn-success m-1" onClick={() => handleApprove(expo._id)}>Approve</Button>
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            }
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
                            <APagination
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
