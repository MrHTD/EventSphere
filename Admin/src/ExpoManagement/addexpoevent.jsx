import React, { useEffect, useState } from 'react'
import { Form, FloatingLabel, Container, Row, Col, Card, Button, Alert, InputGroup } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'

const AddExpoEvent = () => {
    const [data, setdata] = useState({
        title: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        location: "",
        theme: "",
        organizer: "Admin",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    // useEffect(() => {
    //     // Check if the user is already logged in
    //     const loggedInUser = localStorage.getItem('user');
    //     if (loggedInUser) {
    //         // Redirect to the admin page
    //         navigate('/dashboard');
    //     } else {
    //         navigate('/');
    //     }
    // }, [navigate]);

    const GetFormValue = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    const LoginBtn = (e) => {
        e.preventDefault();

        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);

        if (endDate < startDate) {
            setError("End date cannot be older than the start date.");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }

        const startTime = new Date();
        startTime.setHours(parseInt(data.startTime.split(":")[0]));
        startTime.setMinutes(parseInt(data.startTime.split(":")[1]));

        const endTime = new Date();
        endTime.setHours(parseInt(data.endTime.split(":")[0]));
        endTime.setMinutes(parseInt(data.endTime.split(":")[1]));

        const requestData = {
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString()
        };

        if (!data.title || !data.startDate || !data.endDate || !data.startTime || !data.endTime || !data.description || !data.location || !data.theme || !data.organizer) {
            setError("Please fill in all fields.");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }
        axios.post("http://localhost:3000/addexpoevent", { ...data, ...requestData })
            .then(result => {
                setSuccess("Event added successfully");
                console.log(result);
                navigate('/expo');
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

    return (
        <>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                    <Container>
                        <Row className="justify-content-center p-5">
                            <Col md={8} lg={8}>

                                {/* error */}
                                {error && <Alert className="alert alert-danger" role="alert">{error}</Alert>}
                                {success && <Alert className="alert alert-danger" role="alert">{success}</Alert>}

                                <Card className="mb-0">
                                    <Card.Header></Card.Header>
                                    <h2 className="text-center fw-bold text-uppercase">Add Event</h2>
                                    <Card.Body>
                                        <Form>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control type="text" aria-describedby="emailHelp" name='title' onChange={GetFormValue} value={data.title} required />
                                            </Form.Group>

                                            <Row>
                                                <Col>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Start Date</Form.Label>
                                                        <Form.Control type="date" aria-describedby="emailHelp" name='startDate' onChange={GetFormValue} value={data.startDate} required />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>End Date</Form.Label>
                                                        <Form.Control type="date" aria-describedby="emailHelp" name='endDate' onChange={GetFormValue} value={data.endDate} required />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Start Time</Form.Label>
                                                        <Form.Control type="time" aria-describedby="emailHelp" name='startTime' onChange={GetFormValue} value={data.startTime} required />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>End Time</Form.Label>
                                                        <Form.Control type="time" aria-describedby="emailHelp" name='endTime' onChange={GetFormValue} value={data.endTime} required />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control as="textarea" rows={3} name='description' onChange={GetFormValue} value={data.description} required />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Location</Form.Label>
                                                <Form.Control as="textarea" rows={2} name='location' onChange={GetFormValue} value={data.location} required />
                                            </Form.Group>
                                            <Row>
                                                <Col>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Theme</Form.Label>
                                                        <Form.Control type="text" name='theme' onChange={GetFormValue} value={data.theme} required />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Organizer</Form.Label>
                                                        <Form.Control disabled type="text" name='organizer' onChange={GetFormValue} value={data.organizer} required />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            {/* <Row>
                                                <Col>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Name</Form.Label>
                                                        <Form.Control type="text" name='contact.name' onChange={handleChange} value={data.contact.name} required />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control type="email" name='contact.email' onChange={handleChange} value={data.contact.email} required />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Phone</Form.Label>
                                                        <Form.Control type="number" maxLength={11} name='contact.phone' onChange={handleChange} value={data.contact.phone} required />
                                                    </Form.Group>
                                                </Col>
                                            </Row> */}

                                            <Button variant="primary" className="w-100 py-2 fs-4 mb-4 rounded-2" onClick={LoginBtn}>Add Event</Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default AddExpoEvent