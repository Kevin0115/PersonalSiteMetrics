import React, { Component } from 'react';
import '../App.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: null
    }
  }

  componentDidMount() {
    fetch('https://ec2.kevnchoi.com/analytics/count')
    .then(res => res.json())
    .then(res => this.setState({json: res}))
    .catch(err => console.log('Error: ' + err));
  }

  renderCount() {
    if (!this.state.json) {
      return null;
    }
    return this.state.json.count;
  }

  render() {
    return (
      <div className="header-content">
        <h1>Site Metrics</h1>
        <p className="count">Total Site Visits: {this.renderCount()}</p>
      </div>
    );
  }
}

export default Header;