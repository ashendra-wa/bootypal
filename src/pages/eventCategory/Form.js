import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
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

const { Item } = Form;
const { Option } = Select;

function EventCategoryForm() {
  const { planId } = useParams(); // Extract planId from URL
  const history = useHistory();
  const [form] = Form.useForm();
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (planId) {
      setIsUpdateMode(true);
      fetchDetails();
    }
  }, [planId]);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/event-category/read/${planId}`
      );
      if (response.data.success) {
        form.setFieldsValue(response.data.result);
        const imgPath = response.data.result.icon
          ? `${baseUrl}/${response.data.result.icon}`
          : null;
        setPreviewImage(imgPath);
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
    const formData = new FormData();

    // Append all non-file fields
    for (let key in values) {
      if (key !== "icon") {
        formData.append(key, values[key]);
      }
    }

    // Append file if selected
    if (image) {
      formData.append("icon", image);
    }

    try {
      if (isUpdateMode) {
        const response = await axios.patch(
          `${baseUrl}/api/eventcategory/update-with-icon/${planId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.success) {
          notification.success({
            message: "Success",
            description: "Event category updated successfully!",
            placement: "topRight",
          });
          history.push("/event-category");
        } else {
          notification.info({
            message: "Info",
            description: response.data.message,
            placement: "topRight",
          });
        }
      } else {
        const response = await axios.post(
          `${baseUrl}/api/eventcategory/create-with-icon`,
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
            description: "Event category added successfully!",
            placement: "topRight",
          });
          form.resetFields();
          setPreviewImage(null);
          setImage(null);
          history.push("/event-category");
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
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  console.log("previewImagepreviewImagepreviewImage", previewImage);
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
                    ? "Update Event Category"
                    : "Add Event Category"}
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
              layout="vertical"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={12}>
                  <Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter name" }]}
                  >
                    <Input placeholder="Please enter name" />
                  </Item>
                </Col>

                <Col xs={24} sm={12} lg={12}>
                  <Item
                    label="Icon (Image)"
                    name="icon"
                    rules={[
                      {
                        required: !previewImage,
                        message: "Please upload an image",
                      },
                    ]}
                  >
                    <Upload
                      listType="picture"
                      showUploadList={false}
                      beforeUpload={() => false}
                      onChange={handleImageChange}
                    >
                      <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                    {previewImage && previewImage == "undefined" && (
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

export default EventCategoryForm;
