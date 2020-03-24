import React from 'react'
import Forecast from './components/forecast/Forecast'
import Record from './components/record/Record'
import Public from './components/public/Public'
import Private from './components/private/Private'

class Display extends React.Component {

  render () {
    if(this.props.index === '1') return <Forecast />
    else if(this.props.index === '2') return <Record />
    else if(this.props.index === '3') return <Public />
    else return <Private />
  }
}

export default Display;
