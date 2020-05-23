import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default class UserAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    render() {
        return(
            <>
            <h3>Add User</h3>
            <Form
                onSubmit={ e => {
                    e.preventDefault();
                    this.props.onAddUser(
                        this.state.name,
                    );
                }
            }
            >
            <Form.Group  as={Row} controlId="userForm.userName">
              <Form.Label column sm={3}>User Name</Form.Label>
              <Col sm={9}>
                <Form.Control 
                    type="text" 
                    onChange={(e) => this.setState({name: e.target.value})}
                    required
                />
              </Col>
            </Form.Group>

            <Button 
                variant="primary" 
                type="submit"
            >
              Add User
            </Button>
            </Form>
            </>
        )
    }
}