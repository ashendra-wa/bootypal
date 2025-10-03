import React from "react";
import { useHistory } from "react-router-dom";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  notification
} from "antd";
import axios from "axios";
import { baseUrl } from "../config";
import logo from "../assets/images/logo.png";
const { Title } = Typography;
const { Content } = Layout;


function SignIn() {

  const navigate = useHistory();

  const onFinish = async (values) => {
    try {
      // Make API call to submit form data
      values.isRole = 'admin';
      const response = await axios.post(`${baseUrl}/api/login`, values);
      if (response.data.success) {
        localStorage.setItem('accessToken', response.data.result.token);
        localStorage.setItem('name', response.data.result.name);
        localStorage.setItem('userLastName', response.data.result.surname);
        localStorage.setItem('userId', response.data.result._id);
        localStorage.setItem('email', response.data.result.email);
        localStorage.setItem('photo', response.data.result.photo);
        navigate.push('/dashboard');
      } else {
        notification.destroy();
        notification.info({
          message: 'Info',
          description: response.data.message,
          placement: 'topRight' // You can adjust the placement as needed
        });
      }
      // Handle success response from the API
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Layout className="layout-default layout-signin">
        <Content className="signin" style={{ "margin-top": "100px" }}>
          <Row gutter={[24, 0]} justify="space-around">
            <Col>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img
                  src={logo} // <-- Replace with your logo path
                  alt="Logo"
                  style={{ width: '100px', height: '100px' }}
                />
              </div>
              {/* <Title className="mb-15">Log In</Title> */}
              <Title className="font-regular text-muted" level={5}>
                Enter your email and password to sign in
              </Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );

}

export default SignIn;
