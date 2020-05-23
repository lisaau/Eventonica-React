import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
// import { Row, Col } from 'react-bootstrap';

export default function TicketMaster() {
  return (
    <>
      <h2 id="event-ticketmaster-header">Events From TicketMaster</h2>
      <Row>
        <Col>
        <h3>Search Events by Keyword/Category</h3>
        <Form>
            <Form.Group  as={Row} controlId="eventForm.EventName">
              <Form.Label column sm={3}>Event Name</Form.Label>
              <Col sm={9}>
                <Form.Control type="text" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formEventCategory">
                <Form.Label column sm={3}>Event Category</Form.Label>
                <Col sm={9}>
                <Form.Control as="select">
                    <option>Please select a category</option>
                    <option>Arts & Theatre</option>
                    <option>Music</option>
                    <option>Sports</option>
                </Form.Control>
                </Col>
            </Form.Group>

            <Button variant="primary" type="submit">
                    Search
            </Button>
        </Form>
          <h4>Results</h4>
        </Col>
      </Row>
    </>
  );
}