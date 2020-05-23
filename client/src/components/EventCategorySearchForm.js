import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default class EventCategorySearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventCategory: 'Arts%20%26%20Theatre',
        }
    }
    render() {
        return (
            <>
            <h3>Find Events By Category</h3>
            <Form
                onSubmit={ e => {
                    e.preventDefault();
                    this.props.onSearchEvent(this.state.eventCategory);
            }}>
                <Form.Group as={Row} controlId="eventForm.EventCategory">
                <Form.Label column sm={3}>Event Category</Form.Label>
                <Col sm={9}>
                    <Form.Control as="select" value={this.state.eventCategory} onChange={(e) => this.setState({eventCategory: e.target.value})}>
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
            </>
        )
    }
}