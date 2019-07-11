import React, { Component } from 'react';
import { Accordion, Card, ListGroup, Button } from 'react-bootstrap';
import '../App.css';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: null
    }
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
      return(
        <ListGroup.Item key={index}>
          <p className="event-desc">{item.eventType}: {item.timestamp}</p>
        </ListGroup.Item> 
      );
    })
  }
    
  render() {
    return(
      <div className="body-content">
        <Accordion>
          {this.renderMetricsCards()}
        </Accordion>
      </div>
    );
  }
}

export default Body;