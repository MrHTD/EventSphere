import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, FloatingLabel, Container, Row, Col, Card, Button, Alert, InputGroup } from 'react-bootstrap';
import bcrypt from 'bcryptjs-react';
import axios from 'axios'
import logo from '../assets/dark-logo.svg';

const EditExpoEvent = () => {
    const { id } = useParams();
    const [data, setdata] = useState({
        title: "",
        date: "",
        description: "",
        location: "",
        theme: "",
        organizer: "",
        status: "",
        contact: {
            name: "",
            email: "",
            phone: "",
        },
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    // useEffect(() => {
    //     // Check if the user is already logged in
    //     const loggedInUser = localStorage.getItem('user');
    //     if (!loggedInUser) {
    //         // Redirect to the admin page
    //         navigate('/dashboard');
    //     }
    // }, [navigate]);


    const GetFormValue = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdata(prevData => {
            if (name.startsWith("contact.")) {
                const fieldName = name.substring(8);
                return {
                    ...prevData,
                    contact: {
                        ...prevData.contact,
                        [fieldName]: fieldName === 'phone' ? parseInt(value, 10) : value
                    }
                };
            } else {
                return { ...prevData, [name]: value };
            }
        });
    };


    // Function to format date as YYYY-MM-DD
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const formattedDate = dateObj.toISOString().split('T')[0];
        return formattedDate;
    };

    useEffect(() => {
        axios.get("http://localhost:3000/getexpoeventsbyid/" + id)
            .then(result => {
                console.log(result);
                result.data.date = formatDate(result.data.date);
                setdata(result.data);
            })
            .catch(error => console.log(error));
    }, [id]);

    const EditExpoEventBtn = (e) => {
        e.preventDefault();

        if (!data.title || !data.date || !data.status || !data.description || !data.location || !data.theme || !data.organizer || !data.contact.name || !data.contact.email || !data.contact.phone) {
            setError("Please fill in all fields");
            setTimeout(() => {
                setError("");
            }, 2000);
            return;
        }

        const updatedUserData = {
            title: data.title,
            date: data.date,
            description: data.description,
            location: data.location,
            theme: data.theme,
            organizer: data.organizer,
            status: data.status,
            contact: {
                name: data.contact.name,
                email: data.contact.email,
                phone: data.contact.phone,
            }
        };

        axios.put("http://localhost:3000/editexpoevent/" + id, updatedUserData)
            .then(response => {
                console.log(response)
                setSuccess('Event Updated');
                setTimeout(() => {
                    setSuccess("");
                }, 2000);
                navigate("/expo");
            })
            .catch(error => {
                console.log(error);
            });
    };


    return (
        <>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">

                    <Container>
                        <Row className="justify-content-center">
                            <Col md={12} lg={12} xxl={6}>
                                {/* error */}
                                {error && <Alert className="alert alert-danger" role="alert">{error}</Alert>}
                                {success && <Alert className="alert alert-success" role="alert">{success}</Alert>}

                                <Card className="mb-0">
                                    <Card.Body>
                                        <Link to="./index.html" className="text-nowrap logo-img text-center d-block py-3 w-100">
                                            <img src={logo} width="180" alt="" />
                                        </Link>
                                        <p className="text-center">Edit User</p>
                                        {data ?
                                            <Form>

                                                <Row>

                                                    <Col>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Title</Form.Label>
                                                            <Form.Control type="text" aria-describedby="emailHelp" name='title' onChange={GetFormValue} value={data.title} required />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Date</Form.Label>
                                                            <Form.Control type="date" aria-describedby="emailHelp" name='date' onChange={GetFormValue} value={data.date} required />
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
                                                            <Form.Control type="text" name='organizer' onChange={GetFormValue} value={data.organizer} required />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Status</Form.Label>
                                                    <Form.Select name="status" onChange={GetFormValue} value={data.status} required>
                                                        <option value="">Select Status</option>
                                                        <option value="upcoming">Upcoming</option>
                                                        <option value="ongoing">Ongoing</option>
                                                        <option value="ended">Ended</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Row>
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
                                                </Row>

                                                <Button variant="primary" className="w-100 py-2 fs-4 mb-4 rounded-2" onClick={EditExpoEventBtn}>Update</Button>
                                            </Form> : ""}
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

export default EditExpoEvent