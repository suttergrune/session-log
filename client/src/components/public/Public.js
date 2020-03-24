import React from 'react'
import { Row, Col } from 'antd';
import Database from './Database'

class Public extends React.Component {

  render () {
    return (
      <div>
        <Row>
          <Col span={22} offset={1}>
            <h2 style={{ marginTop: 16, marginBottom: 16 }}>Public Database</h2>
            <p style={{ marginBottom: 64 }}>You can populate this database by recording a session in the <i>Record Session</i> section of the left-hand menu. This database is for anyone who wishes to test the functionality of this website. </p>
          </Col>
        </Row>
        <Row>
          {/* <Col span={22} offset={1} > */}
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 22, offset: 1 }} lg={{ span: 22, offset: 1 }} xl={{ span: 22, offset: 1 }}>
            <Database />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Public;
