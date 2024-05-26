import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, FloatingLabel, Container, Row, Col, Card, Button, Alert, InputGroup } from 'react-bootstrap';
import axios from 'axios';

function ReplyAdminChat() {
    const { id } = useParams();

    const user_id = localStorage.getItem('user');
    const object = user_id ? JSON.parse(user_id) : null;

    const [messages, setMessages] = useState([]);
    const [replyMessage, setReplyMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchMessages = () => {
            axios.get("http://localhost:3000/api/getmessagesbyid/" + id)
                .then(response => {
                    if (Array.isArray(response.data)) {
                        setMessages(response.data.reverse());
                        console.log(response.data);
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

    const handleReplyMessage = () => {
        if (!replyMessage.trim()) return; // Prevent sending empty messages

        // Send the reply message to the server
        axios.post('http://localhost:3000/api/postmessages', { text: replyMessage, user: object.username, userId: id })
            .then(response => {
                setMessages([...messages, response.data]);
                setReplyMessage('');
            })
            .catch(error => {
                console.error('Error sending message:', error);
                setError('Error sending message');
            });
    };
    // Function to format timestamp into a human-readable form
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US'); // Adjust the format as needed
    };


    return (
        <div>
            {loading ? (
                <p>Loading messages...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                    data-sidebar-position="fixed" data-header-position="fixed">
                    <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">

                        <Container>
                            <Row className="justify-content-center p-5">
                                <Col md={8} lg={8}>
                                    {/* {success && <Alert className="alert alert-success" role="alert">{success}</Alert>} */}

                                    <Card className="mb-0">
                                        <Card.Body>
                                            <h3 className="text-center">Support</h3>
                                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                {messages.map((message, index) => (
                                                    <Container key={index} >
                                                        <Row className="mb-2">
                                                            <Col>
                                                                <p><strong>{message.user}:</strong> {message.text}</p>
                                                            </Col>
                                                            <Col className="text-end">
                                                                <small>{formatTimestamp(message.timestamp)}</small>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                ))}
                                            </div>
                                            <Form>
                                                <Row>
                                                    <Col md={10}>
                                                        <Form.Group>
                                                            <Form.Control type="text" value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} placeholder="Type a reply..." />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={2}>
                                                        <Form.Group>
                                                            <Button variant="success" className="rounded-2" onClick={handleReplyMessage}>Reply</Button>
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

export default ReplyAdminChat;
