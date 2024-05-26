import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const SmallCard1 = () => {
    const [totalEvents, setTotalEvents] = useState(0);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getexpoevents');
                const events = response.data;
                setTotalEvents(events.length);

                const eventTypes = ["upcoming", "ongoing", "ended"];
                const eventTypeCounts = eventTypes.map(status => events.filter(event => event.status === status).length);

                setChartData({
                    labels: eventTypes,
                    datasets: [
                        {
                            label: 'Number of Events',
                            data: eventTypeCounts,
                            backgroundColor: ['#57D5EC', 'orange', 'lightgreen'],
                        }
                    ]
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Card>
                <Card.Header className='fw-semibold fs-6'>
                    <Row>
                        <Col className='text-start'>Total Events</Col>
                        <Col className='text-end'>{totalEvents}</Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Text>
                                <Bar data={chartData} options={{ maintainAspectRatio: false }} />
                            </Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}
