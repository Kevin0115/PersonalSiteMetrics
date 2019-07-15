import React, { Component } from 'react';
import { Accordion, Card, ListGroup, Button } from 'react-bootstrap';
import moment from 'moment';
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