import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

export default class EventDeleteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }

    render () {
        return (
        <>
          <h3 style={{marginTop: 20}}>Delete Event</h3>
          <Form
            onSubmit={ e => {
                e.preventDefault();
                this.props.onDeleteEvent(this.state.id)
            }}
          >
            <Form.Group  as={Row} controlId="formEventID">
              <Form.Label column sm={3}>Event ID</Form.Label>
              <Col sm={9}>
                <Form.Control 
                  type="text" 
                  onChange={(e) => this.setState({id: e.target.value})}
                  required
                  />
              </Col>
            </Form.Group>
            <Button variant="primary" type="submit">
              Delete Event
            </Button>
          </Form>
        </>
        )
    }
}