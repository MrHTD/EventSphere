import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, FloatingLabel, Container, Row, Col, Card, Button, Alert, InputGroup } from 'react-bootstrap';
import bcrypt from 'bcryptjs-react';
import axios from 'axios'
import logo from '../assets/dark-logo.svg';

const EditUser = () => {
    const { id } = useParams();
    const [data, setdata] = useState({ username: "" })
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

    useEffect(() => {
        axios.get("http://localhost:3000/getUserbyid/" + id)
            .then(result => {
                console.log(result);
                setdata(result.data);
                setdata({
                    username: result.data.username,
                });
            })
            .catch(error => console.log(error));
    }, [id]);

    const EditUserBtn = (e) => {
        e.preventDefault();

        if (!data.username) {
            setError("Please fill in all fields");
            setTimeout(() => {
                setError("");
            }, 2000);
            return;
        }

        const updatedUserData = {
            username: data.username
        };

        axios.put("http://localhost:3000/edituser/" + id, updatedUserData)
            .then(response => {
                console.log(response)
                // Get the existing user object from localStorage
                const user = JSON.parse(localStorage.getItem('user'));
                // Update the username field
                user.username = data.username;
                // Save the updated user object back to localStorage
                localStorage.setItem('user', JSON.stringify(user));
                setSuccess('User Updated');
                setTimeout(() => {
                    setSuccess("");
                }, 2000);
                navigate("/");
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
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Username</Form.Label>
                                                    <Form.Control type="text" id="exampleInputUsername" aria-describedby="emailHelp" name='username' onChange={GetFormValue} value={data.username} required />
                                                </Form.Group>

                                                <Button variant="primary" className="w-100 py-2 fs-4 mb-4 rounded-2" onClick={EditUserBtn}>Update</Button>
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

export default EditUser