import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Dropdown, Form, FloatingLabel, Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Header } from './header';
import { Sidebar } from './sidebar';
import { Charts } from './Components/charts';
import { SmallCard1 } from './Components/smallcard1';
import { SmallCard2 } from './Components/smallcard2';
import { Table } from './Components/table';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = !!localStorage.getItem('user');

    // Redirect to the login page if the user is not logged in
    if (!isLoggedIn) {
      navigate('/'); // Adjust the login route accordingly
    }
  }, [navigate]);

  return (
    <>
      {/* Body Wrapper */}
      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
        data-sidebar-position="fixed" data-header-position="fixed">
        <Sidebar />
        <div className="body-wrapper">
          <header className="app-header">
            <Header />
          </header>
          <Container fluid>
            <Row>
              <Col lg={8}>
                <Charts />
              </Col>
              <Col lg={4}>
                <Row>
                  <Col lg={12}>
                    <SmallCard1 />
                  </Col>
                  <Col lg={12}>
                    <SmallCard2 />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
            </Row>

            {/* Table */}
            <Row>
              <Col lg={12}>
                {/* <Table /> */}
              </Col>
            </Row>

            <Row>
              {/* Product Cards */}
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

export default Dashboard