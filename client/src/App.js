import React from 'react'
import Display from './Display'
import './App.css'

import { Layout, Menu, Icon, Row } from 'antd'
const { Header, Content, Footer, Sider } = Layout

//const nav

class App extends React.Component {
  state = {nav: '1'}

  render() {
    return (
      <Layout  style={{height:"100vh"}}>
        <Header>
          <h2 className='title logo' >Session</h2>
          <h2 className='title logo' >Log</h2>
          {/*
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' , marginLeft: 0, float: 'left' }}
            selectable={false}
          >
            <Menu.Item key="2" style={{fontFamily: 'PT Mono', fontSize: 25, marginLeft: 0}}>Session Log</Menu.Item>
          </Menu>
          */}
        </Header>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => { console.log(broken); }}
            onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
            style={{zIndex: 2}}
          >
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.state.nav]} onSelect={(item, key, selectedKeys) => this.setState({nav: item.key}) }>
              <Menu.Item></Menu.Item>
              <Menu.Item key="1">
                <Icon type="compass" theme="filled" style={{fontSize:'18px'}} />
                <span className="nav-text">Surf Forecast</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="plus-circle" theme="filled" style={{fontSize:'18px'}} />
                <span className="nav-text">Record Session</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="database" theme="filled" style={{fontSize:'18px'}} />
                <span className="nav-text">Public Database</span>
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="database" theme="filled" style={{fontSize:'18px'}} />
                <span className="nav-text">Private Database</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Row style={{ marginBottom: 100}}>
              <Content style={{ margin: '24px 16px 0' }}>
                  <Display index={this.state.nav} />
              </Content>
            </Row>
            <Row>
              <Footer style={{ textAlign: 'center' }} theme="dark">
                <div style={{margin: '50px 0px 25px 0px'}}>
                  <a href="http://magicseaweed.com"><img src="https://im-1-uk.msw.ms/msw_powered_by.png" alt=""/></a>
                </div>
                ©2018 created by Sutter Grune
              </Footer>
            </Row>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default App
