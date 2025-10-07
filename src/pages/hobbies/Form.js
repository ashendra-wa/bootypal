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
  Upload,
} from "antd";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { baseUrl } from "../../config";
import { UploadOutlined } from "@ant-design/icons";
const { Title } = Typography;
const { Item } = Form;
const { Option } = Select;

function HobbiesForm() {
  const { hobbiesId } = useParams();
  const history = useHistory();
  const [form] = Form.useForm();
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (hobbiesId) {
      setIsUpdateMode(true);
      fetchDetails();
    }
  }, [hobbiesId]);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/hobbies/read/${hobbiesId}`
      );
      if (response.status === 200) {
        form.setFieldsValue(response.data.result);
        setPreviewImage(`${baseUrl}/${response.data.result.icon}`);
        setImageFile(`${baseUrl}/${response.data.result.icon}`);
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
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("enabled", values.enabled);
      if (imageFile) formData.append("icon", imageFile);
      if (isUpdateMode) {
        const response = await axios.patch(
          `${baseUrl}/api/hobbies/update-with-icon `,
          values,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          notification.success({
            message: "Success",
            description: "Hobbies updated successfully!",
            placement: "topRight",
          });
          history.push("/hobbies");
        } else {
          notification.info({
            message: "Info",
            description: response.data.message,
            placement: "topRight",
          });
        }
      } else {
        const response = await axios.post(
          `${baseUrl}/api/hobbies/create-with-icon`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          notification.success({
            message: "Success",
            description: "Hobbies added successfully!",
            placement: "topRight",
          });
          form.resetFields();
          history.push("/hobbies");
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

  const handleImageChange = (info) => {
    const file = info.file;
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
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
                <span>{isUpdateMode ? "Update Hobbies" : "Add Hobbies"}</span>
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
              layout="vertical"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={12}>
                  <Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter name" }]}
                  >
                    <Input />
                  </Item>
                </Col>
                <Col xs={24} sm={12} lg={12}>
                  <Item
                    label="Icon (Image)"
                    name="icon"
                    rules={[
                      {
                        required: !imageFile || !previewImage,
                        message: "Please upload an image",
                      },
                    ]}
                  >
                    <Upload
                      listType="picture"
                      showUploadList={false}
                      beforeUpload={() => false} // prevent auto upload
                      onChange={handleImageChange}
                    >
                      <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                    {previewImage && (
                      <div style={{ marginTop: 10 }}>
                        <img
                          src={previewImage}
                          alt="Preview"
                          style={{ width: 100, height: 100, borderRadius: 8 }}
                        />
                      </div>
                    )}
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

export default HobbiesForm;
