import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, FloatingLabel, Container, Row, Col, Card, Button, Alert, InputGroup } from 'react-bootstrap';
import bcrypt from 'bcryptjs-react';
import axios from 'axios'
import logo from './assets/dark-logo.svg';

const ResetPassword = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    
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
                                        <h4 className="text-center">Forget Password</h4>
                                        <form method="post">
                                            <div class="mb-3">
                                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                                <input type="password" name="password" className="form-control" id="password" />
                                            </div>

                                            <button className="w-100 btn btn-primary mb-4 rounded-2" type="submit">Forget
                                                Password</button>
                                        </form>
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

export default ResetPassword