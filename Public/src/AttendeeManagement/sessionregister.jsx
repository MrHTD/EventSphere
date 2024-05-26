import React, { useEffect, useState } from 'react'
import { Form, FloatingLabel, Container, Row, Col, Card, Button, Alert, InputGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

const SessionRegister = () => {
    const user_id = localStorage.getItem('publicuser');
    const object = user_id ? JSON.parse(user_id) : null;

    const { id } = useParams();
    const [data, setdata] = useState(
        {
            sessionId: id,
            attendeeId: object._id,
            Name: object.username,
            Email: object.email,
            Phone: "",
        }
    );
    const [events, setEvents] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const GetFormValue = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    };

    console.log(data);

    useEffect(() => {
        axios.get('http://localhost:3000/getSession')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => console.log(error));
    }, []);
    console.log(data);

    const RegisterBtn = (e) => {
        e.preventDefault();

        if (!data.sessionId || !data.attendeeId || !data.Name || !data.Email || !data.Phone) {
            setError("Please fill in all fields.");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }
        axios.post("http://localhost:3000/sessionregister", data)
            .then(result => {
                console.log(result);
                setSuccess("Event added successfully");
                navigate('/schedulemanagement');
            })
            .catch(error => {
                console.log(error);
                setError("Please try again.");
                // Hide the error after 3 seconds (adjust the duration as needed)
                setTimeout(() => {
                    setError("");
                }, 3000);
            });
    }

    const handleEventChange = (e) => {
        const selectedEventTitle = e.target.value;
        const selectedEvent = events.find(event => event._id === selectedEventTitle);

        if (selectedEvent) {
            setdata(prevData => ({
                ...prevData,
                sessionId: selectedEvent._id || ""
            }));
        }
    };


    return (
        <>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                    <Container>
                        <Row className="justify-content-center p-5">
                            <Col sm={12} md={12} lg={8} xxl={8}>
                                {error && <Alert className="alert alert-danger" role="alert">{error}</Alert>}
                                {success && <Alert className="alert alert-success" role="alert">{success}</Alert>}
                                <Card className="mb-0">
                                    <Card.Header></Card.Header>
                                    <h2 className="text-center fw-bold text-uppercase">Register For Session</h2>
                                    <Card.Body>
                                        <Form>
                                            <Form.Group controlId='sessionId' label='sessionId' className='mb-3 overflow-hidden'>
                                                <Form.Label>Session</Form.Label>
                                                <Form.Select className='rounded-2' name='sessionId' onChange={handleEventChange} value={id} disabled>
                                                    <option disabled value=''>Select an Event</option>
                                                    {events.map(event => (
                                                            <option key={event._id} value={event._id}>
                                                                {event.topic}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type='text' name='Name' onChange={GetFormValue} value={data.Name || ''} required />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type='email' disabled name='Email' onChange={GetFormValue} value={data.Email || ''} required />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control type='phone' name='Phone' onChange={GetFormValue} value={data.Phone || ''} required />
                                            </Form.Group>

                                            <Button variant="primary" className="w-100 py-2 fs-4 mb-4 rounded-2" onClick={RegisterBtn}>Register</Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>)
}

export default SessionRegister