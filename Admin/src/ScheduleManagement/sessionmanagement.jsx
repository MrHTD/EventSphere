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
    const [timeslots, setTimeslots] = useState([]);
    const [locations, setLocations] = useState([]);
    const [speakers, setSpeakers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [sessionsPerPage] = useState(10);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const sessionResponse = await axios.get('http://localhost:3000/getSession');
                const eventResponse = await axios.get('http://localhost:3000/getSchedule');
                const timeslotResponse = await axios.get('http://localhost:3000/getTimeSlot');
                const locationResponse = await axios.get('http://localhost:3000/getLocations');
                const speakerResponse = await axios.get('http://localhost:3000/getSpeaker');

                setData(sessionResponse.data);
                setEvents(eventResponse.data);
                setTimeslots(timeslotResponse.data);
                setLocations(locationResponse.data);
                setSpeakers(speakerResponse.data);

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
                                            <h5 className="card-title fw-semibold mb-4">Session Management</h5>
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
                                            <table className="table text-nowrap mb-0 align-middle text-center">
                                                <thead className="text-dark fs-4">
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Description</th>
                                                        <th>Topic</th>
                                                        <th>Start Date</th>
                                                        <th>End Date</th>
                                                        <th>Event</th>
                                                        <th>Time Slot</th>
                                                        <th>Speakers</th>
                                                        <th>Location</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {paginatedSessions.map((session, index) => {
                                                        const location = locations.find(loc => loc._id === session.location);
                                                        const timeslot = timeslots.find(loc => loc._id === session.timeSlot);
                                                        const event = events.find(loc => loc._id === session.event);
                                                        return (
                                                            <tr key={index}>
                                                                <td>{session.title}</td>
                                                                <td>{session.description}</td>
                                                                <td>{session.topic}</td>
                                                                <td>{new Date(session.startTime).toLocaleDateString()}</td>
                                                                <td>{new Date(session.endTime).toLocaleDateString()}</td>
                                                                <td>{event.title}</td>
                                                                <td>{new Date(timeslot.startTime).toLocaleTimeString('en-US')}</td>
                                                                <td>
                                                                    {session.speakers.map((speakerId, index) => {
                                                                        const speaker = speakers.find(spk => spk._id === speakerId);
                                                                        return <span key={index}>{speaker ? speaker.name : 'Unknown'}{index !== session.speakers.length - 1 ? ', ' : ''}</span>;
                                                                    })}
                                                                </td>
                                                                <td>{location.name}</td>
                                                                <td>
                                                                    <Link to={`/editsessionevent/${session._id}`} className="btn btn-success m-1">Edit</Link>
                                                                    <Link to={`/deletesessionevent/${session._id}`} className="btn btn-danger m-1">Delete</Link>
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
