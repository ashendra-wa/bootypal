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
} from "antd";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { baseUrl } from "../../config";

const { Item } = Form;
const { Option } = Select;

function EventCategoryForm() {
    const { planId } = useParams(); // Extract planId from URL
    const history = useHistory();
    const [form] = Form.useForm();
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [image, setImage] = useState(null);
    const [uploadImage, setUploadImage] = useState();

    useEffect(() => {
        // Check if planId exists to determine if it's an update mode
        if (planId) {
            setIsUpdateMode(true);
            fetchDetails();
        }
    }, [planId]);

    const fetchDetails = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/event-category/read/${planId}`);
            if (response.data.success) {
                form.setFieldsValue(response.data.result);
                setUploadImage(response.data.result.file);
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

            if (key === 'image') {
                // if (image) {
                formData.append('file', image);
                // }

            } else {
                formData.append(key, values[key]);
            }
        }
        try {
            if (isUpdateMode) {
                const response = await axios.patch(`${baseUrl}/api/event-category/update/${planId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                    },
                });
                if (response.data.success) {
                    notification.success({
                        message: 'Success',
                        description: 'Event category updated successfully!',
                        placement: 'topRight'
                    });
                    history.push('/event-category');
                } else {
                    notification.info({
                        message: 'Info',
                        description: response.data.message,
                        placement: 'topRight'
                    });
                }
            } else {
                const response = await axios.post(`${baseUrl}/api/event-category/create`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                    },
                });
                if (response.status === 200) {
                    notification.success({
                        message: 'Success',
                        description: 'Event category added successfully!',
                        placement: 'topRight'
                    });
                    form.resetFields();
                    history.push('/event-category');
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

    function eventImageSelect(image) {
        setImage(image);
    }

    return (
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>{isUpdateMode ? "Update Event Category" : "Add Event Category"}</span>
                            <Button type="primary" onClick={() => history.goBack()}>Back</Button>
                        </div>}
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
                                {/* <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Icon" imageSelect
                                        name="image"
                                        rules={[{ required: !planId, message: 'Event category icon is required' }]}
                                    >
                                        <Input accept=".svg" type="file" onChange={(e) => eventImageSelect(e.target.files[0])} />
                                    </Item>
                                    {uploadImage && (
                                        <img src={baseUrl + '/' + uploadImage} />
                                    )}
                                </Col> */}
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Status"
                                        name="enabled"
                                        rules={[{ required: true, message: 'Please select status' }]}
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
