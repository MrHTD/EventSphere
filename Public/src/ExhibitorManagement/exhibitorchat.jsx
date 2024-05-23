import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
// import Message from '../AttendeeManagement/Message';

function ExhibitorChat() {
    const { id } = useParams();

    const user_id = localStorage.getItem('publicuser');
    const object = user_id ? JSON.parse(user_id) : null;

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    function Message({ text, user }) {
        return (
            <div style={{ marginBottom: '10px' }}>
                <p><strong>{user}:</strong> {text}</p>
            </div>
        );
    }

    useEffect(() => {
        const fetchMessages = () => {
            axios.get("http://localhost:3000/api/exhibitormessagesbyid/" + id)
            axios.get("http://localhost:3000/api/exhibitormessagesbyid/" + object._id)
                .then(response => {
                    if (Array.isArray(response.data)) {
                        console.log(response.data);

                        setMessages(response.data);
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
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        axios.post('http://localhost:3000/api/postexhibitormessages', { text: newMessage, sender: object.username, senderId: id, recieverId: object._id })
            .then(response => {
                setMessages([...messages, response.data]);
                setNewMessage('');
            })
            .catch(error => {
                console.error('Error sending message:', error);
                setError('Error sending message');
            });
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US');
    };

    return (
        <div>
            {loading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            ) : error ? (
                <p className="text-center text-danger mt-5">{error}</p>
            ) : (
                <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                    data-sidebar-position="fixed" data-header-position="fixed">
                    <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                        <Container>
                            <Row className="justify-content-center p-5">
                                <Col md={8} lg={8}>
                                    <Card className="mb-0">
                                        <Card.Body>
                                            <h3 className="text-center">Exhibitor Chat</h3>
                                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                {messages.map((message, index) => (
                                                    <Container key={index}>
                                                        <Row className="mb-2">
                                                            <Col>
                                                                <p><strong>{message.sender}:</strong> {message.text}</p>
                                                            </Col>
                                                            <Col className="text-end">
                                                                <small>{formatTimestamp(message.timestamp)}</small>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                ))}
                                                <div ref={messagesEndRef} />
                                            </div>
                                            <Form>
                                                <Row>
                                                    <Col md={10}>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type="text"
                                                                value={newMessage}
                                                                onChange={(e) => setNewMessage(e.target.value)}
                                                                placeholder="Type a message..."
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={2}>
                                                        <Form.Group>
                                                            <Button variant="success" className="rounded-2" onClick={handleSendMessage}>Send</Button>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ExhibitorChat;
