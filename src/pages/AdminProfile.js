import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Typography, notification, Form, Input, Upload } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../config";
import Loader from "../components/Loader";

const { Title } = Typography;
const { Item } = Form;

function UserProfile() {
    const history = useHistory();
    const [form] = Form.useForm();
    const [userData, setUserData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/api/user/read`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            if (response.status === 200) {
                setUserData(response.data.result);
                setImageUrl(response.data.result.photo ? `${baseUrl}/${response.data.result.photo}` : null); // Assuming `photo` field in user
                form.setFieldsValue({
                    email: response.data.result.email,
                    password: "",
                });
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
        } finally {
            setLoading(false);
        }
    };

    const onFinish = async (values) => {
        try {
            const formData = new FormData();
            formData.append("email", values.email);
            formData.append("password", values.password);
            if (file) {
                formData.append("file", file); // Assuming your backend accepts 'photo' for the image
            }

            const response = await axios.patch(
                `${baseUrl}/api/admin/profile/update`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                localStorage.setItem('photo', response.data.result.photo);
                notification.success({
                    message: "Success",
                    description: "Profile updated successfully!",
                    placement: "topRight",
                });
                window.location.href = "/dashboard";
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    return (
        <div className="tabled">
            <Loader visible={loading} />
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                    <Card bordered={false} className="criclebox tablespace mb-24" title="Update Profile">
                        <Form style={{ padding: "20px" }} form={form} onFinish={onFinish} layout="vertical">
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={24} lg={24}>
                                    <Item>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <div style={{
                                                width: "100px",
                                                height: "100px",
                                                borderRadius: "50%",
                                                overflow: "hidden",
                                                marginBottom: "10px",
                                                border: "2px solid #ddd",
                                            }}>
                                                <img
                                                    src={imageUrl || '/avatar.jpg'}
                                                    alt="Profile"
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                />
                                            </div>
                                            <input type="file" accept="image/*" onChange={handleImageChange} />
                                        </div>
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            { required: true, message: "Please enter your email" },
                                            { type: "email", message: "Invalid email address" },
                                        ]}
                                    >
                                        <Input className="input-full-height" />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="New Password"
                                        name="password"
                                        rules={[
                                            { required: true, message: "Please enter a new password" },
                                            { min: 6, message: "Password must be at least 6 characters" },
                                        ]}
                                    >
                                        <Input.Password className="input-full-height" />
                                    </Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={12} lg={8}>
                                    <Item>
                                        <Button type="primary" htmlType="submit">
                                            Update Profile
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

export default UserProfile;
