import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, ArcElement, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const SmallCard2 = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getUser');
                const users = response.data.filter(user => user.role === "Attendee" || user.role === "Exhibitor");
                setTotalUsers(users.length);

                // Prepare chart data
                const userRoles = ["Attendee", "Exhibitor"];
                const roleCounts = userRoles.map(role => users.filter(user => user.role === role).length);

                setChartData({
                    labels: userRoles,
                    datasets: [
                        {
                            label: 'Number of Users',
                            data: roleCounts,
                            backgroundColor: ['#7599ff', '#57D5EC'],
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

        <Card>
            <Card.Header className='fw-semibold fs-6'>
                <Row>
                    <Col className='text-start'>Total Users</Col>
                    <Col className='text-end'>{totalUsers}</Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Text>
                            <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};
