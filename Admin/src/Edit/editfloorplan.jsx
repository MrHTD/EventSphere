import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, FloatingLabel, Container, Row, Col, Card, Button, Alert, InputGroup } from 'react-bootstrap';
import axios from 'axios'

const EditFloorPlan = () => {
    const { id } = useParams();
    const [data, setdata] = useState({
        expoId: "",
        boothNumber: "",
        description: ""
    });
    const [events, setEvents] = useState([]);
    const [booths, setBooths] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in
        const isLoggedIn = !!localStorage.getItem('user');

        // Redirect to the login page if the user is not logged in
        if (!isLoggedIn) {
            navigate('/'); // Adjust the login route accordingly
        }
    }, [navigate]);

    const GetFormValue = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/getfloorplanbyid/` + id)
            .then(result => {
                setdata(result.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, [id]);

    useEffect(() => {
        axios.get('http://localhost:3000/getexpoevents')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/getbooths')
            .then(response => {
                setBooths(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    const EditFloorPlanBtn = (e) => {
        e.preventDefault();

        if (!data.expoId || !data.boothNumber || !data.description) {
            setError("Please fill in all fields");
            setTimeout(() => {
                setError("");
            }, 2000);
            return;
        }

        const updatedData = {
            boothNumber: data.boothNumber,
            totalSpaces: data.totalSpaces,
        };

        axios.put("http://localhost:3000/editfloorplan/" + id, updatedData)
            .then(response => {
                console.log(response)
                setSuccess('Event Updated');
                setTimeout(() => {
                    setSuccess("");
                }, 2000);
                navigate("/floorplan");
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleEventChange = (e) => {
        const selectedEventTitle = e.target.value;
        const selectedEvent = events.find(event => event._id === selectedEventTitle);

        if (selectedEvent) {
            // Update boothNumber and expoId in the state
            setdata(prevData => ({
                ...prevData,
                // boothNumber: selectedEvent.boothNumber || "",
                expoId: selectedEvent._id || ""
            }));
        }
    };

    const handleBooth = (e) => {
        const selectedEventTitle = e.target.value;
        const selectedEvent = booths.find(booth => booth._id === selectedEventTitle);

        if (selectedEvent) {
            // Update boothNumber and expoId in the state
            setdata(prevData => ({
                ...prevData,
                boothNumber: selectedEvent._id || "",
            }));
        }
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
                                                <Form.Group controlId='expoId' label='expoId' className='mb-3 overflow-hidden'>
                                                    <Form.Label>Expo Id</Form.Label>
                                                    <Form.Select className='rounded-2' name='expoId' onChange={handleEventChange} value={data.expoId || ''} required>
                                                        <option disabled value=''>Select an Event</option>
                                                        {events.map(event => (
                                                            <option key={event._id} value={event._id}>
                                                                {event.title}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>

                                                <Form.Group controlId='boothNumber' label='boothNumber' className='mb-3 overflow-hidden'>
                                                    <Form.Label>Booth Number</Form.Label>
                                                    <Form.Select className='rounded-2' name='boothNumber' onChange={handleBooth} value={data.boothNumber || ''} required>
                                                        <option disabled value=''>Select an Booth Number</option>
                                                        {booths.map(booth => (
                                                            <option key={booth._id} value={booth._id}>
                                                                {booth.boothNumber}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Description</Form.Label>
                                                    <Form.Control as={"textarea"} rows={3} name='description' onChange={GetFormValue} value={data.description || ''} required />
                                                </Form.Group>
                                                <Button variant="primary" className="w-100 py-2 fs-4 mb-4 rounded-2" onClick={EditFloorPlanBtn}>Edit FloorPlan</Button>
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

export default EditFloorPlan