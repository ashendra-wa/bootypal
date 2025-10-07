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
import { backendUrl } from "../../config";
import ReactQuill from "react-quill";

const { Title } = Typography;
const { Item } = Form;
const { Option } = Select;

function LanguageSpeak() {
  const { languageSpeakId } = useParams();
  const history = useHistory();
  const [form] = Form.useForm();
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [answerError, setAnswerError] = useState(false);

  useEffect(() => {
    if (languageSpeakId) {
      setIsUpdateMode(true);
      fetchUniversityDetails();
    }
  }, [languageSpeakId]);

  const fetchUniversityDetails = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/language/read/${languageSpeakId}`
      );
      if (response.status === 200) {
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
          `${backendUrl}/api/language/update/${languageSpeakId}`,
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
            description: "language updated successfully!",
            placement: "topRight",
          });
          history.push("/language-speak");
        } else {
          notification.info({
            message: "Info",
            description: response.data.message,
            placement: "topRight",
          });
        }
      } else {
        const response = await axios.post(
          `${backendUrl}/api/language/create`,
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
            description: "language added successfully!",
            placement: "topRight",
          });
          form.resetFields();
          history.push("/language-speak");
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
                <span>
                  {isUpdateMode
                    ? "Update Language Speak"
                    : "Add Language Speak"}
                </span>
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
                    label="Language Name"
                    name="name"
                    rules={[
                      { required: true, message: "Please enter question" },
                    ]}
                  >
                    <Input />
                  </Item>
                </Col>

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
