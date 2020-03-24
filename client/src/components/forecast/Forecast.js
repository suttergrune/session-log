import React from 'react'
import { Row, Col } from 'antd';
import Selection from './Selection'
import MSWList from './MSWList'

class Forecast extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      location: null,
      days: 0,
    }
  }

  getForecast = (criteria) => {
    if(this.state.location !== criteria.location){
      this.setState({location: criteria.location})
    }
    if(this.state.days !== criteria.days) {
      this.setState({days: criteria.days})
    }
  }

  render () {
    return (
      <div>
        <Row>
          <Col span={22} offset={1}>
            <h2 style={{ marginTop: 16, marginBottom: 16 }}>Check the Surf Forecast</h2>
          </Col>
        </Row>
        <Row>
          <Col span={22} offset={1}>
            <Selection forecastParams={this.getForecast} />
          </Col>
        </Row>
        <Row style={{marginTop: 50}}>
          <Col xs={{ span: 24 }} sm={{ span: 22, offset: 1 }} md={{ span: 20, offset: 2 }} lg={{ span: 20, offset: 2 }} xl={{ span: 18, offset: 2 }}>
            { this.state.location ? <MSWList location={this.state.location} days={this.state.days} /> : null }
          </Col>
        </Row>
      </div>
    )
  }
}

export default Forecast;
