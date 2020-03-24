import React from 'react'
import { Row, Col } from 'antd';
import Database from './Database'

class Public extends React.Component {

  render () {
    return (
      <div>
        <Row>
          <Col span={22} offset={1}>
            <h2 style={{ marginTop: 16, marginBottom: 64 }}>Private Database</h2>
          </Col>
        </Row>
        <Row>
          {/* <Col span={22} offset={1}> */}
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 22, offset: 1 }} lg={{ span: 22, offset: 1 }} xl={{ span: 22, offset: 1 }}>
            <Database />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Public;
