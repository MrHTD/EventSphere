import React, { useEffect, useState } from 'react'
import { Form, FloatingLabel, Container, Row, Col, Card, Button, Alert, InputGroup } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import logo from '/logo.png';

const Login = () => {
    const [data, setdata] = useState({ email: "", password: "", role: "" })
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [rememberDevice, setRememberDevice] = useState(false); // State for Remember this Device
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is already logged in
        const loggedInUser = localStorage.getItem('publicuser');
        if ( loggedInUser) {
            // Redirect to the admin page
            navigate('/dashboard');
        } else {
            navigate('/signin');
        }
    }, [navigate]);

    const GetFormValue = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    const LoginBtn = (e) => {
        e.preventDefault();
        if (!data.email || !data.password) {
            setError("Please fill in all fields");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }
        axios.post("http://localhost:3000/login", data)
            .then(result => {
                console.log(result);
                if (result.data.user.role == "Organizer") {
                    // Display an error for admin login attempts
                    setError("No User Found.");
                    setTimeout(() => {
                        setError("");
                    }, 3000);
                } else {
                    // Data Stored
                    localStorage.setItem('publicuser', JSON.stringify(result.data.user));
                    // Remember device functionality
                    if (rememberDevice) {
                        localStorage.setItem('rememberDevice', 'true');
                    } else {
                        localStorage.removeItem('rememberDevice');
                    }
                    navigate('/');
                }
            })
            .catch(error => {
                setError("Invalid email or password. Please try again.");
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
                        <Row className="justify-content-center">
                            <Col md={12} lg={12} xxl={6}>

                                {/* error */}
                                {error && <Alert className="alert alert-danger" role="alert">{error}</Alert>}
                                {success && <Alert className="alert alert-danger" role="alert">{success}</Alert>}

                                <Card className="mb-0">
                                    <Card.Body>
                                        <Link to="./index.html" className="text-nowrap logo-img text-center d-block py-3 w-100">
                                            <img src={logo} width="350" alt="" />
                                        </Link>
                                        <p className="text-center">Sign In</p>
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={GetFormValue} value={data.email} required />
                                            </Form.Group>
                                            <Form.Group className="mb-4">
                                                <Form.Label>Password</Form.Label>
                                                <InputGroup>
                                                    <Form.Control type="password" id="exampleInputPassword1" name='password' onChange={GetFormValue} value={data.password} required />
                                                </InputGroup>
                                            </Form.Group>
                                            <div className="d-flex align-items-center justify-content-between mb-4">
                                                <Form.Check
                                                    id="flexCheckChecked"
                                                    type={"checkbox"}
                                                    label={"Remember this Device"}
                                                    checked={rememberDevice}
                                                    onChange={(e) => setRememberDevice(e.target.checked)}
                                                />
                                                <Link to="/forgetpassword" className="text-primary fw-bold">Forgot Password ?</Link>
                                            </div>

                                            <Button variant="primary" className="w-100 py-2 fs-4 mb-4 rounded-2" onClick={LoginBtn}>Sign In</Button>

                                            <div className="d-flex align-items-center justify-content-center">
                                                <p className="fs-4 mb-0 fw-bold">New to Modernize?</p>
                                                <Link to="/signup" className="text-primary fw-bold ms-2">Create an account</Link>
                                            </div>
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

export default Login