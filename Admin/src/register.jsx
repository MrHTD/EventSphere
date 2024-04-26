import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, FloatingLabel, Container, Row, Col, Card, Button } from 'react-bootstrap';
import bcrypt from 'bcryptjs-react';
import axios from 'axios'

const Register = () => {
    const [data, setdata] = useState({username: "", email: "", password: "", role: "Organizer" })
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is already logged in
        const loggedInUser = localStorage.getItem('user');
        if (!loggedInUser) {
            // Redirect to the admin page
            navigate('/dashboard');
        }
    }, [navigate]);


    const GetFormValue = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    const RegisterBtn = (e) => {
        e.preventDefault();
        // Check if any of the fields are empty
        if (!data.username || !data.email || !data.password) {
            setSuccess("Please fill in all fields");
            setTimeout(() => {
                setSuccess("");
            }, 3000);
            return;
        }

        // Hash the password using bcrypt
        bcrypt.hash(data.password, 10)
            .then((hashedPassword) => {
                // Update the data object with the hashed password
                const updatedData = { ...data, password: hashedPassword };
                axios.post("http://localhost:3000/register", updatedData)
                    .then(result => {
                        console.log(result);
                        console.log('User Added');
                        setdata({
                            username: "", email: "", password: "", role: "Organizer"
                        });
                        navigate('/', 2000);
                    })
                    .catch((error) => {
                        console.log(error);
                        // Handle the error, e.g., display an error message to the user
                    });
            }
            )
    }

    return (
        <Container className='position-absolute top-50 start-50 translate-middle text-center'>
            <Row className='d-grid gap-2'>
                <Col xs={12} sm={10} md={12} lg={8} className='mx-auto'>

                    <Card className='rounded-5 bg-white p-5 border-0 shadow-lg'>
                        <Col className='text-center mb-3 mx-auto'>
                            <h1 className='me-auto fw-bold text-uppercase'>Create an Account</h1>
                            <h5 className='me-auto fw-normal'>Enter Your Account Details</h5>
                        </Col>
                        <Row>
                            <Col>
                                <Form>
                                    <Form.Control type="hidden" className='rounded-2' placeholder="role" name='role' />

                                    <FloatingLabel controlId="username" label="Username" className='mb-3 overflow-hidden rounded-2'>
                                        <Form.Control type="text" className='rounded-2' placeholder="Username" name='username' onChange={GetFormValue} value={data.username} required />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="email" label="Email" className="mb-3 overflow-hidden rounded-2">
                                        <Form.Control type="email" className='rounded-2' placeholder="Email" name='email' onChange={GetFormValue} value={data.email} required />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="password" label="Password" className='overflow-hidden rounded-2'>
                                        <Form.Control type="password" className='rounded-2' placeholder="Password" name='password' onChange={GetFormValue} value={data.password} required />
                                    </FloatingLabel>

                                    <div className="position-relative mt-5">
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                            <Button className='w-auto fw-semibold px-3 rounded-5' as="input" type="submit" value="Register" onClick={RegisterBtn} />
                                        </div>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Register