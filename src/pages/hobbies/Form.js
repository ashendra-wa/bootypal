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

const { Title } = Typography;
const { Item } = Form;
const { Option } = Select;

function HobbiesForm() {
    const { hobbiesId } = useParams();
    const history = useHistory();
    const [form] = Form.useForm();
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    useEffect(() => {
        if (hobbiesId) {
            setIsUpdateMode(true);
            fetchDetails();
        }
    }, [hobbiesId]);

    const fetchDetails = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/hobbies/read/${hobbiesId}`);
            if (response.status === 200) {
                form.setFieldsValue(response.data.result); // Populate form fields with fetched data
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
        try {
            if (isUpdateMode) {
                const response = await axios.patch(`${baseUrl}/api/hobbies/update/${hobbiesId}`, values, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                    },
                });
                if (response.status === 200) {
                    notification.success({
                        message: 'Success',
                        description: 'Hobbies updated successfully!',
                        placement: 'topRight'
                    });
                    history.push('/hobbies');
                } else {
                    notification.info({
                        message: 'Info',
                        description: response.data.message,
                        placement: 'topRight'
                    });
                }
            } else {
                const response = await axios.post(`${baseUrl}/api/hobbies/create`, values, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                    },
                });
                if (response.status === 200) {
                    notification.success({
                        message: 'Success',
                        description: 'Hobbies added successfully!',
                        placement: 'topRight'
                    });
                    form.resetFields();
                    history.push('/hobbies');
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

    return (
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>{isUpdateMode ? "Update Hobbies" : "Add Hobbies"}</span>
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
                                        <Input />
                                    </Item>
                                </Col>
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

export default HobbiesForm;
