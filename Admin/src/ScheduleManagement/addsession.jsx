import React, { useEffect, useState } from 'react'
import { Form, FloatingLabel, Container, Row, Col, Card, Button, Alert, InputGroup } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'

const AddSession = () => {
  const [data, setdata] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    speaker: "",
    topic: "",
    location: "",
  });
  const [events, setEvents] = useState([]);
  const [timeslots, setTimeslot] = useState([]);
  const [locations, setLocation] = useState([]);

  const [speakers, setSpeaker] = useState([]);
  const [selectedSpeakers, setSelectedSpeakers] = useState([]);

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

  useEffect(() => {
    axios.get('http://localhost:3000/getexpoevents')
      .then(response => {
        setEvents(response.data);
        console.log(response.data)
      })
      .catch(error => console.log(error));
  }, []);


  const handleEventChange = (e) => {
    const selectedEventTitle = e.target.value;
    const selectedEvent = events.find(event => event._id === selectedEventTitle);

    if (selectedEvent) {
      // Update boothNumber and expoId in the state
      setdata(prevData => ({
        ...prevData,
        // boothNumber: selectedEvent.boothNumber || "",
        title: selectedEvent._id || ""
      }));
    }
  };

  const BoothBtn = (e) => {
    e.preventDefault();

    const startTime = new Date();
    startTime.setHours(parseInt(data.startTime.split(":")[0]));
    startTime.setMinutes(parseInt(data.startTime.split(":")[1]));

    const endTime = new Date();
    endTime.setHours(parseInt(data.endTime.split(":")[0]));
    endTime.setMinutes(parseInt(data.endTime.split(":")[1]));

    const requestData = {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString()
    };

    if (!data.title || !data.description || !data.startTime || !data.endTime || !data.location || !data.speaker || !data.topic) {
      setError("Please fill in all fields.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    axios.post("http://localhost:3000/createSession", { ...data, ...requestData })
      .then(result => {
        console.log(result);
        console.log(data);
        setSuccess("Session added successfully");
        navigate('/session');
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

  const AddSpeakerButton = () => {
    const handleAddSpeaker = () => {
      setSelectedSpeakers([...selectedSpeakers, ""]);
    };

    return (
      <div>
        {selectedSpeakers.map((speakerId, index) => (
          <Form.Group key={index} controlId={`speaker${index}`} label={`Speaker ${index + 1}`} className='mb-3 overflow-hidden'>
            <Form.Label>Speaker {index + 1}</Form.Label>
            <Form.Select className='rounded-2' name={`speaker${index}`} onChange={(e) => handleSpeakerChange(index, e)} value={speakerId || ''} required>
              <option disabled value=''>Select a Speaker</option>
              {speakers.map(speaker => (
                <option key={speaker._id} value={speaker._id}>
                  {speaker.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        ))}
        <Button variant="secondary" onClick={handleAddSpeaker}>+ Add Speaker</Button>
      </div>
    );
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
                {success && <Alert className="alert alert-danger" role="alert">{success}</Alert>}

                <Card className="mb-0">
                  <Card.Header></Card.Header>
                  <h2 className="text-center fw-bold text-uppercase">Add Session</h2>
                  <Card.Body>
                    <Form>
                      <Form.Group controlId='title' label='title' className='mb-3 overflow-hidden'>
                        <Form.Label>Expo Events</Form.Label>
                        <Form.Select className='rounded-2' name='title' onChange={handleEventChange} value={data.title || ''} required>
                          <option disabled value=''>Select an Event</option>
                          {events.map(event => (
                            <option key={event._id} value={event._id}>
                              {event.title}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name='description' onChange={GetFormValue} value={data.description} required />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Speaker</Form.Label>
                        <Form.Control type="text" name='speaker' onChange={GetFormValue} value={data.speaker} required />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control type="time" name='startTime' onChange={GetFormValue} value={data.startTime} required />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control type="time" name='endTime' onChange={GetFormValue} value={data.endTime} required />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" name='location' onChange={GetFormValue} value={data.location} required />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Topic</Form.Label>
                        <Form.Control type="text" name='topic' onChange={GetFormValue} value={data.topic} required />
                      </Form.Group>

                      <Button variant="primary" className="w-100 py-2 fs-4 mb-4 rounded-2" onClick={BoothBtn}>Add Session</Button>
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

export default AddSession