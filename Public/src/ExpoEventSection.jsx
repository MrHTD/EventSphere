import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

export const EventSection = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

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

    // Function to handle button click
    const handleBookNow = () => {
        // Check if user is logged in
        const userRole = localStorage.getItem('publicuser');
        const object = userRole ? JSON.parse(userRole) : null;

        if (object && object.role === 'Attendee') {
            // If logged in as attendee, log 'logged in'
            console.log('logged in');
        } else if (object) {
            // If not logged in as attendee, log 'not logged in'
            console.log('not logged in as Attendee');
        } else {
            // If userRole is null or undefined, log 'not logged in'
            console.log('not logged in');
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
                                <Card key={index} className='border border-2'>
                                    <Card.Body className='px-0 d-md-flex d-sm-flex align-items-center'>
                                        <Col md={1} sm={4} className='text-center mb-3 mb-md-0'>
                                            <h6>Start Date</h6>
                                            <h1>{new Date(expo.startDate).toLocaleDateString(undefined, day)}</h1>
                                            <h6>{new Date(expo.startDate).toLocaleDateString(undefined, month)}</h6>
                                            <h6>{new Date(expo.startDate).toLocaleDateString(undefined, year)}</h6>
                                        </Col>
                                        <Col md={1} sm={4} className='text-center mb-3 mb-md-0'>
                                            <h6>End Date</h6>
                                            <h1>{new Date(expo.endDate).toLocaleDateString(undefined, day)}</h1>
                                            <h6>{new Date(expo.endDate).toLocaleDateString(undefined, month)}</h6>
                                            <h6>{new Date(expo.endDate).toLocaleDateString(undefined, year)}</h6>
                                        </Col>
                                        <Col md={2}>
                                        </Col>
                                        <Col md={6} sm={8}>
                                            <div class="row justify-content-start">
                                            <Card.Title className='text-start'><h3 style={{ fontWeight: 'bold' }}>{expo.title}</h3></Card.Title>
                                                <div class="col-3">
                                                    <Card.Text>{expo.location}</Card.Text>
                                                </div>
                                                <div class="col-4">
                                                    <Card.Text>{new Date(expo.startTime).toLocaleTimeString('en-US')} - {new Date(expo.endTime).toLocaleTimeString('en-US')}</Card.Text>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={2} sm={4} className='text-center'>
                                            {/* <Button variant="primary">Go</Button> */}
                                            <Button onClick={handleBookNow} className="btn btn-dark m-1">Book Now</Button>
                                        </Col>
                                    </Card.Body>
                                </Card>
                            )
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </Col>
    );
};
