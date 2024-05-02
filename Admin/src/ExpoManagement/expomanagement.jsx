import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, Dropdown, Form, FloatingLabel, Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Sidebar } from '../sidebar';
import { Header } from '../header';
import { Link } from 'react-router-dom';
import APagination from '../pagination';


export const ExpoManagement = () => {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10); // Number of users per page

    useEffect(() => {
        axios.get('http://localhost:3000/getexpoevents')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    // status
    const getStatusColor = (status) => {
        switch (status) {
            case 'upcoming':
                return 'bg-secondary';
            case 'ongoing':
                return 'bg-warning';
            case 'ended':
                return 'bg-success';
            default:
                return 'bg-dark';
        }
    };

    // Pagination
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
                                                <Col>
                                                    <h5 className="card-title fw-semibold mb-4">Expo Event Management</h5>
                                                </Col>
                                                <Col className='text-end'>
                                                    <Link to="/addevent" type="button" className="w-auto btn btn-primary">Add Event</Link>
                                                </Col>
                                            </Row>
                                            <div className="table-responsive">
                                                <table className="table text-nowrap mb-0 align-middle text-center">
                                                    <thead className="text-dark fs-4">
                                                        <tr>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Title</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Start Date</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">End Date</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Location</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Theme</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Contact</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Organizer</h6>
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
                                                        {
                                                            paginatedData.map((expo, index) => (
                                                                <tr key={index}>
                                                                    <td className="border-bottom-0"><h6 className="fw-semibold mb-0">{expo.title}</h6></td>
                                                                    <td className="border-bottom-0">
                                                                        <p className="mb-0 fw-normal">{new Date(expo.startDate).toLocaleDateString()}</p>
                                                                    </td>
                                                                    <td className="border-bottom-0">
                                                                        <p className="mb-0 fw-normal">{new Date(expo.endDate).toLocaleDateString()}</p>
                                                                    </td>
                                                                    <td className="border-bottom-0">
                                                                        <h6 className="fw-semibold mb-1"></h6>
                                                                        <span className="fw-normal">{expo.location}</span>
                                                                    </td>
                                                                    <td className="border-bottom-0">
                                                                        <p className="mb-0 fw-normal">{expo.theme}</p>
                                                                    </td>
                                                                    <td className="border-bottom-0">
                                                                        <h6 className="fw-semibold mb-1">{expo.contact.name}</h6>
                                                                        <span className="fw-normal">{expo.contact.email}</span>
                                                                    </td>
                                                                    <td className="border-bottom-0">
                                                                        <h6 className="fw-normal mb-0">{expo.organizer}</h6>
                                                                    </td>
                                                                    <td className="border-bottom-0 d-flex align-items-center justify-content-center">
                                                                        <div className="d-flex align-items-center gap-2">
                                                                            <span className={`badge rounded-5 text-uppercase fw-semibold ${getStatusColor(expo.status)}`}>{expo.status}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="border-bottom-0">
                                                                        <Link to={`/editexpoevent/${expo._id}`} type="button" className="btn btn-success m-1">Edit</Link>
                                                                        <Link to={`/deleteexpoevent/${expo._id}`} type="button" className="btn btn-danger m-1">Delete</Link>
                                                                    </td>
                                                                </tr>
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
