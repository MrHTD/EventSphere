import React, { useEffect, useState } from 'react'
import { Form, FloatingLabel, Container, Row, Col, Card, Button, Alert, InputGroup } from 'react-bootstrap';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios'

const ReserveBooth = () => {
    const user_id = localStorage.getItem('publicuser');
    const object = user_id ? JSON.parse(user_id) : null;

    const { id } = useParams();
    const [data, setdata] = useState({ userId: object._id, expo: id, booth: "", spacesReserved: "", status: "reserved" });
    const [events, setEvents] = useState([]);
    const [booths, setBooths] = useState([]);
    const [floorplan, setFloorPlan] = useState([]);
    const [boothsallocation, setBoothsAllocation] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const GetFormValue = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    };

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

    useEffect(() => {
        axios.get('http://localhost:3000/getfloorplans')
            .then(response => {
                setFloorPlan(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/getboothAllocations')
            .then(response => {
                setBoothsAllocation(response.data);
                console.log(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    const BoothBtn = (e) => {
        e.preventDefault();
        if (!data.expo || !data.booth || !data.spacesReserved) {
            setError("Please fill in all fields.");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }
        // Find the selected booth based on its ID
        const selectedBooth = booths.find(booth => booth._id === data.booth);

        if (!selectedBooth) {
            setError("Selected booth not found.");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }

        // Check if spacesReserved exceeds totalSpaces
        if (parseInt(data.spacesReserved) > selectedBooth.totalSpaces) {
            setError("Spaces reserved cannot exceed total available spaces.");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }

        // Check if totalSpaces is equal to reservedSpaces
        const boothAllocation = boothsallocation.find(allocation => allocation.expo === data.expo && allocation.booth === data.booth);
        if (boothAllocation && boothAllocation.spacesReserved === selectedBooth.totalSpaces) {
            setError("Total seats are already reserved for this expo.");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }

        // Check if spacesReserved exceeds available spaces
        const availableSpaces = selectedBooth.totalSpaces - selectedBooth.reservedSpaces;
        if (parseInt(data.spacesReserved) > availableSpaces) {
            setError("Spaces reserved exceeds available spaces.");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }

        axios.post("http://localhost:3000/addboothreservespace", {boothId: data.booth, reservedSpaces: data.spacesReserved})
            .then(result => {
                console.log(result);
                setSuccess("Space Reserve successfully");
                navigate('/viewfloorplan');
            })
            .catch(error => {
                console.log(error);
                setError("Please try again.");
                setTimeout(() => {
                    setError("");
                }, 3000);
            });

        axios.post("http://localhost:3000/boothAllocations", data)
            .then(result => {
                console.log(result);
                setSuccess("Event added successfully");
                // navigate('/floorplan');
            })
            .catch(error => {
                console.log(error);
                setError("Please try again.");
                setTimeout(() => {
                    setError("");
                }, 3000);
            });
    };

    console.log(data);

    const handleEventChange = (e) => {
        const selectedEventId = e.target.value;
        const selectedEvent = events.find(event => event._id === selectedEventId);

        if (selectedEvent) {
            // Find the booth allocation for the selected event
            const boothAllocation = boothsallocation.find(allocation => allocation.expo === selectedEventId);
            // Update booth and expo in the state
            setdata(prevData => ({
                ...prevData,
                expo: selectedEventId,
                booth: boothAllocation ? boothAllocation.booth : null, // Update booth to booth allocation if available
            }));
        }
    };


    const handleBooth = (e) => {
        const selectedEventTitle = e.target.value;
        const selectedEvent = booths.find(booth => booth._id === selectedEventTitle);

        if (selectedEvent) {
            // Update booth and expo in the state
            setdata(prevData => ({
                ...prevData,
                booth: selectedEvent._id || "",
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
                            <Col sm={12} md={12} lg={6} xxl={6}>
                                {error && <Alert className="alert alert-danger" role="alert">{error}</Alert>}
                                {success && <Alert className="alert alert-success" role="alert">{success}</Alert>}
                                <Card className="mb-0">
                                    <Card.Header></Card.Header>
                                    <h2 className="text-center fw-bold text-uppercase">Reserve Booth</h2>
                                    <Card.Body>
                                        <Form>
                                            <Form.Group controlId='expo' label='expo' className='mb-3 overflow-hidden'>
                                                <Form.Label>Expo Id</Form.Label>
                                                <Form.Select className='rounded-2' name='expo' onChange={handleEventChange} value={id} required>
                                                    <option disabled value=''>Select an Event</option>
                                                    {events.map(event => (
                                                        <option key={event._id} value={event._id}>
                                                            {event.title}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                                {data.expo && (
                                                    <div className="mt-2">
                                                        <p className="fw-bold">Booth Assigned:</p>
                                                        <p>{data.booth ? "Yes" : "No"}</p>
                                                        {data.booth && (
                                                            <>
                                                                <p className="fw-bold">Booth Number:</p>
                                                                <p>{booths.find(booth => booth._id === data.booth)?.boothNumber}</p>
                                                                <p className="fw-bold">Total Seats Available:</p>
                                                                <p>{booths.find(booth => booth._id === data.booth)?.totalSpaces}</p>
                                                                <p className="fw-bold">Seats Reserved:</p>
                                                                <p>{booths.find(booth => booth._id === data.booth)?.reservedSpaces}</p>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                            </Form.Group>

                                            <Form.Group controlId='booth' label='booth' className='mb-3 overflow-hidden'>
                                                <Form.Label>Booth Number</Form.Label>
                                                <Form.Select className='rounded-2' name='booth' onChange={handleBooth} value={data.booth || ''} required>
                                                    <option disabled value=''>Select a Booth Number</option>
                                                    {booths.map(booth => (
                                                        <option key={booth._id} value={booth._id}>
                                                            {booth.boothNumber}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                                {data.booth && (
                                                    <>
                                                        <p className="text-muted mt-2">
                                                            Total Spaces: {booths.find(booth => booth._id === data.booth)?.totalSpaces}
                                                        </p>
                                                        <p className="text-muted">
                                                            Reserved Spaces: {booths.find(booth => booth._id === data.booth)?.reservedSpaces}
                                                        </p>
                                                        <p className="text-muted">
                                                            Available Spaces: {booths.find(booth => booth._id === data.booth)?.totalSpaces - booths.find(booth => booth._id === data.booth)?.reservedSpaces}
                                                        </p>
                                                        {data.spacesReserved && parseInt(data.spacesReserved) > (booths.find(booth => booth._id === data.booth)?.totalSpaces - booths.find(booth => booth._id === data.booth)?.reservedSpaces) && (
                                                            <p className="text-danger mt-2">Exceeds available spaces</p>
                                                        )}
                                                    </>
                                                )}
                                                {data.spacesReserved && data.booth && (
                                                    <p className={`mt-2 ${parseInt(data.spacesReserved) > booths.find(booth => booth._id === data.booth)?.totalSpaces ? 'text-danger' : 'text-success'}`}>
                                                        {parseInt(data.spacesReserved) > booths.find(booth => booth._id === data.booth)?.totalSpaces ? 'Exceeds total available spaces' : 'Spaces available'}
                                                    </p>
                                                )}
                                            </Form.Group>


                                            <Form.Group className="mb-3">
                                                <Form.Label>Spaces Reserved</Form.Label>
                                                <Form.Control type='number' name='spacesReserved' onChange={GetFormValue} value={data.spacesReserved || ''} required />
                                            </Form.Group>

                                            <Button variant="primary" className="w-100 py-2 fs-4 mb-4 rounded-2" onClick={BoothBtn}>Add Booth</Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default ReserveBooth;
