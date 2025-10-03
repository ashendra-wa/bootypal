import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  notification,
} from "antd";
import axios from "axios";
import { baseUrl } from "../config";
const { Title } = Typography;
const { Paragraph } = Typography;
const { Content } = Layout;

function DeleteAccount() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      // Make API call to submit form data
      const response = await axios.delete(`${baseUrl}/api/user/delete-account/${values.email}`);
      if (response.data.success) {
        notification.info({
          message: 'Info',
          description: 'Account delete successfully',
          placement: 'topRight' // You can adjust the placement as needed
        });
        form.resetFields();
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
            <Col xs={24} sm={20} md={16} lg={12} xl={8}>
              <Title level={5} style={{ "color": "black" }} className="text-center text-black font-normal">
                Delete Your Account
              </Title>
              <Paragraph style={{ marginBottom: "20px", textAlign: 'center' }}>
                This action cannot be undone. All your data will be permanently deleted.
              </Paragraph>
              <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Enter your registered email address"
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

                <Form.Item>
                  <Button
                    type="primary"
                    danger
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Delete
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

export default DeleteAccount;
