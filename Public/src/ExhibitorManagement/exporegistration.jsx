import React, { useEffect, useState } from 'react'
import { Form, FloatingLabel, Container, Row, Col, Card, Button, Alert, InputGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

const ExpoRegister = () => {
    const user_id = localStorage.getItem('publicuser');
    const object = user_id ? JSON.parse(user_id) : null;

    const { id } = useParams();
    const [data, setdata] = useState(
        {
            expoId: id,
            exhibitorId: object._id,
            companyName: "",
            companyWebsite: "",
            companyAddress: "",
            contactPersonName: "",
            contactEmail: "",
            contactPhone: "",
            productsServices: "",
            requiredDocuments: "",
            approvalStatus: "Pending",
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
        axios.get('http://localhost:3000/getexpoevents')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    const RegisterBtn = (e) => {
        e.preventDefault();

        if (!data.expoId || !data.exhibitorId || !data.companyName || !data.companyWebsite || !data.companyAddress || !data.contactPersonName || !data.contactEmail || !data.contactPhone || !data.productsServices || !data.requiredDocuments) {
            setError("Please fill in all fields.");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }
        axios.post("http://localhost:3000/exporegister", data)
            .then(result => {
                console.log(result);
                setSuccess("Event added successfully");
                navigate('/dashboard');
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
                expoId: selectedEvent._id || ""
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
                                {success && <Alert className="alert alert-danger" role="alert">{success}</Alert>}
                                <Card className="mb-0">
                                    <Card.Header></Card.Header>
                                    <h2 className="text-center fw-bold text-uppercase">Register For Expo</h2>
                                    <Card.Body>
                                        <Form>
                                            <Form.Group controlId='expoId' label='expoId' className='mb-3 overflow-hidden'>
                                                <Form.Label>Expo Event</Form.Label>
                                                <Form.Select className='rounded-2' name='expoId' onChange={handleEventChange} value={id} disabled>
                                                    <option disabled value=''>Select an Event</option>
                                                    {events
                                                        .filter(event => {
                                                            const eventDate = new Date(event.startDate);
                                                            const currentDate = new Date();
                                                            return eventDate >= currentDate && event.status === 'upcoming';
                                                        })
                                                        .map(event => (
                                                            <option key={event._id} value={event._id}>
                                                                {event.title} - {new Date(event.startDate).toLocaleDateString()}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            </Form.Group>

                                            <Row>
                                                <Col>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Company Name</Form.Label>
                                                        <Form.Control type='text' name='companyName' onChange={GetFormValue} value={data.companyName || ''} required />
                                                    </Form.Group>
                                                </Col>
                                                <Col>

                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Company Website</Form.Label>
                                                        <Form.Control type='text' name='companyWebsite' onChange={GetFormValue} value={data.companyWebsite || ''} required />
                                                    </Form.Group>
                                                </Col>
                                            </Row>


                                            <Form.Group className="mb-3">
                                                <Form.Label>Person Name</Form.Label>
                                                <Form.Control type='text' name='contactPersonName' onChange={GetFormValue} value={data.contactPersonName || ''} required />
                                            </Form.Group>

                                            <Row>
                                                <Col>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Contact Email</Form.Label>
                                                        <Form.Control type='text' name='contactEmail' onChange={GetFormValue} value={data.contactEmail || ''} required />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Contact Phone</Form.Label>
                                                        <Form.Control type='phone' name='contactPhone' onChange={GetFormValue} value={data.contactPhone || ''} required />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Company Address</Form.Label>
                                                <Form.Control as="textarea" rows={3} name='companyAddress' onChange={GetFormValue} value={data.companyAddress || ''} required />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Products/Services</Form.Label>
                                                <Form.Control as="textarea" rows={3} name='productsServices' onChange={GetFormValue} value={data.productsServices || ''} />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Required Documents</Form.Label>
                                                <Form.Control as="textarea" rows={3} name='requiredDocuments' onChange={GetFormValue} value={data.requiredDocuments || ''} required />
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

export default ExpoRegister