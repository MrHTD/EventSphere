import React, { useEffect, useState } from 'react'
import { Form, FloatingLabel, Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
    const [data, setdata] = useState({ email: "", password: "" })
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is already logged in
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            // Redirect to the admin page
            navigate('/dashboard');
        } else {
            navigate('/');
        }
    }, [navigate]);

    const GetFormValue = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    const LoginBtn = (e) => {
        e.preventDefault();
        if (!data.email || !data.password) {
            setSuccess("Please fill in all fields");
            setTimeout(() => {
                setSuccess("");
            }, 3000);
            return;
        }
        axios.post("http://localhost:3000/login", data)
            .then(result => {
                console.log(result);
                if (result.data.user.role == "Exhibitor" || result.data.user.role == "Attendee") {
                    // Display an error for admin login attempts
                    setError("No User Found.");
                    setTimeout(() => {
                        setError("");
                    }, 3000);
                } else {
                    // Data Stored
                    localStorage.setItem('user', JSON.stringify(result.data.user));
                    navigate('/dashboard');
                }
            })
            .catch(error => {
                console.log(error);
                setError("Invalid email or password. Please try again.");
                // Hide the error after 3 seconds (adjust the duration as needed)
                setTimeout(() => {
                    setError("");
                }, 3000);
            });
    }

    return (
        <>
            <Container className='position-absolute top-50 start-50 translate-middle text-center'>
                <Row className='d-grid gap-2'>
                    <Col xs={12} sm={10} md={12} lg={6} xl={6} className='mx-auto'>

                        {/* error */}
                        {error && <Alert className="alert alert-danger" role="alert">{error}</Alert>}
                        {success && <Alert className="alert alert-danger" role="alert">{success}</Alert>}

                        <Card className='rounded-5 bg-white p-5 border-0 shadow-lg'>
                            <Col className='text-center mb-3 mx-auto'>
                                <h1 className='me-auto fw-bold text-uppercase text-dark'>Sign in</h1>
                                <h5 className='me-auto fw-normal text-dark'>Enter Your Account</h5>
                            </Col>
                            <Row>
                                <Col>
                                    <Form>
                                        <FloatingLabel controlId="email" label="Email" className="mb-3 overflow-hidden rounded-2">
                                            <Form.Control type="email" className='rounded-2' placeholder="Email" name='email' onChange={GetFormValue} value={data.email} required />
                                        </FloatingLabel>
                                        <FloatingLabel controlId="password" label="Password" className='overflow-hidden rounded-2'>
                                            <Form.Control type="password" className='rounded-2' placeholder="Password" name='password' onChange={GetFormValue} value={data.password} required />
                                        </FloatingLabel>

                                        <div className="position-relative mt-5">
                                            <div className="d-grid gap-2 d-md-flex justify-content-sm-center justify-content-md-end">
                                                {/* <Link to='/adminsignup'><Button className='w-auto bg-transparent border-0 fw-semibold text-primary rounded-pill mb-2 mb-md-0' as="input" type="submit" value="Create Account" /></Link> */}
                                                <Button className='w-auto px-5 fw-semibold px-3 rounded-pill' as="input" type="submit" value="Login" onClick={LoginBtn} />
                                            </div>
                                        </div>
                                    </Form>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login