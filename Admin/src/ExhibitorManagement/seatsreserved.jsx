import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, Dropdown, Form, FloatingLabel, Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Sidebar } from '../sidebar';
import { Header } from '../header';
import { Link } from 'react-router-dom';
import APagination from '../pagination';

export const SeatsReserved = () => {
  const [events, setEvents] = useState([]);
  const [booths, setBooths] = useState([]);
  const [exhibitors, setExhibitors] = useState([]);
  const [boothsallocation, setBoothsAllocation] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); // Number of users per page

  const user_id = JSON.parse(localStorage.getItem(''));

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
    axios.get('http://localhost:3000/getUser')
      .then(response => {
        setExhibitors(response.data);
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

  // Pagination
  const totalPages = Math.ceil(boothsallocation.length / postsPerPage);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  const paginatedData = boothsallocation.slice(startIndex, endIndex);

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
      data-sidebar-position="fixed" data-header-position="fixed">
      <Sidebar />
      <div className="body-wrapper">
        <header className="app-header">
          <Header />
        </header>
        <Container fluid>
          {/* Table */}
          <Row>
            <Col lg={12}>
              <div className="row">
                <div className="col-lg-12 d-flex align-items-stretch">
                  <div className="card w-100">
                    <div className="card-body p-4">
                      <Row>
                        <Col>
                          <h5 className="card-title fw-semibold mb-4">Reserve Seats Management</h5>
                        </Col>
                      </Row>
                      <div className="table-responsive">
                        <table className="table text-nowrap mb-0 align-middle text-center">
                          <thead className="text-dark fs-4">
                            <tr>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Expo Name</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Exhibitor Name</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Booth Number</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Total Space</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Space Reserved</h6>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedData.length === 0 ? (
                              <tr>
                                <td colSpan="4"><h4 className='fw-semibold'>No data available</h4></td>
                              </tr>
                            ) : (
                              paginatedData.map((boothAllocation, index) => {
                                // Find the corresponding booth data based on the booth ID
                                const booth = booths.find(booth => booth._id === boothAllocation.booth);
                                const event = events.find(event => event._id === boothAllocation.expo);
                                const exhibitor = exhibitors.find(event => event._id === boothAllocation.userId);
                                return (
                                  <tr key={index}>
                                    <td className="border-bottom-0"><h6 className="fw-semibold mb-0">{event ? event.title : '-'}</h6></td>
                                    <td className="border-bottom-0">
                                      <span className="fw-normal">{exhibitor ? exhibitor.username : '-'}</span>
                                    </td>
                                    <td className="border-bottom-0">
                                      <span className="fw-normal">{booth ? booth.boothNumber : '-'}</span>
                                    </td>
                                    <td className="border-bottom-0">
                                      <span className="fw-normal">{booth ? booth.totalSpaces : '-'}</span>
                                    </td>
                                    <td className="border-bottom-0">
                                      <span className="fw-normal">{boothAllocation.spacesReserved}</span>
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {/* Pagination */}
          <Row className='mx-lg-auto'>
            <Col className='col-lg-12 d-flex justify-content-center'>
              <APagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </Col>
          </Row>

        </Container>
      </div>
    </div>
  )
}