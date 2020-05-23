import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles.css";

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


export default class EventAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: new Date(),
            category: 'Arts & Theatre',
            location: ''
        }
    }

    render () {
        return (
        <>
        <h3>Add Event</h3>
          <Form 
            onSubmit={ e => {
                e.preventDefault();
                this.props.onAddEvent(
                    this.state.name,
                    formatDate(this.state.date),
                    this.state.category,
                    this.state.location,
                );
                }
            }
          >
            <Form.Group  as={Row} controlId="eventForm.EventName">
              <Form.Label column sm={3}>Event Name</Form.Label>
              <Col sm={9}>
                <Form.Control 
                  type="text" 
                  onChange={(e) => this.setState({name: e.target.value})}
                  required  
                  />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="eventForm.EventCategory">
              <Form.Label column sm={3}>Event Category</Form.Label>
              <Col sm={9}>
                <Form.Control as="select" value={this.state.category} onChange={(e) => this.setState({category: e.target.value})}>
                  <option>Arts & Theatre</option>
                  <option>Food and Drink</option>
                  <option>Comedy</option>
                  <option>Music</option>
                  <option>Sports</option>
                  <option>Tech</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group  as={Row} controlId="eventForm.EventDate">
              <Form.Label column sm={3}>Event Date</Form.Label>
              <Col sm={9}>
                <DatePicker 
                    className='rounded'
                    selected={this.state.date}
                    onChange={date => this.setState({date: date})} 
                />
              </Col>
            </Form.Group>

            <Form.Group  as={Row} controlId="eventForm.EventLocation">
              <Form.Label column sm={3}>Event Location</Form.Label>
              <Col sm={9}>
                <Form.Control 
                  type="text" 
                  onChange={(e) => this.setState({location: e.target.value})}
                  required
                  />
              </Col>
            </Form.Group>

            <Button 
                variant="primary" 
                type="submit"
            >
              Add Event
            </Button>
          </Form>
          </>
        )
    }
}