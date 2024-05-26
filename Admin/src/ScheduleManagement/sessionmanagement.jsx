import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, Dropdown, Form, FloatingLabel, Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Sidebar } from '../sidebar';
import { Header } from '../header';
import { Link } from 'react-router-dom';
import APagination from '../pagination';


// Import statements

export const SessionManagement = () => {
    const [data, setData] = useState([]);
    const [events, setEvents] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [sessionsPerPage] = useState(10);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const sessionResponse = await axios.get('http://localhost:3000/getSession');
                const eventResponse = await axios.get('http://localhost:3000/getexpoevents');

                setData(sessionResponse.data);
                setEvents(eventResponse.data);

                setLoading(false);
            } catch (error) {
                setError('Error fetching data.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Pagination
    const totalPages = Math.ceil(data.length / sessionsPerPage);
    const indexOfLastSession = currentPage * sessionsPerPage;
    const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
    const paginatedSessions = data.slice(indexOfFirstSession, indexOfLastSession);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">
            <Sidebar />
            <div className="body-wrapper">
                <header className="app-header">
                    <Header />
                </header>
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <div className="card">
                                <div className="card-body">
                                    <Row>
                                        <Col>
                                            <h5 className="card-title fw-semibold mb-4">Session & Schedule Management</h5>
                                        </Col>
                                        <Col className='text-end'>
                                            <Link to="/addsession" className="w-auto btn btn-primary">Add Session</Link>
                                        </Col>
                                    </Row>
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : error ? (
                                        <p>{error}</p>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table text-wrap mb-0 align-middle text-center">
                                                <thead className="text-dark fs-4">
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Description</th>
                                                        <th>Topic</th>
                                                        <th>Start Time</th>
                                                        <th>End Time</th>
                                                        <th>Speaker</th>
                                                        <th>Location</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {paginatedSessions.map((session, index) => {
                                                        const event = events.find(loc => loc._id === session.title);
                                                        return (
                                                            <tr key={index}>
                                                                <td>{event.title}</td>
                                                                <td className='text-wrap'>{truncateText(session.description, 60)}</td>
                                                                <td>{session.topic}</td>
                                                                <td>{new Date(session.startTime).toLocaleTimeString('en-US')}</td>
                                                                <td>{new Date(session.endTime).toLocaleDateString('en-US')}</td>
                                                                <td>{session.speaker}</td>
                                                                <td>{session.location}</td>
                                                                <td>
                                                                    <Link to={`/deletesession/${session._id}`} className="btn btn-danger m-1">Delete</Link>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>
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
