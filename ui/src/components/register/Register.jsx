import React from 'react';
import {
  Form, Input, Button
} from 'antd';

const FormItem = Form.Item;

export default class RegistrationForm extends React.Component {

  render() {
    return (
      <Form >
        <FormItem label="E-mail">
            <Input />
        </FormItem>
        <FormItem label="Username">
            <Input />
        </FormItem>
        <FormItem label="Password">
        <Input type="password" />
        </FormItem>
        <FormItem label="Confirm Password">
        <Input type="password" />
        </FormItem>
        <FormItem >
          <Button type="primary" htmlType="submit">Register</Button>
        </FormItem>
      </Form>
    );
  }
}