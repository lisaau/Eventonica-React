import React, {useState} from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EventSearchAndSave() {
    let [date, setDate] = useState(Date.now())
    return (
        <>
        <h2 id="event-search-and-save-header">Event Search and Save</h2>
        <Row>
        <Col>
            <h3>Find Events by Date</h3>
            <Form>
                <Form.Group  as={Row} controlId="eventForm.EventDate">
                <Form.Label column sm={3}>Event Date</Form.Label>
                <Col sm={9}>
                    <DatePicker selected={date} onChange={setDate} />
                </Col>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Search
                </Button>
            </Form>
            <p>Display events here</p>
        </Col>
        <Col>
            <h3>Find Events by Category</h3>
            <Form>
            <Form.Group as={Row} controlId="formEventCategory">
                <Form.Label column sm={3}>Event Category</Form.Label>
                <Col sm={9}>
                <Form.Control as="select">
                    <option>Arts & Theatre</option>
                    <option>Food and Drink</option>
                    <option>Comedy</option>
                    <option>Music</option>
                    <option>Sports</option>
                    <option>Tech</option>
                </Form.Control>
                </Col>
            </Form.Group>

            <Button variant="primary" type="submit">
              Search
            </Button>
            </Form>

            <p>Display events here</p>
        </Col>
        <Col>
            <h3>Save Event for User</h3>
            <Form>
            <Form.Group  as={Row} controlId="formSaveUserID">
              <Form.Label column sm={3}>User ID</Form.Label>
              <Col sm={9}>
                <Form.Control type="text" />
              </Col>
            </Form.Group>
            <Form.Group  as={Row} controlId="formSaveEventID">
              <Form.Label column sm={3}>Event ID</Form.Label>
              <Col sm={9}>
                <Form.Control type="text" />
              </Col>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
            <p>Display results</p>
        </Col>
        </Row>
    </>
    );
}