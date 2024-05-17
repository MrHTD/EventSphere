import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, FloatingLabel, Container, Row, Col, Card, Button, Alert, InputGroup } from 'react-bootstrap';
import axios from 'axios'

const EditExpoEvent = () => {
    const { id } = useParams();
    const [data, setdata] = useState({
        title: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        description: "",
        location: "",
        theme: "",
        organizer: "",
        status: "",
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

    // Function to format date as YYYY-MM-DD
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const formattedDate = dateObj.toISOString().split('T')[0];
        return formattedDate;
    };

    const formatTime = (timeString) => {
        const timeObj = new Date(timeString);
        const formattedTime = timeObj.toISOString().split('T')[1].substring(0, 5); // Extract HH:mm
        return formattedTime;
    };

    useEffect(() => {
        axios.get("http://localhost:3000/getexpoeventsbyid/" + id)
            .then(result => {
                console.log(result);
                result.data.startDate = formatDate(result.data.startDate);
                result.data.endDate = formatDate(result.data.endDate);
                result.data.startTime = formatTime(result.data.startTime);
                result.data.endTime = formatTime(result.data.endTime);
                setdata(result.data);
            })
            .catch(error => console.log(error));
    }, [id]);

    const EditExpoEventBtn = (e) => {
        e.preventDefault();

        if (!data.title || !data.startDate || !data.endDate || !data.endDate || !data.startTime || !data.status || !data.description || !data.location || !data.theme || !data.organizer) {
            setError("Please fill in all fields");
            setTimeout(() => {
                setError("");
            }, 2000);
            return;
        }

        const updatedUserData = {
            title: data.title,
            startDate: data.startDate,
            endDate: data.endDate,
            startTime:  data.startTime,
            endTime:  data.endTime,
            description: data.description,
            location: data.location,
            theme: data.theme,
            organizer: data.organizer,
            status: data.status,
        };

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

        axios.put("http://localhost:3000/editexpoevent/" + id, {...updatedUserData, ...requestData})
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
                        <Row className="justify-content-center p-5">
                            <Col md={8} lg={8}>
                                {/* error */}
                                {error && <Alert className="alert alert-danger" role="alert">{error}</Alert>}
                                {success && <Alert className="alert alert-success" role="alert">{success}</Alert>}

                                <Card className="mb-0">
                                    <Card.Body>
                                        <h3 className="text-center">Edit User</h3>
                                        {data ?
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