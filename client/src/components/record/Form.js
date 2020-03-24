import React from 'react';
import { Form, Select, Input, TimePicker, Rate, Switch, Button, message } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {private: false}
    this.switchToPrivate = this.switchToPrivate.bind(this)
    this.postPrivate = this.postPrivate.bind(this)
    this.postPublic = this.postPublic.bind(this)
  }

  switchToPrivate() {
    this.setState(prevState => ({
      private: !prevState.private
    }))
  }

  postPrivate(vals) {
    var progress = message.loading('Adding to database...', 2.5)
    fetch('/private/post', {
      method: 'POST',
      body: JSON.stringify(vals),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if(res.ok) {progress.then(() => message.success('Insertion Successful', 2.5))}
        else if(res.status === 401) {progress.then(() => message.error('Invalid Password', 2.5))}
        else {progress.then(() => message.error('Failed to connect to database', 2.5))}
      })
      .catch(err => console.log(err))
  }

  postPublic(vals) {
    var progress = message.loading('Adding to database...', 2.5)
    fetch('/public/post', {
      method: 'POST',
      body: JSON.stringify(vals),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(res.status)
        if(res.ok) {progress.then(() => message.success('Insertion Successful', 2.5))}
        else {progress.then(() => message.error('Failed to connect to database', 2.5))}
      })
      .catch(err => console.log(err))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, formValues) => {
      if (!err) {
        if(formValues.password){
          this.postPrivate(formValues)
        }
        else {
          this.postPublic(formValues)
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
        lg: { span: 8 },
        xl: { span: 8 }
      }
    }
    const privateDbLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 9 },
        md: { span: 6 }
      }
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label="Name"
          labelCol={{ span: 6 }}
          {...formItemLayout}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'name required' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          label="Location"
          labelCol={{ span: 6 }}
          {...formItemLayout}
        >
          {getFieldDecorator('location', {
            rules: [{ required: true, message: 'location required' }],
          })(
            <Select
              placeholder='choose a location...'
              onChange={this.handleSelectChange}
            >
              <Option value="OB">Ocean Beach, San Francisco</Option>
              <Option value="Pacifica">Linda Mar, Pacifica</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          label="Time of Session"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator('time-picker', {
            rules: [{ required: true, message: 'time required' }]
          })(
            <TimePicker use12Hours format="h:mm A" />
          )}
        </FormItem>
        <FormItem
          label="Waves"
          labelCol={{ span: 6 }}
          {...formItemLayout}
        >
          {getFieldDecorator('wave')(
            <Select
              placeholder='rate the waves...'
              onChange={this.handleSelectChange}
            >
              <Option value='aweful'>awful</Option>
              <Option value='poor'>poor</Option>
              <Option value='ok'>ok</Option>
              <Option value='good'>good</Option>
              <Option value='epic'>epic</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          label="Wind"
          labelCol={{ span: 6 }}
          {...formItemLayout}
        >
          {getFieldDecorator('wind')(
            <Select
              placeholder='rate the wind...'
              onChange={this.handleSelectChange}
            >
              <Option value='onshore'>onshore</Option>
              <Option value='sideshore'>sideshore</Option>
              <Option value='offshore'>offshore</Option>
              <Option value='no wind'>no wind</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          label="Overall"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator('rate', {
            rules: [{ required: true, message: 'overall rating required' }]
          })(
            <Rate />
          )}
        </FormItem>
        <FormItem
          label="Note"
          labelCol={{ span: 6 }}
          {...formItemLayout}
        >
          {getFieldDecorator('note')(
            <Input placeholder='provide insights on tide, sandbar, etc...'/>
          )}
        </FormItem>
        <FormItem
          label="Add to Private Database"
          {...privateDbLayout}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator('privateDB', { valuePropName: 'checked' }
          )(
            <Switch onChange={this.switchToPrivate} />
          )}
        </FormItem>
        {this.state.private ? <FormItem
          label="Password"
          labelCol={{ span: 6 }}
          {...formItemLayout}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'password required for private database' }]
          })(
            <Input />
          )}
        </FormItem> : null}
        <FormItem
          wrapperCol={{ span: 6, offset: 7 }}
        >
          <Button type="primary" htmlType="submit">
            Record Session
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedApp = Form.create()(App);
export default WrappedApp
