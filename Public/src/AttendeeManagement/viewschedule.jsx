import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Sidebar } from '../sidebar';
import { DashboardHeader } from '../dashboardheader';
import { Link } from 'react-router-dom';
import PPagination from '../Components/pagination';
import { IconBookmark, IconBookmarkFilled } from '@tabler/icons-react';

export const ScheduleManagement = () => {
    const [data, setData] = useState([]);
    const [events, setEvents] = useState([]);
    const [bookmarkedSessions, setBookmarkedSessions] = useState([]);

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

        // Load bookmarked sessions from local storage
        const storedBookmarks = JSON.parse(localStorage.getItem('bookmarkedSessions')) || [];
        setBookmarkedSessions(storedBookmarks);
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

    const toggleBookmark = (sessionId) => {
        setBookmarkedSessions((prevBookmarkedSessions) => {
            let updatedBookmarks;
            if (prevBookmarkedSessions.includes(sessionId)) {
                updatedBookmarks = prevBookmarkedSessions.filter(id => id !== sessionId);
            } else {
                updatedBookmarks = [...prevBookmarkedSessions, sessionId];
            }

            // Save updated bookmarks to local storage
            localStorage.setItem('bookmarkedSessions', JSON.stringify(updatedBookmarks));

            return updatedBookmarks;
        });
    };

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">
            <Sidebar />
            <div className="body-wrapper">
                <header className="app-header">
                    <DashboardHeader />
                </header>
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <div className="card">
                                <div className="card-body">
                                    <Row>
                                        <Col>
                                            <h5 className="card-title fw-semibold mb-4">Session & Schedule</h5>
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
                                                        <th>Bookmark</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {paginatedSessions.map((session, index) => {
                                                        const event = events.find(loc => loc._id === session.title);
                                                        const isBookmarked = bookmarkedSessions.includes(session._id);

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
                                                                    <div onClick={() => toggleBookmark(session._id)} style={{ cursor: 'pointer' }}>
                                                                        {isBookmarked ? <IconBookmarkFilled /> : <IconBookmark />}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Link to={`/deletesession/${session._id}`} className="btn btn-primary m-1">Register</Link>
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