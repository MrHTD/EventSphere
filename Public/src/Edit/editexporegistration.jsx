import React, { useEffect, useState } from 'react';
import { Form, Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditExpoRegister = () => {
    const user_id = localStorage.getItem('publicuser');
    const object = user_id ? JSON.parse(user_id) : null;

    const { id } = useParams();
    const [data, setdata] = useState({
        expoId: id,
        exhibitorId: object._id,
        companyName: "",
        companyWebsite: "",
        companyAddress: "",
        contactEmail: "",
        contactPhone: "",
        productsServices: "",
        requiredDocuments: "",
        approvalStatus: "",
    });
    const [events, setEvents] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const getFormValue = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        axios.get('http://localhost:3000/getexpoevents')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3000/getregisterexpobyid/" + id)
            .then(result => {
                setdata(result.data);
                console.log(result.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, [id]);

    const registerBtn = (e) => {
        e.preventDefault();

        if (!data.expoId || !data.exhibitorId || !data.companyName || !data.companyWebsite || !data.companyAddress || !data.contactEmail || !data.contactPhone || !data.productsServices || !data.requiredDocuments) {
            setError("Please fill in all fields.");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }

        const updatedData = {
            expoId: data.expoId,
            exhibitorId: data.exhibitorId,
            companyName: data.companyName,
            companyWebsite: data.companyWebsite,
            companyAddress: data.companyAddress,
            contactEmail: data.contactEmail,
            contactPhone: data.contactPhone,
            productsServices: data.productsServices,
            requiredDocuments: data.requiredDocuments,
            approvalStatus: data.approvalStatus,
        };

        axios.put(`http://localhost:3000/editexporegister/${id}`, updatedData)
            .then(result => {
                setSuccess("Event updated successfully");
                navigate('/registeredevent');
            })
            .catch(error => {
                setError("Please try again.");
                setTimeout(() => {
                    setError("");
                }, 3000);
            });
    };

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
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
            <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                <Container>
                    <Row className="justify-content-center p-5">
                        <Col sm={12} md={12} lg={8} xxl={8}>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}
                            <Card className="mb-0">
                                <Card.Header></Card.Header>
                                <h2 className="text-center fw-bold text-uppercase">Register For Expo</h2>
                                <Card.Body>
                                    {data ?
                                        <Form>
                                            <Form.Group controlId='expoId' label='expoId' className='mb-3 overflow-hidden'>
                                                <Form.Label>Expo Event</Form.Label>
                                                <Form.Select className='rounded-2' name='expoId' onChange={handleEventChange} value={data.expoId} disabled>
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
                                                        <Form.Control type='text' name='companyName' onChange={getFormValue} value={data.companyName || ""} required />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Company Website</Form.Label>
                                                        <Form.Control type='text' name='companyWebsite' onChange={getFormValue} value={data.companyWebsite || ""} required />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Contact Email</Form.Label>
                                                        <Form.Control type='email' name='contactEmail' onChange={getFormValue} value={data.contactEmail || ""} required />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Contact Phone</Form.Label>
                                                        <Form.Control type='text' name='contactPhone' onChange={getFormValue} value={data.contactPhone || ""} required />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Form.Group controlId='approvalStatus' className='mb-3 overflow-hidden'>
                                                <Form.Label>Approval Status</Form.Label>
                                                <Form.Select className='rounded-2' name='approvalStatus' value={data.approvalStatus} disabled>
                                                    <option>{data.approvalStatus}</option>
                                                </Form.Select>
                                            </Form.Group>


                                            <Form.Group className="mb-3">
                                                <Form.Label>Company Address</Form.Label>
                                                <Form.Control as="textarea" rows={3} name='companyAddress' onChange={getFormValue} value={data.companyAddress || ""} required />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Products/Services</Form.Label>
                                                <Form.Control as="textarea" rows={3} name='productsServices' onChange={getFormValue} value={data.productsServices || ""} required />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Required Documents</Form.Label>
                                                <Form.Control as="textarea" rows={3} name='requiredDocuments' onChange={getFormValue} value={data.requiredDocuments || ""} required />
                                            </Form.Group>

                                            <Button variant="primary" className="w-100 py-2 fs-4 mb-4 rounded-2" onClick={registerBtn}>Register</Button>
                                        </Form> : ""}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default EditExpoRegister;
