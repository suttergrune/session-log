import React from 'react'
import { Select, Button } from 'antd'

class Selection extends React.Component {
  constructor(props) {
     super(props)
     this.state = {location: 'OB', days: 3}

     // This binding is necessary to make `this` work in the callback
     this.passInfo = this.passInfo.bind(this);
     this.handleChange1 = this.handleChange1.bind(this)
     this.handleChange2 = this.handleChange2.bind(this)
  }

  passInfo() {
    this.props.forecastParams(this.state)
  }

  handleChange1(value) {
    this.setState({location: value})
  }

  handleChange2(value) {
    this.setState({days: value})
  }

  render () {
    const Option = Select.Option

    return (
      <div>
        <Select defaultValue="OB" style={{ width: 250, marginTop: 20, marginRight: 20 }} onChange={this.handleChange1}>
          <Option value="OB">Ocean Beach, San Francisco</Option>
          <Option value="Pacifica">Linda Mar, Pacifica</Option>
        </Select>
        <Select defaultValue={3} style={{ width: 100, marginTop: 20, }} onChange={this.handleChange2}>
          <Option value={1}>1 day</Option>
          <Option value={2}>2 days</Option>
          <Option value={3}>3 days</Option>
          <Option value={4}>4 days</Option>
          <Option value={5}>5 days</Option>
        </Select>
        <Button type="primary" style={{marginLeft: 20, marginTop: 20}} onClick={this.passInfo}>Show Forecast</Button>
      </div>
    )
  }
}

export default Selection
