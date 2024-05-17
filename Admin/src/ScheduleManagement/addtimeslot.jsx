import React, { useEffect, useState } from 'react'
import { Form, FloatingLabel, Container, Row, Col, Card, Button, Alert, InputGroup } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'

const AddTimeslot = () => {
  const [data, setdata] = useState({
    startTime: "",
    endTime: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) {
      // Redirect to the admin page
      navigate('/');
    }
  }, [navigate]);

  const GetFormValue = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
  }

  const BoothBtn = (e) => {
    e.preventDefault();

    const startTime = new Date();
    startTime.setHours(parseInt(data.startTime.split(":")[0]));
    startTime.setMinutes(parseInt(data.startTime.split(":")[1]));
  
    const endTime = new Date();
    endTime.setHours(parseInt(data.endTime.split(":")[0]));
    endTime.setMinutes(parseInt(data.endTime.split(":")[1]));
  
    if (endTime < startTime) {
      setError("End Time cannot be earlier than Start Time.");
      return;
    }
  
    const requestData = {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString()
    };
  

    if (!data.startTime || !data.endTime) {
      setError("Please fill in all fields.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    axios.post("http://localhost:3000/createTimeSlot", requestData)
      .then(result => {
        console.log(result);
        setSuccess("Timeslot added successfully");
        navigate('/timeslot');
      })
      .catch(error => {
        console.log(error);
        setError("Please try again.");
        // Hide the error after 3 seconds (adjust the duration as needed)
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  }

  return (
    <>
      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
        data-sidebar-position="fixed" data-header-position="fixed">
        <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
          <Container>
            <Row className="justify-content-center">
              <Col sm={12} md={12} lg={6} xxl={6}>

                {/* error */}
                {error && <Alert className="alert alert-danger" role="alert">{error}</Alert>}
                {success && <Alert className="alert alert-danger" role="alert">{success}</Alert>}

                <Card className="mb-0">
                  <Card.Header></Card.Header>
                  <h2 className="text-center fw-bold text-uppercase">Add Timeslot</h2>
                  <Card.Body>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control type="time" name='startTime' onChange={GetFormValue} value={data.startTime} required />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control type="time" name='endTime' onChange={GetFormValue} value={data.endTime} required />
                      </Form.Group>

                      <Button variant="primary" className="w-100 py-2 fs-4 mb-4 rounded-2" onClick={BoothBtn}>Add Timeslot</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

export default AddTimeslot