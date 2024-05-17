import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import logo from '/logo.png';

const EditUser = () => {
    const { id } = useParams();
    const [data, setData] = useState({ username: "", image: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPreviewImage(URL.createObjectURL(file));
        setData({ ...data, image: file });
    };

    const EditUserBtn = (e) => {
        e.preventDefault();

        if (!data.username) {
            setError("Please fill in all fields");
            setTimeout(() => {
                setError("");
            }, 2000);
            return;
        }

        let file = document.getElementById("image");

        // Check if a file is selected
        if (file.files.length == 0) {
            setError("Please select a profile picture");
            setTimeout(() => {
                setError("");
            }, 2000);
            return;
        }

        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('image', data.image);

        axios.put(`http://localhost:3000/edituser/${id}`, formData)
            .then(response => {
                console.log(response);
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
                console.error("Error updating user:", error);
            });
    };

    useEffect(() => {
        axios.get(`http://localhost:3000/getUserbyid/${id}`)
            .then(result => {
                setData(result.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, [id]);

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">
            <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={12} lg={12} xxl={6}>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            <Card className="mb-3">
                                <Card.Body>
                                    <img src={logo} className='img-fluid' width="350" alt="" />
                                    <p className="text-center">Edit User</p>
                                    <Form encType='multipart/form-data'>
                                        {data.image && !previewImage &&
                                            <div className="text-center">
                                                <img src={`http://localhost:3000/Uploads/${data.image}`} width={150} alt="Current User" className="img-fluid rounded-auto rounded-4 mb-3" />
                                            </div>
                                        }
                                        {previewImage &&
                                            <div className="text-center">
                                                <img src={previewImage} width={150} alt="New User" className="img-fluid rounded-auto rounded-4 mb-3" />
                                            </div>
                                        }
                                        <Form.Group className="mb-3">
                                            <Form.Label>Profile Picture</Form.Label>
                                            <Form.Control type="file" id="image" aria-describedby="emailHelp" name='image' onChange={handleFileChange} required />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="text" id="exampleInputUsername" aria-describedby="emailHelp" name='username' value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} required />
                                        </Form.Group>
                                        <Button variant="primary" className="w-100 py-2 fs-4 mb-4 rounded-2" onClick={EditUserBtn}>Update</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default EditUser;
