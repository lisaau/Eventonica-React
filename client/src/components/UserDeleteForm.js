import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default class UserDeleteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }

    render() {
        return(
            <>
            <h3 style={{marginTop: 20}}>Delete User</h3>
            <Form
                onSubmit={ e => {
                    e.preventDefault();
                    this.props.onDeleteUser(this.state.id)
                }}
            >
            <Form.Group  as={Row} controlId="userForm.userID">
              <Form.Label column sm={3}>User ID</Form.Label>
              <Col sm={9}>
                <Form.Control 
                    type="text" 
                    onChange={(e) => this.setState({id: e.target.value})} 
                    required/>
              </Col>
            </Form.Group>

            <Button 
                variant="primary" 
                type="submit"
            >
              Delete User
            </Button>
            </Form>
            </>
        )
    }
}