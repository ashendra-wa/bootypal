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
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { backendUrl } from "../../config";

const { Title } = Typography;
const { Item } = Form;
const { Option } = Select;

function LookingFor() {
  const { LookingForId } = useParams(); // Using same param name for consistency
  const history = useHistory();
  const [form] = Form.useForm();
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (LookingForId) {
      setIsUpdateMode(true);
      fetchDetails();
    }
  }, [LookingForId]);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/lookingfor/read/${LookingForId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data.result;
        form.setFieldsValue({
          name: data.name,
          enabled: data.enabled,
        });
        setPreviewImage(`${backendUrl}/${data.icon}`);
        setImageFile(`${backendUrl}/${data.icon}`);
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
    formData.append("name", values.name);
    formData.append("enabled", values.enabled);
    if (imageFile) formData.append("icon", imageFile);
    try {
      let response;
      if (isUpdateMode) {
        response = await axios.patch(
          `${backendUrl}/api/lookingfor/update/${LookingForId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          `${backendUrl}/api/lookingfor/create-with-icon`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (response.status === 200) {
        notification.success({
          message: "Success",
          description: isUpdateMode
            ? "Looking For updated successfully!"
            : "Looking For added successfully!",
          placement: "topRight",
        });
        form.resetFields();
        setImageFile(null);
        setPreviewImage(null);
        history.push("/looking-for");
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

  const handleImageChange = (info) => {
    console.log("===infoinfoinfo>", info);
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
                <span>
                  {isUpdateMode ? "Update Looking For" : "Add Looking For"}
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
                    <Input placeholder="Enter name" />
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

export default LookingFor;
