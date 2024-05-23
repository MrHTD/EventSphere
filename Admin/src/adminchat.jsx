import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Dropdown, Form, FloatingLabel, Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import Message from './Message';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { Link } from 'react-router-dom';
import APagination from './pagination';

function AdminChat() {
    const user_id = localStorage.getItem('user');
    const object = user_id ? JSON.parse(user_id) : null;

    const [messages, setMessages] = useState([]);
    const [replyMessage, setReplyMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10); // Number of users per page

    useEffect(() => {
        const fetchMessages = () => {
            axios.get('http://localhost:3000/api/messages')
                .then(response => {
                    if (Array.isArray(response.data)) {
                        // Filter out duplicate messages for each user and keep only the latest one
                        const latestMessages = response.data.reduce((acc, message) => {
                            const existingIndex = acc.findIndex(m => m.userId === message.userId);
                            if (existingIndex !== -1) {
                                const existingMessage = acc[existingIndex];
                                if (new Date(message.timestamp) > new Date(existingMessage.timestamp)) {
                                    acc[existingIndex] = message; // Update with the latest message
                                }
                            } else {
                                acc.push(message);
                            }
                            return acc;
                        }, []);
                        setMessages(latestMessages);
                        setError(null); // Clear any previous errors
                    } else {
                        setError('Unexpected response format');
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                    setError('Error fetching messages');
                    setLoading(false);
                });
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 5000); // Fetch messages every 5 seconds

        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        // Scroll to the bottom when messages change
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    // Pagination
    const totalPages = Math.ceil(messages.length / postsPerPage);

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    const paginatedData = messages.slice(startIndex, endIndex);

    return (
        // <div>
        //     {loading ? (
        //         <p>Loading messages...</p>
        //     ) : error ? (
        //         <p>{error}</p>
        //     ) : (
        //         <div>
        //             <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        //                 {messages.map(message => (
        //                     <Message key={message._id} text={message.text} user={message.user} />
        //                 ))}
        //                 <div ref={messagesEndRef} />
        //             </div>

        //         </div>
        //     )}
        // </div>
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
                                                                <h6 className="fw-semibold mb-0">Sender Name</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Message</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Action</h6>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    {loading ? (
                                                        <p>Loading messages...</p>
                                                    ) : error ? (
                                                        <p>{error}</p>
                                                    ) : (
                                                        <tbody>
                                                            {
                                                                paginatedData.map((msg, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td className="border-bottom-0 text-wrap"><h6 className="fw-semibold mb-0"><span className='text-muted'>Reply By: </span>{msg.user}</h6></td>
                                                                            <td className="border-bottom-0 text-wrap"><h6 className="fw-semibold mb-0">{msg.text}</h6></td>                                                                       <td className="border-bottom-0 text-wrap">
                                                                                <Link to={`/replychat/${msg.userId}`} type="button" className="btn btn-primary m-1">Reply</Link>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                }
                                                                )
                                                            }
                                                        </tbody>
                                                    )}
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
    );
}

export default AdminChat;
