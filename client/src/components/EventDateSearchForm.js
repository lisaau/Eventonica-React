import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles.css";

function formatDate(dateString) {
    var d = new Date(dateString),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export default class EventDateSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateString: new Date(),
        }
    }
    render () {
        return (
            <>
            <h3>Find Events By Date</h3>
            <Form
                onSubmit={ e => {
                e.preventDefault();
                this.props.onSearchEvent(
                    formatDate(this.state.dateString)
                );
            }}>
            <Form.Group  as={Row} controlId="eventForm.EventDate">
              <Form.Label column sm={3}>Event Date</Form.Label>
              <Col sm={9}>
                <DatePicker 
                    className='rounded'
                    selected={this.state.dateString}
                    onChange={dateString => this.setState({dateString: dateString})} 
                />
              </Col>
            </Form.Group>
                <Button variant="primary" type="submit">
                    Search
                </Button>
            </Form>
            </>
        )
    }
}