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

function EventForm() {
    const { planId } = useParams(); // Extract planId from URL
    const history = useHistory();
    const [form] = Form.useForm();
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [image, setImage] = useState(null);

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

            if (key === 'image') {
                formData.append('file', image);
            } else {
                formData.append(key, values[key]);
            }
        }
        try {
            if (isUpdateMode) {
                const response = await axios.patch(`${baseUrl}/api/event/update/${planId}`, formData, {
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
                    history.push('/event');
                } else {
                    notification.info({
                        message: 'Info',
                        description: response.data.message,
                        placement: 'topRight'
                    });
                }
            } else {
                const response = await axios.post(`${baseUrl}/api/event/create`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                    },
                });
                if (response.status === 200) {
                    notification.success({
                        message: 'Success',
                        description: 'Event added successfully!',
                        placement: 'topRight'
                    });
                    form.resetFields();
                    history.push('/event');
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
                        title={isUpdateMode ? "Update Event" : "Add Event"}
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
                                        label="Venue"
                                        name="venue"
                                        rules={[{ required: true, message: 'Please enter venue' }]}
                                    >
                                        <Input placeholder="Please enter venue" />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Upload event image" imageSelect
                                        name="image"
                                        rules={[{ required: true, message: 'Event image is required' }]}
                                    >
                                        <Input type="file" onChange={(e) => eventImageSelect(e.target.files[0])} />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Start time"
                                        name="startTime"
                                        rules={[{ required: true, message: 'Please select start time' }]}
                                    >
                                        <Input type="time" placeholder="Please select start time" />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="End time"
                                        name="endTime"
                                        rules={[{ required: true, message: 'Please select end time' }]}
                                    >
                                        <Input type="time" placeholder="Please select end time" />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Day and date"
                                        name="date"
                                        rules={[{ required: true, message: 'Please enter date and date' }]}
                                    >
                                        <Input type="date" placeholder="Please enter date and date" />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Number of participants"
                                        name="numberOfParticipants"
                                        rules={[{ required: true, message: 'Please enter number of participants' }]}
                                    >
                                        <Input type="number" placeholder="Please enter number of participants" />
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

export default EventForm;
