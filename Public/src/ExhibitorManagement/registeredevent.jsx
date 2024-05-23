import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, Dropdown, Form, FloatingLabel, Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Sidebar } from '../sidebar';
import { DashboardHeader } from '../dashboardheader';
import { Link } from 'react-router-dom';
import PPagination from '../Components/pagination';

export const RegisteredEvent = () => {
    const [events, setEvents] = useState([]);
    const [expos, setExpos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const user_id = localStorage.getItem('publicuser');
    const object = user_id ? JSON.parse(user_id) : null;

    useEffect(() => {
        axios.get('http://localhost:3000/getregisterexpo')
            .then(response => {
                if (object) {
                    setEvents(response.data.filter(data => data.exhibitorId === object._id));
                }
            })
            .catch(error => console.log(error));
    }, [object]);

    useEffect(() => {
        axios.get('http://localhost:3000/getexpoevents')
            .then(response => {
                setExpos(response.data);
            })
            .catch(error => console.log(error));
    }, []);

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

    const totalPages = Math.ceil(events.length / postsPerPage);

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    const paginatedData = events.slice(startIndex, endIndex);

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
                                                    <h5 className="card-title fw-semibold mb-4">Floor Plan</h5>
                                                </Col>
                                            </Row>
                                            <div className="table-responsive">
                                                <table className="table text-nowrap mb-0 align-middle text-center">
                                                    <thead className="text-dark fs-4">
                                                        <tr>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Expo</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Name</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Website</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Address</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Status</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Action</h6>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {paginatedData.length === 0 ? (
                                                            <tr>
                                                                <td colSpan="6"><h4 className='fw-semibold'>No data available</h4></td>
                                                            </tr>
                                                        ) : (
                                                            paginatedData.map((event, index) => {
                                                                const expo = expos.find(expo => expo._id === event.expoId);
                                                                return (
                                                                    <tr key={index}>
                                                                        <td className="border-bottom-0 text-wrap">
                                                                            <h6 className="fw-semibold mb-0">{expo ? expo.title : 'N/A'}</h6>
                                                                        </td>
                                                                        <td className="border-bottom-0 text-wrap">
                                                                            <h6 className="fw-semibold mb-0">{event.companyName}</h6>
                                                                        </td>
                                                                        <td className="border-bottom-0">
                                                                            <h6 className="fw-semibold mb-0">{event.companyWebsite}</h6>
                                                                        </td>
                                                                        <td className="border-bottom-0">
                                                                            <span className="fw-normal">{event.companyAddress}</span>
                                                                        </td>
                                                                        <td className="border-bottom-0">
                                                                            <h6 className={`fw-semibold mb-0 ${getApprovedStatus(event.approvalStatus)}`}>{event.approvalStatus}</h6>
                                                                        </td>
                                                                        <td className="border-bottom-0">
                                                                            {event.approvalStatus === 'Approved' && (
                                                                                <Link to={`/editexporegister/${event._id}`} type="button" className="btn btn-success m-1">Edit</Link>
                                                                            )}                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })
                                                        )}
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
    );
};
