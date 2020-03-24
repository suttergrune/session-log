import React from 'react'
import { Row, Col } from 'antd';
import WrappedApp from './Form'
//import Day from './Day'

class Record extends React.Component {

  render () {
    return (
      <div>
        <Row>
          <Col span={22} offset={1}>
            <h2 style={{ marginTop: 16, marginBottom: 16 }}>Did you surf today?</h2>
            <p style={{ marginBottom: 64 }}> This action will record a session in one of the databases. Feel free to test it! </p>
          </Col>
        </Row>
        <Row>
          <Col span={22} offset={1}>
            <WrappedApp />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Record;
