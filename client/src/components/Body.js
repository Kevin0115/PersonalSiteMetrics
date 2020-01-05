import React, { Component } from 'react';
import { Accordion, Card, ListGroup, Button, ButtonGroup, Tabs, Tab, Badge, Pagination } from 'react-bootstrap';
import moment from 'moment';
import { XYPlot, VerticalBarSeries, VerticalGridLines, HorizontalGridLines,
  YAxis, XAxis, LineMarkSeries } from 'react-vis';
import '../App.css';

const externalLinks = [
  {
    link: 'https://kevinchoi.dev',
    label: 'Personal Site'
  },
  {
    link: 'https://github.com/Kevin0115/PersonalSiteMetrics',
    label: 'Github'
  },
  {
    link: 'https://customer.elephantsql.com/instance',
    label: 'Database'
  },
  {
    link: 'https://react-bootstrap.github.io/components/alerts/',
    label: 'React Bootstrap'
  },
  {
    link: 'https://uber.github.io/react-vis/',
    label: 'React-Vis'
  }
];

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // NEW
      totalVisits: 0,
      sessionIds: [],
      metricsById: {},
      reverseOrder: false,
      pageOffset: 0,
      // NEW - Chart Arrays
      visitsByEvent: [],
      visitsByMonth: [],
      visitsByWeek: [],
      visitsByDay: [],
      sortPeriod: 'Monthly',

      // OLD
      username: '',
      password: '',
      authMessage: '',
      vWidth: 0,
    }
    this.reverseOrder = this.reverseOrder.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
    this.renderMetricsCards = this.renderMetricsCards.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handlePeriodSelect = this.handlePeriodSelect.bind(this);
    // Auth stuff
    // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    // this.handleUsernameChange = this.handleUsernameChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
    this.fetchSessionIds();
    this.fetchVisitsByEvent();
  }

  handleResize() {
    this.setState({vWidth: window.innerWidth});
  }

  fetchSessionIds() {
    fetch('https://ec2.kevnchoi.com/metric')
    // fetch('http://localhost:8080/metric')
    .then(res => res.json())
    .then(json => {
      this.setState({
        sessionIds: json,
        totalVisits: json.length,
        metricsById: {}
      });
    })
    .catch(err => console.log('Error: ' + err));
  }

  fetchMetricsForId(id) {
    // 'Caching' for this session
    if (id in this.state.metricsById) {
      return;
    }
    fetch('https://ec2.kevnchoi.com/metric/session/' + id)
    // fetch('http://localhost:8080/metric/session/' + id)
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
    .catch(err => console.log('Error: ' + err));
  }

  fetchVisitsByEvent() {
    fetch('https://ec2.kevnchoi.com/metric/chart')
    // fetch('http://localhost:8080/metric/chart')
    .then(res => res.json())
    .then(json => {
      console.log(json.month_count);
      this.setState({
        visitsByEvent: json.event_count,
        visitsByMonth: this.sortMonthlyArray(json.month_count),
        visitsByWeek: this.sortPeriodArray(json.week_count),
        visitsByDay: this.sortPeriodArray(json.day_count),
      });
    })
    .catch(err => console.log('Error: ' + err));
  }

  // Desc sort weekly and daily arrays
  sortPeriodArray(data) {
    if (!data) return [];
    return data.sort((a, b) => {
      return new Date(moment(a.x, 'DD-MM-YY')) - new Date(moment(b.x, 'DD-MM-YY'));
    });
  }

  // Desc sort months
  sortMonthlyArray(data) {
    if (!data) return [];
    return data.sort((a, b) => {
      return new Date(moment(a.x, 'MMM-YYYY')) - new Date(moment(b.x, 'MMM-YYYY'));
    })
  }

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

  renderRefreshButton() {
    return (
      <div>&#8635;</div>
    );
  }

  renderMetricsCards() {
    if (!this.state.sessionIds) {
      return null;
    }
    return this.state.sessionIds.slice(0 + this.state.pageOffset * 10, 10 + this.state.pageOffset * 10).map((item, index) => {
      return (
        <Card bg="light" style={{ width: '60vw' }} key={index}>
          <Card.Header className="header" style={{ height: '36px', padding: '2px 4px' }}>
            <Accordion.Toggle style={{ padding: '2px' }} as={Button} variant="link" eventKey={index.toString()} onClick={() => this.fetchMetricsForId(item.session_id)}>
              <Badge variant="primary" className="event-count">{item.event_count}</Badge>
              {moment(item.ts).utcOffset(-8).format('MMM D, YYYY')}
            </Accordion.Toggle>
            <div className="session-id">{item.session_id}</div>
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
      const newDate = moment(item.ts).utcOffset(-8).format("YYYY-MM-DD, h:mm A");
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

  renderLinks() {
    return externalLinks.map((item, index) => {
      return (
        <a
          key={index}
          href={item.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button variant="outline-secondary" className="link-item">
            {item.label}
          </Button>
        </a>
      );
    })
  }

  renderChart() {
    if (!this.state.visitsByEvent) {
      return null;
    }
    let domain = [0, this.findMax(this.state.visitsByEvent)];
    return (
      <div className="chart">
        <XYPlot margin={{bottom: 100, top: 32}} xType="ordinal" height={400} width={this.state.vWidth / 1.8} yDomain={domain}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <YAxis />
          <XAxis tickLabelAngle={-45}/>
          <VerticalBarSeries data={this.state.visitsByEvent} />
        </XYPlot>
      </div>
    );
  }

  renderVisitsByPeriod() {
    let data = [];
    let domain = [];
    switch(this.state.sortPeriod) {
      case ('Weekly') :
        data = this.state.visitsByWeek;
        domain = [0, this.findMax(data)];
        break;
      case ('Daily') :
        data = this.state.visitsByDay;
        domain = [0, this.findMax(data)];
        break;
      default :
        data = this.state.visitsByMonth;
        domain = [0, this.findMax(data)];
    }

    if (!data) return null;
    return (
      <div className="chart">
        <XYPlot margin={{bottom: 56, top: 32}} xType="ordinal" height={360} width={this.state.vWidth / 1.8} yDomain={domain}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <YAxis />
          <XAxis tickLabelAngle={-45} />
          <LineMarkSeries data={data} />
        </XYPlot>
      </div>
    );
  }
  
  handlePeriodSelect(e) {
    this.setState({sortPeriod: e.target.value});
  }

  findMax(data) {
    if (!data) return 0;
    return Math.max(...data.map(o => o.y), 0) * 1.25;
  }

  renderPagination() {
    if (this.state.totalVisits <= 10) return null;
    let pages = [];
    let pageCount = Math.ceil(this.state.totalVisits / 10);
    pages.push(<Pagination.First key={'first'} onClick={() => this.setState({pageOffset: 0})}/>);
    pages.push(<Pagination.Prev key={'prev'} onClick={() => this.setState({pageOffset: Math.max(this.state.pageOffset - 1, 0)})}/>);
    for (let i = 0; i < pageCount; i++) {
      if (i > 2 && i < pageCount - 1) {
        pages.push(
          <Pagination.Ellipsis />
        );
        i = pageCount - 1;
      }
      pages.push(
        <Pagination.Item key={i} onClick={() => this.setState({pageOffset: i})} active={this.state.pageOffset === i}>
          {i + 1}
        </Pagination.Item>
      );
    }
    pages.push(<Pagination.Next key={'next'} onClick={() => this.setState({pageOffset: Math.min(this.state.pageOffset + 1, pageCount - 1)})}/>);
    pages.push(<Pagination.Last key={'last'} onClick={() => this.setState({pageOffset: pageCount - 1})}/>);
    return pages;
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
                  <div className="event-list">
                    <h4 className="event-header">
                      <Badge variant="secondary">
                        Total Visits: {this.state.totalVisits}
                      </Badge>
                      <div className="reverse">
                        <Button
                          variant="outline-secondary"
                          style={{ height: 30, width: 30, padding: 0 }}
                          onClick={() => this.reverseOrder()}
                        >
                          {this.renderReverseButton()}
                        </Button>
                        <Button
                          variant="outline-secondary"
                          style={{ height: 30, width: 30, padding: 0 }}
                          onClick={() => this.fetchSessionIds()}
                        >
                          {this.renderRefreshButton()}
                        </Button>
                      </div>
                    </h4>
                    <Accordion>
                      {this.renderMetricsCards()}
                    </Accordion>
                    <Pagination className="pagination">
                      {this.renderPagination()}
                    </Pagination>
                  </div>
                </Tab>
                <Tab eventKey="event-chart" title="Chart (Events)">
                  <div className="charts">
                    <Card.Title>
                      Visits by Event Type
                    </Card.Title>
                    {this.renderChart()}
                  </div>
                </Tab>
                <Tab eventKey="period-chart" title="Chart (Time)">
                  <div className="charts">
                    <Card.Title>
                      {this.state.sortPeriod} Visits
                    </Card.Title>
                    <ButtonGroup className="period-select">
                      <Button
                        variant={this.state.sortPeriod === "Monthly" ? "primary" : "secondary"}
                        onClick={this.handlePeriodSelect}
                        value="Monthly">Monthly</Button>
                      <Button
                        variant={this.state.sortPeriod === "Weekly" ? "primary" : "secondary"}
                        onClick={this.handlePeriodSelect}
                        value="Weekly">Weekly</Button>
                      <Button
                        variant={this.state.sortPeriod === "Daily" ? "primary" : "secondary"}
                        onClick={this.handlePeriodSelect}
                        value="Daily">Daily</Button>
                    </ButtonGroup>
                    {this.renderVisitsByPeriod()}
                  </div>
                </Tab>
                <Tab eventKey="links" title="Links">
                  <div className="links">
                    {this.renderLinks()}
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