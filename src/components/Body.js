import React, { Component } from 'react';
import { Accordion, Card, ListGroup, Button, Form, Tabs, Tab } from 'react-bootstrap';
import moment from 'moment';
import { XYPlot, VerticalBarSeries, VerticalGridLines, HorizontalGridLines, YAxis, XAxis } from 'react-vis';
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
      data: [],
    }
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('https://ec2.kevnchoi.com/analytics')
    .then(res => res.json())
    .then(res => this.setState({json: res}))
    .then(() => this.processMetrics())
    .catch(err => console.log('Error: ' + err));
  }

  processMetrics() {
    const { json } = this.state;
    const data = [];
    for (let i = 0; i < json.length; i++) {
      const events = json[i].events;
      for (let j = 0; j < events.length; j++) {
        const eventType = events[j].eventType;
        const eventName = eventType.substring(eventType.indexOf('=') + 1);
        this.insertEvent(data, eventName);
      }
    }
    data.sort((a, b) => b.y - a.y);
    this.setState({data: data});
  }

  insertEvent(data, eventType) {
    if (eventType === 'sessionStart') { return; }
    if (data.length === 0) {
      data.push({
        x: eventType,
        y: 1
      })
    } else {
      for (let i = 0; i < data.length; i++) {
        if (data[i].x === eventType) {
          data[i].y = data[i].y + 1;
          return;
        }
      }
      data.push({
        x: eventType,
        y: 1
      })
    }
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

  renderChart() {
    if (!this.state.json) {
      return null;
    }
    return (
      <XYPlot margin={{bottom: 60}} xType="ordinal" height={300} width={400}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <YAxis />
        <XAxis tickLabelAngle={-50}/>
        <VerticalBarSeries data={this.state.data} />
      </XYPlot>
    );
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
          <Card>
            <Card.Body>
              <Tabs defaultActiveKey="events">
                <Tab eventKey="events" title="Events">
                  <div className="accordion">
                    <Accordion>
                      {this.renderMetricsCards()}
                    </Accordion>
                  </div>
                </Tab>
                <Tab eventKey="charts" title="Charts">
                  <div className="charts">
                    {this.renderChart()}
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
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