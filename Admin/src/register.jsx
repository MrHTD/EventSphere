import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Form, FloatingLabel, Container, Row, Col, Card, Button, Alert, InputGroup } from 'react-bootstrap';
import bcrypt from 'bcryptjs-react';
import axios from 'axios'
import logo from '/logo.png';

const Register = () => {
    const [data, setdata] = useState({ username: "", email: "", password: "", role: "Organizer" })
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [previewImage, setPreviewImage] = useState(null);

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
        setdata({ ...data, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setdata({ ...data, image: e.target.files[0] });
        const file = e.target.files[0];
        setdata({ ...data, image: file })

        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl); // Set the preview URL in state
    };

    const RegisterBtn = (e) => {
        e.preventDefault();

        if (!data.username || !data.email || !data.password || !data.image) {
            setError("Please fill in all fields");
            setTimeout(() => {
                setError("");
            }, 2000);
            return;
        }

        console.log(data.image);

        axios.post("http://localhost:3000/register", { username: data.username, email: data.email })
            .then(response => {
                if (response.data.exists) {
                    setError("Username or email already exists");
                    setTimeout(() => {
                        setError("");
                    }, 2000);
                } else {
                    bcrypt.hash(data.password, 10)
                        .then((hashedPassword) => {
                            // Update the data object with the hashed password
                            const updatedData = { ...data, password: hashedPassword };

                            const formData = new FormData();
                            formData.append("username", data.username);
                            formData.append("email", data.email);
                            formData.append("password", hashedPassword);
                            formData.append("role", data.role);
                            formData.append("image", data.image);

                            axios.post("http://localhost:3000/register", formData)
                                .then(result => {
                                    setSuccess("User registered successfully");
                                    console.log(result);
                                    setTimeout(() => {
                                        setSuccess("");
                                        navigate('/');
                                    }, 2000);
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        }
                        )
                }
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
                                            <img src={logo} className='img-fluid' width={350} alt="" />
                                        </Link>
                                        <p className="text-center">Register</p>
                                        <Form encType='multipart/form-data'>
                                            <Form.Control type="hidden" className='rounded-2' placeholder="role" name='role' />

                                            {previewImage && <img src={previewImage} width={150} alt="Selected User" className="img-fluid rounded-auto rounded-4" />}
                                            <Form.Group className="mb-3">
                                                <Form.Label>Profile Image</Form.Label>
                                                <Form.Control type="file" name='image' onChange={handleFileChange} required />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control type="text" id="exampleInputUsername" aria-describedby="emailHelp" name='username' onChange={GetFormValue} value={data.username} required />
                                            </Form.Group>


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

                                            <Button variant="primary" className="w-100 py-2 fs-4 mb-4 rounded-2" onClick={RegisterBtn}>Sign Up</Button>

                                            <div className="d-flex align-items-center justify-content-center">
                                                <p className="fs-4 mb-0 fw-bold">Already have an Account?</p>
                                                <Link to="/" className="text-primary fw-bold ms-2">Sign In</Link>
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

export default Register