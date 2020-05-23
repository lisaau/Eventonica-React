import React from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap';

import Banner from './components/Banner';
import NavBar from './components/NavBar';

import UserDisplayComponent from './components/UserDisplayComponent';
import UserAddForm from './components/UserAddForm'; 
import UserDeleteForm from './components/UserDeleteForm'; 
import EventDisplayComponent from './components/EventDisplayComponent';
import EventAddForm from './components/EventAddForm'; 
import EventDeleteForm from './components/EventDeleteForm'; 
import EventDateSearchForm from './components/EventDateSearchForm'
import EventCategorySearchForm from './components/EventCategorySearchForm'
// import TicketMaster from './components/TicketMaster'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      events: null,
      eventsByDate: null,
      eventsByCategory: null
    }
  }

  fetchEvents() {
    fetch("/events", {
      methods: "GET",
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
  })
    .then(res => res.json())
    .then(res => {
      this.setState({ events: res })
    });
  }

  fetchEventsByDate(dateString) {
    return fetch(`/events-by-date?dateString=${dateString}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ eventsByDate: res })
      });
  }

  fetchEventsByCategory(eventCategory) {
    return fetch(`/events-by-category?eventCategory=${eventCategory}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ eventsByCategory: res })
      });
  }

  fetchUsers() {
    fetch("/users", {
      methods: "GET",
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
  })
      .then(res => res.json())
      .then(res => {
        this.setState({ users: res })
      });
  }

  addEventCall(name, date, category, location) {
    return fetch("/event", {
      method: "POST",
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         },
      body: JSON.stringify({
        'eventName': name,
        'eventDate': date,
        'eventCategory': category,
        'eventLocation': location,
      })   
    })
      .then(res => res.json())
      .then(res => {
        return res
      })
  }

  addUserCall(name) {
    return fetch("/user", {
      method: "POST",
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         },
      body: JSON.stringify({
        'userName': name,
      })   
    })
      .then(res => res.json())
      .then(res => {
        return res
      })
  }

  deleteEventCall(id) {
    return fetch("/event", {
      method: "DELETE",
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         },
      body: JSON.stringify({
        'eventID': id,
      })   
    })
      .then(res => {
        return res
      })
  }

  deleteUserCall(id) {
    return fetch("/user", {
      method: "DELETE",
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         },
      body: JSON.stringify({
        'userID': id,
      })   
    })
      .then(res => {
        return res
      })
  }

  componentWillMount() {
    this.fetchUsers();
    this.fetchEvents();
  }

  onDateSearch(dateString) { 
    this.setState({dateSearchLoading: true})
    this.fetchEventsByDate(dateString).then( () => this.setState({dateSearchLoading: false}));
  }
  
  onCategorySearch(eventCategory) { 
    this.setState({categorySearchLoading: true});
    this.fetchEventsByCategory(eventCategory).then( () => this.setState({categorySearchLoading: false}));
  }
  
  render (){
    return (
    <div className="App">
      <NavBar />
      <Container>
        <Banner />
        <Row>
          <h2 id='#user-management-header' style={{color: "#425478", textDecorationLine: 'underline'}}>User Management</h2>
        </Row>
        <Row>
          <Col>
            <UserDisplayComponent users={this.state.users}/>
          </Col>
          <Col>
            <UserAddForm onAddUser={ name => {
              this.addUserCall(name).then( () => this.fetchUsers());
            }}/>
            <UserDeleteForm 
              onDeleteUser={ id => {
              this.deleteUserCall(id).then( () => this.fetchUsers());
              }}/>
          </Col>
        </Row>

        <Row><h2 id='#event-management-header' style={{color: "#425478", textDecorationLine: 'underline'}}>Event Management</h2></Row>
        <Row>
          <Col>
            <EventDisplayComponent events={this.state.events} header='All Events'/>
          </Col>
          <Col>
            <EventAddForm onAddEvent={ (name, date, category, location) => {
              this.addEventCall(name, date, category, location).then( () => this.fetchEvents());
            }}/>
            <EventDeleteForm onDeleteEvent={ id => {
              this.deleteEventCall(id).then( () => this.fetchEvents());
            }}/>
          </Col>
        </Row>

        <Row><h2 id='#event-search' style={{color: "#425478", textDecorationLine: 'underline'}}>Event Search</h2></Row>
        <Row>
          <Col>
            <EventDateSearchForm onSearchEvent={this.onDateSearch.bind(this)}/>
            <EventDisplayComponent events={this.state.eventsByDate} header='Results' loading={this.state.dateSearchLoading}/>
          </Col>
          <Col>
            <EventCategorySearchForm onSearchEvent={this.onCategorySearch.bind(this)}/>
            <EventDisplayComponent events={this.state.eventsByCategory} header='Results' loading={this.state.categorySearchLoading}/>
          </Col>
        </Row>
      </Container>
    </div>
  )};
}

export default App;
