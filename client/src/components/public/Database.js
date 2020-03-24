import React from 'react'
import { Table, Modal } from 'antd'
import moment from 'moment'

class Database extends React.Component {
  constructor(props) {
    super(props)
    this.state = {data: [], visible: false, chartLink: ''}
    this.columns = [{
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 105,
      fixed: 'left',
      sorter: (a, b) => moment(a.date) - moment(b.date)
    }, {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: 150,
      fixed: 'left',
      filters: [{
        text: 'Ocean Beach, SF',
        value: 'Ocean Beach, SF',
      }, {
        text: 'Linda Mar, Pacifica',
        value: 'Linda Mar, Pacifica',
      }],
      onFilter: (value, record) => record.location.indexOf(value) === 0
    }, {
      title: 'Session',
      children: [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 100
      }, {
        title: 'Time',
        dataIndex: 'sTime',
        key: 'sTime',
        width: 90,
        sorter: (a, b) => moment(a.date) - moment(b.date)
      }, {
        title: 'Waves',
        dataIndex: 'sWaves',
        key: 'sWaves',
        width: 75
      }, {
        title: 'Wind',
        dataIndex: 'sWind',
        key: 'sWind',
        width: 87
      }, {
        title: 'Overall',
        dataIndex: 'sOverall',
        key: 'sOverall',
        width: 75
      }],
    }, {
      title: 'Forecast',
      children: [{
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
        width: 75,
        sorter: (a, b) => moment(a.date) - moment(b.date)
      }, {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
        width: 75
      }, {
        title: 'Wind',
        dataIndex: 'wind',
        key: 'wind',
        width: 118
      }, {
        title: 'Primary Swell',
        children: [{
          title: 'Swell',
          dataIndex: 'swell1',
          key: 'swell1',
          width: 75
        }, {
          title: 'Period',
          dataIndex: 'period1',
          key: 'period1',
          width: 75
        }, {
          title: 'Direction',
          dataIndex: 'direction1',
          key: 'direction1',
          width: 80
        }]
      }, {
        title: 'Secondary Swell',
        children: [{
          title: 'Swell',
          dataIndex: 'swell2',
          key: 'swell2',
          width: 75
        }, {
          title: 'Period',
          dataIndex: 'period2',
          key: 'period2',
          width: 75
        }, {
          title: 'Direction',
          dataIndex: 'direction2',
          key: 'direction2'
        }]
      }],
    }, {
        title: 'Chart',
        key: 'view',
        fixed: 'right',
        width: 65,
        render: (text, record) => <a href="javascript:;" onClick={() => this.showModal(record.key)}>view</a>
    }]
  }

  componentWillMount() {
    fetch('/public/get')
      .then(res => res.json())
      .then(docs => formatData(docs))
      .then(data => this.setState({data: data}))
      .catch(err => console.log(err))
  }

  showModal = (index) => {
    this.setState({
      chartLink: this.state.data[index].chart,
      visible: true,
    });
  }

  handleCancel = (e) => {
    //console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (this.state.data) ? (
      <div>
        { (this.state.visible) ? <Modal
          title="Swell Chart"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <div style={{margin: 'auto'}}>
            <img src={this.state.chartLink} style={{width: '100%'}} alt='loading...' />
          </div>
        </Modal> : null}
        <Table
          columns={this.columns}
          dataSource={this.state.data}
          bordered
          size="middle"
          scroll={{ x: 1480 }}
          pagination={false}
        />
      </div>
    ) : null
  }

}

export default Database

function formatData(docs) {
  let data = []
  for(let i=0; i<docs.length; i++) {
    data.push({
      key: i,
      date: moment(docs[i].session['time-picker']).format('MM/DD/YYYY'),
      location: (docs[i].session.location === 'OB') ? 'Ocean Beach, SF' : 'Linda Mar, Pacifica',
      name: docs[i].session.name,
      sTime: moment(docs[i].session['time-picker']).format('h:mm a'),
      sWaves: docs[i].session.wave,
      sWind: docs[i].session.wind,
      sOverall: `${docs[i].session.rate} stars`,
      time: moment.unix(docs[i].forecast.localTimestamp).format('h a'),
      size: `${docs[i].forecast.swell.minBreakingHeight}-${docs[i].forecast.swell.maxBreakingHeight} ft`,
      wind: `${docs[i].forecast.wind.compassDirection} (${docs[i].forecast.wind.speed} mph)`,
      swell1: `${docs[i].forecast.swell.components.primary.height} ft`,
      period1: `${docs[i].forecast.swell.components.primary.period} sec`,
      direction1: docs[i].forecast.swell.components.primary.compassDirection,
      swell2: `${docs[i].forecast.swell.components.secondary.height} ft`,
      period2: `${docs[i].forecast.swell.components.secondary.period} sec`,
      direction2: docs[i].forecast.swell.components.secondary.compassDirection,
      chart: docs[i].forecast.charts.swell
    })
  }
  return data
}
