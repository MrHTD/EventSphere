import React, { useEffect, useState } from 'react'
import { Form, FloatingLabel, Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Dashboard = () => {
  const navigate = useNavigate();

  const Logout = () => {
    // Remove user information from local storage
    localStorage.removeItem('user');
    // Redirect to the login page or another appropriate page
    navigate('/');
  };

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
      <div>Dashboard</div>
      <Button onClick={Logout}>Logout</Button>
    </>
  )
}

export default Dashboard