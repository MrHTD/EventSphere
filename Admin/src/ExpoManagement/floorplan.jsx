import React from 'react'
import { Navbar, Nav, Dropdown, Form, FloatingLabel, Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Sidebar } from '../sidebar';
import { Header } from '../header';
import { Link } from 'react-router-dom'

export const FloorPlan = () => {
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
                                                    <h5 className="card-title fw-semibold mb-4">Floor Plan</h5>
                                                </Col>
                                                <Col className='text-end'>
                                                    <Link to="/addfloorplan" type="button" className="w-auto btn btn-primary">Add Floor Plan</Link>
                                                </Col>
                                            </Row>
                                            <div className="table-responsive">
                                                <table className="table text-nowrap mb-0 align-middle text-center">
                                                    <thead className="text-dark fs-4">
                                                        <tr>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Id</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Booth Number</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Exhibitor</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Priority</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Budget</h6>
                                                            </th>
                                                            <th className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0">Action</h6>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="border-bottom-0"><h6 className="fw-semibold mb-0">1</h6></td>
                                                            <td className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-1">Sunil Joshi</h6>
                                                                <span className="fw-normal">Web Designer</span>
                                                            </td>
                                                            <td className="border-bottom-0">
                                                                <p className="mb-0 fw-normal">Elite Admin</p>
                                                            </td>
                                                            <td className="border-bottom-0">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <span className="badge bg-primary rounded-3 fw-semibold">Low</span>
                                                                </div>
                                                            </td>
                                                            <td className="border-bottom-0">
                                                                <h6 className="fw-semibold mb-0 fs-4">$3.9</h6>
                                                            </td>
                                                            <td className="border-bottom-0">
                                                                <button type="button" className="btn btn-dark m-1">More Details</button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}