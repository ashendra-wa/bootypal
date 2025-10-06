import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Typography,
  notification,
  Form,
  Input,
  Select,
} from "antd";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { baseUrl } from "../../config";
import ReactQuill from "react-quill";

const { Title } = Typography;
const { Item } = Form;
const { Option } = Select;

function LanguageSpeak() {
  const { faqId } = useParams(); // Extract faqId from URL
  const history = useHistory();
  const [form] = Form.useForm();
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [universityData, setUniversityData] = useState(null);
  const [answerError, setAnswerError] = useState(false);

  useEffect(() => {
    // Check if faqId exists to determine if it's an update mode
    if (faqId) {
      setIsUpdateMode(true);
      fetchUniversityDetails();
    }
  }, [faqId]);

  const fetchUniversityDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/faq/read/${faqId}`);
      if (response.status === 200) {
        setUniversityData(response.data.result);
        form.setFieldsValue(response.data.result); // Populate form fields with fetched data
      } else {
        notification.info({
          message: "Info",
          description: response.data.message,
          placement: "topRight",
        });
      }
    } catch (error) {
      console.error("API error:", error);
      notification.info({
        message: "Info",
        description: error.response?.data?.message,
        placement: "topRight",
      });
    }
  };

  const onFinish = async (values) => {
    try {
      if (isUpdateMode) {
        const response = await axios.patch(
          `${baseUrl}/api/faq/update/${faqId}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include access token in headers
            },
          }
        );
        if (response.status === 200) {
          notification.success({
            message: "Success",
            description: "Faq updated successfully!",
            placement: "topRight",
          });
          history.push("/faq");
        } else {
          notification.info({
            message: "Info",
            description: response.data.message,
            placement: "topRight",
          });
        }
      } else {
        const response = await axios.post(`${baseUrl}/api/faq/create`, values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include access token in headers
          },
        });
        if (response.status === 200) {
          notification.success({
            message: "Success",
            description: "Faq added successfully!",
            placement: "topRight",
          });
          form.resetFields();
          history.push("/faq");
        } else {
          notification.info({
            message: "Info",
            description: response.data.message,
            placement: "topRight",
          });
        }
      }
    } catch (error) {
      console.error("API error:", error);
      notification.info({
        message: "Info",
        description: error.response?.data?.message,
        placement: "topRight",
      });
    }
  };

  const onFinishFailed = ({ errorFields }) => {
    console.log("errorFields", errorFields);

    const hasAnswerError = errorFields.some(
      (field) => field.name[0] === "answer"
    );
    if (hasAnswerError) {
      setAnswerError(hasAnswerError);
    } else {
      setAnswerError(false);
    }
  };

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{isUpdateMode ? "Update Faq" : "Add Faq"}</span>
                <Button type="primary" onClick={() => history.goBack()}>
                  Back
                </Button>
              </div>
            }
          >
            <Form
              style={{ padding: "20px" }}
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={12}>
                  <Item
                    label="Question"
                    name="question"
                    rules={[
                      { required: true, message: "Please enter question" },
                    ]}
                  >
                    <Input />
                  </Item>
                </Col>
                <Col xs={24} sm={12} lg={12}>
                  <Item
                    label="Answer"
                    name="answer"
                    rules={[{ required: true, message: "Please enter answer" }]}
                  >
                    <ReactQuill
                      style={{
                        border: answerError
                          ? "1px solid red"
                          : "1px solid #d9d9d9",
                        borderRadius: 6,
                        // padding: 2
                      }}
                    />
                  </Item>
                </Col>
                {/* <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Category"
                                        name="category"
                                        rules={[{ required: true, message: 'Please select category' }]}
                                    >
                                        <Select placeholder="Please select category">
                                            <Option value="Profile">Profile</Option>
                                            <Option value="Safety">Safety</Option>
                                            <Option value="Data">Data</Option>
                                        </Select>
                                    </Item>
                                </Col> */}
                <Col xs={24} sm={12} lg={12}>
                  <Item
                    label="Status"
                    name="enabled"
                    rules={[
                      { required: true, message: "Please select status" },
                    ]}
                  >
                    <Select placeholder="Please select status">
                      <Option value={true}>Active</Option>
                      <Option value={false}>Inactive</Option>
                    </Select>
                  </Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={12} lg={8}>
                  <Item>
                    <Button type="primary" htmlType="submit">
                      {isUpdateMode ? "Update" : "Add"}
                    </Button>
                  </Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default LanguageSpeak;
