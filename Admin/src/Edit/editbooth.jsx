import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, FloatingLabel, Container, Row, Col, Card, Button, Alert, InputGroup } from 'react-bootstrap';
import axios from 'axios'

const EditBooth = () => {
  const { id } = useParams();
  const [data, setdata] = useState({
    boothNumber: "",
    totalSpaces: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //     // Check if the user is already logged in
  //     const loggedInUser = localStorage.getItem('user');
  //     if (!loggedInUser) {
  //         // Redirect to the admin page
  //         navigate('/dashboard');
  //     }
  // }, [navigate]);


  const GetFormValue = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/getboothbyid/` + id)
      .then(result => {
        setdata(result.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  const EditExpoEventBtn = (e) => {
    e.preventDefault();

    if (!data.boothNumber || !data.totalSpaces) {
      setError("Please fill in all fields");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    const updatedData = {
      boothNumber: data.boothNumber,
      totalSpaces: data.totalSpaces,
    };

    axios.put("http://localhost:3000/editbooth/" + id, updatedData)
      .then(response => {
        console.log(response)
        setSuccess('Event Updated');
        setTimeout(() => {
          setSuccess("");
        }, 2000);
        navigate("/booths");
      })
      .catch(error => {
        console.log(error);
      });
  };


  return (
    <>
      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
        data-sidebar-position="fixed" data-header-position="fixed">
        <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">

          <Container>
            <Row className="justify-content-center p-5">
              <Col md={8} lg={8}>
                {/* error */}
                {error && <Alert className="alert alert-danger" role="alert">{error}</Alert>}
                {success && <Alert className="alert alert-success" role="alert">{success}</Alert>}

                <Card className="mb-0">
                  <Card.Body>
                    <h3 className="text-center">Edit User</h3>
                    {data ?
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Booth Number</Form.Label>
                          <Form.Control type="text" name='boothNumber' onChange={GetFormValue} value={data.boothNumber} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Total Spaces</Form.Label>
                          <Form.Control type="number" name='totalSpaces' onChange={GetFormValue} value={data.totalSpaces} required />
                        </Form.Group>

                        <Button variant="primary" className="w-100 py-2 fs-4 mb-4 rounded-2" onClick={EditExpoEventBtn}>Edit Booth</Button>
                      </Form> : ""}
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

export default EditBooth