import React, { Component } from 'react';
import { Accordion, Card, ListGroup, Button, Form } from 'react-bootstrap';
import moment from 'moment';
import '../App.css';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: null,
      auth: false,
      username: '',
      password: '',
      authRes: null,
      authMessage: '',
    }
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('https://ec2.kevnchoi.com/analytics')
    .then(res => res.json())
    .then(res => this.setState({json: res}))
    .catch(err => console.log('Error: ' + err));
  }

  renderMetricsCards() {
    if (!this.state.json) {
      return null;
    }
    return this.state.json.map((item, index) => {
      return (
        <Card bg="light" style={{ width: '60vw' }} key={index}>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey={index.toString()}>
              Session ID: {item.sessionId}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={index.toString()}>
            <ListGroup>{this.renderEvents(item.events)}</ListGroup>
          </Accordion.Collapse>
        </Card>
      )
    })
  }

  renderEvents(events) {
    return events.map((item, index) => {
      const newDate = moment(item.timestamp).format("MMMM Do YYYY, h:mmA");
      const eventArray = item.eventType.split('=');
      let eventType = '';
      let eventTarget = '';
      
      switch(eventArray[0]) {
        case 'sessionStart':
          eventType = 'Started Session';
          break;
        case 'linkVisit':
          eventType = 'Viewed ';
          break;
        case 'navTo':
          eventType = 'Navigated to ';
          break;
        default:
          eventType = 'Unknown Event';
      }

      if (eventArray[1]) {
        eventTarget = eventArray[1];
      }

      return(
        <ListGroup.Item key={index}>
          <p className="event-desc">{eventType + eventTarget}: {newDate}</p>
        </ListGroup.Item> 
      );
    })
  }

  // To make login persistent, use localStorage/sessionStorage
  handleSubmit(e) {
    e.preventDefault();

    const authObj = {
      username: this.state.username,
      password: this.state.password
    }

    fetch('https://ec2.kevnchoi.com/analytics/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authObj)
    })
    .then(res => res.json())
    .then(res => {
      if (res.status === 'Authenticated') {
        this.setState({
          auth: true,
          authMessage: ''
        });
      } else {
        this.setState({
          authMessage: res.status
        });
      }
    })
    .catch(err => console.log('Error: ' + err));
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  renderAuth() {
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control placeholder="Username" onChange={this.handleUsernameChange}/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
          <Form.Text className="text-muted">
            {this.state.authMessage}
          </Form.Text>
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
    
  render() {
    if (this.state.auth) {
      return(
        <div className="body-content">
          <Accordion>
            {this.renderMetricsCards()}
          </Accordion>
        </div>
      );
    } else {
      return(
        <div className="body-content">
          {this.renderAuth()}
        </div>
      );
    }
  }
}

export default Body;