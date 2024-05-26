import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, Dropdown, Form, FloatingLabel, Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Sidebar } from '../sidebar';
import { DashboardHeader } from '../dashboardheader';
import { Link } from 'react-router-dom';
import PPagination from '../Components/pagination';

export const ViewEvents = () => {
    const [events, setEvents] = useState([]);
    const [exporegister, setExporegister] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    useEffect(() => {
        axios.get('http://localhost:3000/getexpoevents')
            .then(response => {
                const sortedEvents = response.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
                setEvents(sortedEvents);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/getregisterexpo')
            .then(response => {
                setExporegister(response.data);
            })
            .catch(error => console.log(error));
    }, []);

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

    const getApprovedStatus = (approvalStatus) => {
        switch (approvalStatus) {
            case 'Pending':
                return 'bg-warning';
            case 'Approved':
                return 'bg-success';
            case 'Rejected':
                return 'bg-danger';
            default:
                return 'bg-dark';
        }
    };

    const totalPages = Math.ceil(events.length / postsPerPage);

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    const paginatedData = events.slice(startIndex, endIndex);

    const user_id = localStorage.getItem('publicuser');
    const object = user_id ? JSON.parse(user_id) : null;

    return (
        <div className="row">
            <div className="col-lg-12 d-flex align-items-stretch">
                <div className="card w-100">
                    <div className="card-body p-4">
                        <Row>
                            <Col className='text-center'>
                                <h5 className="card-title fw-semibold mb-4">View Events</h5>
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
                                            <h6 className="fw-semibold mb-0">Start / End Date</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Start / End Time</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Location</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Theme</h6>
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
                                        paginatedData.map((expo, index) => {
                                            const currentDate = new Date();
                                            const eventStartDate = new Date(expo.startDate);
                                            const showRegisterButton = eventStartDate >= currentDate && expo.status === 'upcoming';
                                            const registrationEntry = exporegister.find(entry => entry.expoId === expo._id && entry.exhibitorId === (object?._id || ''));
                                            const status = registrationEntry ? registrationEntry.approvalStatus : "Not Registered";

                                            return (
                                                <tr key={index}>
                                                    <td className="border-bottom-0 text-wrap"><h6 className="fw-semibold mb-0">{expo.title}</h6></td>
                                                    <td className="border-bottom-0">
                                                        <h6 className="fw-semibold">{new Date(expo.startDate).toLocaleDateString()}</h6>
                                                        <span className="mb-0 fw-normal">{new Date(expo.endDate).toLocaleDateString()}</span>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-1">{new Date(expo.startTime).toLocaleTimeString('en-US')}</h6>
                                                        <span className="fw-normal">{new Date(expo.endTime).toLocaleTimeString('en-US')}</span>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <h6 className="mb-0 fw-normal">{expo.location}</h6>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <h6 className="mb-0 fw-normal text-wrap">{expo.theme}</h6>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <h6 className="fw-normal mb-0">{expo.organizer}</h6>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        <span className={`badge rounded-5 text-uppercase fw-semibold ${getStatusColor(expo.status)}`}>{expo.status}</span>
                                                    </td>
                                                    <td className="border-bottom-0">
                                                        {status !== "Not Registered" ? (
                                                            <span className={`badge ${getApprovedStatus(status)}`}>{status}</span>
                                                        ) : (
                                                            showRegisterButton && (
                                                                <Link to={`/eventregister/${expo._id}`} type="button" className="btn btn-dark m-1 rounded-4">Register</Link>
                                                            )
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Row className='mx-lg-auto'>
                <Col className='col-lg-12 d-flex justify-content-center'>
                    <PPagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
        </div>
    );
}
