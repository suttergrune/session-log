import React from 'react'
import { Skeleton, List, Icon } from 'antd'
import moment from 'moment'

class MSWList extends React.Component {
  state = {
    loading: false,
    payload1: null,
    payload2: null,
    location: null,
    count: null,
    data: null
  }

  componentWillMount = () => {
    const dummy = dummyData(this.props.days)
    this.setState({ data: dummy, loading: true, location: this.props.location })
    if(!this.state.payload1 && !this.state.payload2) {
      this.getForecast('OB')
      this.getForecast('Pacifica')
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.days !== prevProps.days || this.props.location !== prevProps.location) {
      console.log('criteria changed')
      // this.setState({location: this.props.location, count: this.props.days})
      // this.constructData(this.props.location, this.props.days)
      this.setState({ loading: true})
      setTimeout(() => {
        this.setState({location: this.props.location, count: this.props.days})
        this.constructData(this.props.location, this.props.days)
      }, 1000)
    }
  }

  getForecast = (location) => {
    const apiKey = '***REMOVED***'
    const spotId = (location === 'OB') ? '255' : '819'
    const proxy  = 'https://cors-anywhere.herokuapp.com/'
    const url = `${proxy}https://magicseaweed.com/api/${apiKey}/forecast/?spot_id=${spotId}`
    //const url = 'https://jsonplaceholder.typicode.com/posts'
    fetch(url)
      .then(res => res.json())
      .then(msw => {
        if(location === 'OB') this.setState({payload1: msw})
        else this.setState({payload2: msw})
      })
      .then(construct => {
        if(location === this.props.location) {
          this.constructData(location, this.props.days)
        }
      })
      .catch(err => console.log(err))
  }

  constructData = (location, count) => {
    let payload, data
    var promise = new Promise((resolve, reject) => {resolve('foo')})
    promise.then(load => {
        payload = (location === 'OB') ? this.state.payload1 : this.state.payload2
      })
      .then(format => {
        data = formatData(payload, count)
      })
      .then(set => {
        this.setState({data: data, loading: false})
      })
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={this.state.data}
          renderItem={item => (
            <List.Item
              key={item[1].key}
              actions={!loading && [<IconText type="global" theme="outlined" text={ (this.state.location === 'OB') ? 'Ocean Beach, SF' : 'Linda Mar, Pacifica' } />]}
              extra={!loading && <img width={250} alt="logo" src={item[0].chart} style={{marginBottom: 20}} />}
            >
              <Skeleton loading={loading} active>
                <List.Item.Meta
                  title={item[0].day}
                  description={item[0].size}
                />
                <ul>
                  <li>{item[1].time+item[1].swell+item[1].direction+item[1].period+item[1].wind}</li>
                  <li>{item[2].time+item[2].swell+item[2].direction+item[2].period+item[2].wind}</li>
                  <li>{item[3].time+item[3].swell+item[3].direction+item[3].period+item[3].wind}</li>
                </ul>
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default MSWList

var dummyData = (num) => {
  let arr = []
  for(let k=0; k<num; k++) {
    arr.push([
      { key: 0, day: 'Wednesday (10/10)', size: 'wave size: 3-5 ft', chart: 'https://hist-3.msw.ms/wave/750/12-1537779600-1.gif' },
      { key: 1, time: '6 am: ', swell: `5-7 ft swell `, direction: '(WNW) ', period: `at 11 sec, `, wind: `WSW winds (8 mph)` },
      { key: 2, time: '12 pm: ', swell: `5-7 ft swell `, direction: '(WNW) ', period: `at 11 sec, `, wind: `WSW winds (8 mph)` },
      { key: 3, time: '6 pm: ', swell: `5-7 ft swell `, direction: '(WNW) ', period: `at 11 sec, `, wind: `WSW winds (8 mph)` }
    ])
  }
  return arr
}

var formatData = (payload, count) => {
  let items = []
  let last
  for(let i=0; i<count; i++) {
    let arr = []
    last = (i+1)*8+1
    for(let j=i*8; j<42; j++) {
      if(j === last) {
        items.push([
          {
            key: 0,
            day: `${moment.unix(arr[4].localTimestamp).format('dddd')}  ${moment.unix(arr[4].localTimestamp).format('M/DD')}`,
            size: `wave size: ${arr[4].swell.minBreakingHeight}-${arr[4].swell.maxBreakingHeight} ft`,
            chart: arr[4].charts.swell
          },
          {
            key: 1,
            time: `${moment.unix(arr[4].localTimestamp).format('h:mm a')}: `,
            swell: `${arr[4].swell.components.primary.height} ft swell `,
            direction: `(${arr[4].swell.components.primary.compassDirection}) `,
            period: `at ${arr[4].swell.components.primary.period} sec, `,
            wind: `${arr[4].wind.compassDirection} winds (${arr[4].wind.speed} mph)`
          },
          {
            key: 2,
            time: `${moment.unix(arr[6].localTimestamp).format('h:mm a')}: `,
            swell: `${arr[6].swell.components.primary.height} ft swell `,
            direction: `(${arr[6].swell.components.primary.compassDirection}) `,
            period: `at ${arr[6].swell.components.primary.period} sec, `,
            wind: `${arr[6].wind.compassDirection} winds (${arr[6].wind.speed} mph)`
          },
          {
            key: 3,
            time: `${moment.unix(arr[8].localTimestamp).format('h:mm a')}: `,
            swell: `${arr[8].swell.components.primary.height} ft swell `,
            direction: `(${arr[8].swell.components.primary.compassDirection}) `,
            period: `at ${arr[8].swell.components.primary.period} sec, `,
            wind: `${arr[8].wind.compassDirection} winds (${arr[8].wind.speed} mph)`
          }
        ])
        break;
      }
      if(j<40) {arr.push(payload[j])}
      else {arr.push(payload[39])}
    }
  }
  return items
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)
