import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

export const EventSection = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [alerts, setAlerts] = useState({});


    useEffect(() => {
        axios.get('http://localhost:3000/getexpoevents')
            .then(response => {
                // Filter out events whose start date has passed the current date
                const currentDate = new Date();
                const filteredEvents = response.data.filter(expo => new Date(expo.startDate) > currentDate);
                // Sort filtered events by start date in descending order
                const sortedEvents = filteredEvents.sort((b, a) => new Date(b.startDate) - new Date(a.startDate));
                // Show only the first three events
                const nearestEvents = sortedEvents.slice(0, 5);
                setEvents(nearestEvents);
            })
            .catch(error => console.log(error));
    }, []);

    const day = { day: 'numeric' };
    const month = { month: 'short' };
    const year = { year: 'numeric' };

    const handleBookNow = (index) => {
        const userRole = localStorage.getItem('publicuser');
        const object = userRole ? JSON.parse(userRole) : null;

        if (object && object.role === 'Attendee') {
            setAlerts({ [index]: { success: 'You are logged in and can book now!', error: '' } });
            setTimeout(() => {
                setAlerts("");
            }, 2000);
        } else if (object) {
            setAlerts({ [index]: { success: '', error: 'Not logged in as Attendee' } });
            setTimeout(() => {
                setAlerts("");
            }, 2000);
        } else {
            setAlerts({ [index]: { success: '', error: 'Not logged in' } });
            setTimeout(() => {
                setAlerts("");
            }, 2000);
        }
    };

    return (
        <Col md={10} className='mx-auto'>
            <Container className='p-3 p-md-5'>
                <Row>
                    <Col>
                        <h3 className='text-md-start' style={{ fontWeight: 'bold' }}>Upcoming Events</h3>
                        <hr className='border border-dark border-2 opacity-100' />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            events.map((expo, index) => (
                                <>
                                    {alerts[index] && alerts[index].error && <Alert className='text-center' variant="danger">{alerts[index].error}</Alert>}
                                    {alerts[index] && alerts[index].success && <Alert className='text-center' variant="success">{alerts[index].success}</Alert>}
                                    <Card key={index} className='border border-2 mb-3'>
                                        <Card.Body className='px-0 d-flex flex-wrap align-items-center'>
                                            <Col md={2} xs={6} className='text-center mb-3 mb-md-0'>
                                                <h6>Start Date</h6>
                                                <h1>{new Date(expo.startDate).toLocaleDateString(undefined, day)}</h1>
                                                <h6>{new Date(expo.startDate).toLocaleDateString(undefined, month)}</h6>
                                                <h6>{new Date(expo.startDate).toLocaleDateString(undefined, year)}</h6>
                                            </Col>
                                            <Col md={2} xs={6} className='text-center mb-3 mb-md-0'>
                                                <h6>End Date</h6>
                                                <h1>{new Date(expo.endDate).toLocaleDateString(undefined, day)}</h1>
                                                <h6>{new Date(expo.endDate).toLocaleDateString(undefined, month)}</h6>
                                                <h6>{new Date(expo.endDate).toLocaleDateString(undefined, year)}</h6>
                                            </Col>
                                            <Col md={6} xs={12} className='mb-3 mb-md-0'>
                                                <Card.Title className='text-center'>
                                                    <h3 style={{ fontWeight: 'bold' }}>{expo.title}</h3>
                                                </Card.Title>
                                                <div className="row text-center">
                                                    <div className="col-12 col-md-6">
                                                        <Card.Text>{expo.location}</Card.Text>
                                                    </div>
                                                    <div className="col-12 col-md-4">
                                                        <Card.Text>{new Date(expo.startTime).toLocaleTimeString('en-US')} - {new Date(expo.endTime).toLocaleTimeString('en-US')}</Card.Text>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={2} xs={12} className='text-center'>
                                                <Button onClick={() => handleBookNow(index)} className="btn btn-dark m-1">Book Now</Button>
                                            </Col>
                                        </Card.Body>
                                    </Card>
                                </>
                            )
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </Col>
    );
};
