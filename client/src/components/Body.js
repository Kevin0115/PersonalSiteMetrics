import React, { Component } from 'react';
import { Accordion, Card, ListGroup, Button, Form, Tabs, Tab, Badge } from 'react-bootstrap';
import moment from 'moment';
import { XYPlot, VerticalBarSeries, VerticalGridLines, HorizontalGridLines,
  YAxis, XAxis, LineMarkSeries } from 'react-vis';
import '../App.css';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // NEW
      totalVisits: 0,
      sessionIds: [],
      metricsById: {},
      reverseOrder: false,

      // OLD
      json: null,
      username: '',
      password: '',
      authMessage: '',
      data: [],
      visitWeek: [],
      visitMonth: [],
      vWidth: 0,
    }
    this.reverseOrder = this.reverseOrder.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
    this.renderMetricsCards = this.renderMetricsCards.bind(this);

    // Auth stuff
    // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    // this.handleUsernameChange = this.handleUsernameChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({vWidth: window.innerWidth});
    // fetch('https://ec2.kevnchoi.com/metric')
    fetch('http://localhost:8080/metric')
    .then(res => res.json())
    .then(json => {
      this.setState({
        sessionIds: json,
        totalVisits: json.length
      });
    })
    // .then(() => this.processMetrics())
    .catch(err => console.log('Error: ' + err));
  }

  fetchMetricsForId(id) {
    // 'Caching' for this session
    if (id in this.state.metricsById) {
      return;
    }
    // fetch('https://ec2.kevnchoi.com/metric/' + id)
    fetch('http://localhost:8080/metric/' + id)
    .then(res => res.json())
    .then(json => {
      // Make K-V pair
      const obj = {
        events: json
      };
      // Get current state
      const { metricsById } = this.state;
      metricsById[id] = obj;
      this.setState({
        metricsById: metricsById
      });
    })
    // .then(() => this.processMetrics())
    .catch(err => console.log('Error: ' + err));
  }

  // processMetrics() {
  //   const { json } = this.state;

  //   const data = [];
  //   const visitWeek = [];
  //   const visitMonth = [];

  //   for (let i = 0; i < json.length; i++) {

  //     const currWeek = moment(json[i].events[0].timestamp).format("W/YY");
  //     const currMonth = moment(json[i].events[0].timestamp).format("M/YY");
  //     this.insertVisitTime(visitWeek, currWeek);
  //     this.insertVisitTime(visitMonth, currMonth);

  //     const events = json[i].events;
  //     for (let j = 0; j < events.length; j++) {
  //       const eventType = events[j].eventType;
  //       const eventName = eventType.substring(eventType.indexOf('=') + 1);
  //       this.insertEvent(data, eventName);
  //     }
  //   }

  //   data.sort((a, b) => b.y - a.y);
  //   this.setState({
  //     data: data,
  //     visitWeek: visitWeek.reverse(),
  //     visitMonth: visitMonth.reverse()
  //   });
  // }

  // insertEvent(data, eventType) {
  //   if (eventType === 'sessionStart') { return; }
  //   if (data.length === 0) {
  //     data.push({
  //       x: eventType,
  //       y: 1
  //     })
  //   } else {
  //     for (let i = 0; i < data.length; i++) {
  //       if (data[i].x === eventType) {
  //         data[i].y = data[i].y + 1;
  //         return;
  //       }
  //     }
  //     data.push({
  //       x: eventType,
  //       y: 1
  //     })
  //   }
  // }

  // insertVisitTime(array, time) {
  //   if (array.length === 0) {
  //     array.push({
  //       x: time,
  //       y: 1
  //     })
  //   } else {
  //     for (let i = 0; i < array.length; i++) {
  //       if (array[i].x === time) {
  //         array[i].y = array[i].y + 1;
  //         return
  //       }
  //     }
  //     array.push({
  //       x: time,
  //       y: 1
  //     })
  //   }
  // }

  reverseOrder() {
    this.setState({
      sessionIds: this.state.sessionIds.reverse(),
      reverseOrder: !this.state.reverseOrder
    });
  }

  renderReverseButton() {
    return this.state.reverseOrder ?
      ( <div>&#x21a5;</div> ) : ( <div>&#x21a7;</div> )
  }

  renderMetricsCards() {
    if (!this.state.sessionIds) {
      return null;
    }
    return this.state.sessionIds.map((item, index) => {
      return (
        <Card bg="light" style={{ width: '60vw' }} key={index}>
          <Card.Header className="header" style={{ height: '36px', padding: '2px 4px' }}>
            <Accordion.Toggle style={{ padding: '2px' }} as={Button} variant="link" eventKey={index.toString()} onClick={() => this.fetchMetricsForId(item.session_id)}>
              {/* <Badge variant="primary" className="event-count">{}</Badge> */}
              {moment(item.ts).format('YYYY-MM-DD hh:mm A')}
            </Accordion.Toggle>
            <div className="time">{item.session_id}</div>
          </Card.Header>
          <Accordion.Collapse eventKey={index.toString()}>
            <ListGroup>{this.renderEvents(item.session_id)}</ListGroup>
          </Accordion.Collapse>
        </Card>
      )
    })
  }

  renderEvents(session_id) {
    if (!this.state.metricsById[session_id]) {
      return;
    }
    const { events } = this.state.metricsById[session_id];

    return events.map((item, index) => {
      const newDate = moment(item.ts).format("YYYY-MM-DD hh:mm A");
      const eventArray = item.event_type.split('=');
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

  renderChart() {
    if (!this.state.json) {
      return null;
    }
    return (
      <XYPlot margin={{bottom: 60}} xType="ordinal" height={300} width={this.state.vWidth / 2}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <YAxis />
        <XAxis tickLabelAngle={-50}/>
        <VerticalBarSeries data={this.state.data} />
      </XYPlot>
    );
  }

  renderVisitsByMonth() {
    if (!this.state.json) {
      return null;
    }
    return (
      <XYPlot margin={{bottom: 60}} xType="ordinal" height={300} width={this.state.vWidth / 2}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <YAxis />
        <XAxis />
        <LineMarkSeries data={this.state.visitMonth} />
      </XYPlot>
    );
  }

  renderVisitsByWeek() {
    if (!this.state.json) {
      return null;
    }
    return (
      <XYPlot margin={{bottom: 60}} xType="ordinal" height={300} width={this.state.vWidth / 2}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <YAxis />
        <XAxis tickLabelAngle={-50}/>
        <LineMarkSeries data={this.state.visitWeek} />
      </XYPlot>
    );
  }

  // To make login persistent, use localStorage/sessionStorage
  // handleSubmit(e) {
  //   e.preventDefault();

  //   const authObj = {
  //     username: this.state.username,
  //     password: this.state.password
  //   }

  //   fetch('https://ec2.kevnchoi.com/analytics/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(authObj)
  //   })
  //   .then(res => res.json())
  //   .then(res => {
  //     if (res.status === 'Authenticated') {
  //       this.setState({ authMessage: '' });
  //       localStorage.setItem('auth', true);
  //     } else {
  //       this.setState({
  //         authMessage: res.status
  //       });
  //     }
  //   })
  //   .catch(err => console.log('Error: ' + err));
  // }

  // handlePasswordChange(e) {
  //   this.setState({password: e.target.value});
  // }

  // handleUsernameChange(e) {
  //   this.setState({username: e.target.value});
  // }

  // renderAuth() {
  //   return(
  //     <Form onSubmit={this.handleSubmit}>
  //       <Form.Group controlId="formBasicEmail">
  //         <Form.Control placeholder="Username" onChange={this.handleUsernameChange}/>
  //       </Form.Group>
  //       <Form.Group controlId="formBasicPassword">
  //         <Form.Control type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
  //         <Form.Text className="text-muted">
  //           {this.state.authMessage}
  //         </Form.Text>
  //       </Form.Group>
  //       <Button variant="outline-primary" type="submit">
  //         Submit
  //       </Button>
  //     </Form>
  //   );
  // }
    
  render() {
    // if (localStorage.getItem('auth')) {
      return(
        <div className="body-content">
          <Card>
            <Card.Body>
              <Tabs defaultActiveKey="events">
                <Tab eventKey="events" title="Events">
                  <div className="accordion">
                    <h4 className="event-header">
                      <Badge variant="secondary">
                        Total Visits: {this.state.totalVisits}
                      </Badge>
                      <div className="reverse">
                        <Button
                          variant="outline-primary"
                          style={{ height: 30, width: 30, padding: 0 }}
                          onClick={() => this.reverseOrder()}
                        >
                          {this.renderReverseButton()}
                        </Button>
                      </div>
                    </h4>
                    <Accordion>
                      {this.renderMetricsCards()}
                    </Accordion>
                  </div>
                </Tab>
                <Tab eventKey="charts" title="Charts">
                  <div className="charts">
                    <Card.Title>
                      Visits by Event Type
                    </Card.Title>
                    {this.renderChart()}
                    <Card.Title>
                      Visits by Month
                    </Card.Title>
                    {this.renderVisitsByMonth()}
                    <Card.Title>
                      Visits by Week
                    </Card.Title>
                    {this.renderVisitsByWeek()}
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </div>
      );
    // } else {
    //   return(
    //     <div className="body-content">
    //       {this.renderAuth()}
    //     </div>
    //   );
    // }
  }
}

export default Body;