import React, {Component} from 'react'
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';

const FormItem = Form.Item;

export default class NormalLoginForm extends Component {
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values);
  //     }
  //   });
  // }

  render() {
    // const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-component">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          </FormItem>
          <FormItem>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          </FormItem>
          <FormItem>
            <Checkbox>Remember me</Checkbox>
            <a className="login-form-forgot" href="">Forgot password</a>
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}