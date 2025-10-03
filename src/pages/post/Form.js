import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Card,
    Button,
    notification,
    Form,
    Input,
} from "antd";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { baseUrl } from "../../config";

const { Item } = Form;

function PostForm() {
    const { planId } = useParams(); // Extract planId from URL
    const history = useHistory();
    const [form] = Form.useForm();
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [video, setVideo] = useState(null);

    useEffect(() => {
        // Check if planId exists to determine if it's an update mode
        if (planId) {
            setIsUpdateMode(true);
            fetchDetails();
        }
    }, [planId]);

    const fetchDetails = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/plan/read/${planId}`);
            if (response.data.success) {
                form.setFieldsValue(response.data.result);
            } else {
                notification.info({
                    message: 'Info',
                    description: response.data.message,
                    placement: 'topRight'
                });
            }
        } catch (error) {
            console.error("API error:", error);
            notification.info({
                message: 'Info',
                description: error.response?.data?.message,
                placement: 'topRight'
            });
        }
    };

    const onFinish = async (values) => {
        const formData = new FormData();
        for (let key in values) {
            console.log("key", key);

            if (key === 'image1') {
                formData.append('image1', image1);
            } else if (key === 'image2') {
                formData.append('image2', image2);
            } else if (key === 'image3') {
                formData.append('image3', image3);
            } else if (key === 'video') {
                formData.append('video', video);
            } else {
                formData.append(key, values[key]);
            }
        }
        formData.append('userId', localStorage.getItem('userId'))
        try {
            if (isUpdateMode) {
                const response = await axios.patch(`${baseUrl}/api/post/update/${planId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                    },
                });
                if (response.data.success) {
                    notification.success({
                        message: 'Success',
                        description: 'Event updated successfully!',
                        placement: 'topRight'
                    });
                    history.push('/post');
                } else {
                    notification.info({
                        message: 'Info',
                        description: response.data.message,
                        placement: 'topRight'
                    });
                }
            } else {
                const response = await axios.post(`${baseUrl}/api/post/create`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                    },
                });
                if (response.status === 200) {
                    notification.success({
                        message: 'Success',
                        description: 'Post added successfully!',
                        placement: 'topRight'
                    });
                    form.resetFields();
                    history.push('/post');
                } else {
                    notification.info({
                        message: 'Info',
                        description: response.data.message,
                        placement: 'topRight'
                    });
                }
            }
        } catch (error) {
            console.error("API error:", error);
            notification.info({
                message: 'Info',
                description: error.response?.data?.message,
                placement: 'topRight'
            });
        }
    };
    function postImageSelect1(image) {
        setImage1(image);
    }

    function postImageSelect2(image) {
        setImage2(image);
    }

    function postImageSelect3(image) {
        setImage3(image);
    }

    function postVideoSelect(image) {
        setVideo(image);
    }

    return (
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title={isUpdateMode ? "Update Post" : "Add Post"}
                    >
                        <Form style={{ "padding": "20px" }} form={form} onFinish={onFinish} layout="vertical">
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Name"
                                        name="name"
                                        rules={[{ required: true, message: 'Please enter name' }]}
                                    >
                                        <Input placeholder="Please enter name" />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Upload post image 1" imageSelect
                                        name="image1"
                                        rules={[{ required: false, message: 'Image is required' }]}
                                    >
                                        <Input type="file" onChange={(e) => postImageSelect1(e.target.files[0])} />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Upload post image 2" imageSelect
                                        name="image2"
                                        rules={[{ required: false, message: 'Image is required' }]}
                                    >
                                        <Input type="file" onChange={(e) => postImageSelect2(e.target.files[0])} />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Upload post image 3" imageSelect
                                        name="image3"
                                        rules={[{ required: false, message: 'Image is required' }]}
                                    >
                                        <Input type="file" onChange={(e) => postImageSelect3(e.target.files[0])} />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Upload post video" imageSelect
                                        name="video"
                                        rules={[{ required: false, message: 'Video is required' }]}
                                    >
                                        <Input type="file" onChange={(e) => postVideoSelect(e.target.files[0])} />
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

export default PostForm;
