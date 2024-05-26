import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Sidebar } from '../sidebar';
import { Header } from '../header';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Analytics = () => {
    const [totalEvents, setTotalEvents] = useState(0);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10); // Number of users per page

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

    // Pagination
    const totalPages = Math.ceil(events.length / postsPerPage);

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    const paginatedData = events.slice(startIndex, endIndex);

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">
            <Sidebar />
            <div className="body-wrapper">
                <header className="app-header">
                    <Header />
                </header>
                <Container fluid>
                    <Card>
                        <Card.Header className='fw-semibold fs-6'>
                            <Row>
                                <Col className='text-start'>Expo Events</Col>
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
                </Container>
            </div>
        </div>
    )
}