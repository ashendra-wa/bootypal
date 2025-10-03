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
} from "antd";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { baseUrl } from "../../config";

const { Title } = Typography;
const { Item } = Form;

function SettingForm() {
    const { settingId } = useParams(); // Extract reportElementId from URL
    const history = useHistory();
    const [form] = Form.useForm();
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [image, setImage] = useState();

    useEffect(() => {
        // Check if reportElementId exists to determine if it's an update mode
        if (settingId) {
            setIsUpdateMode(true);
            fetchDetails();
        }
    }, [settingId]);

    const fetchDetails = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/setting/read/${settingId}`);
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
                const formData = new FormData();
                for (let key in values) {

                    formData.append(key, values[key]);
                }
                formData.append('file', image);
                const response = await axios.patch(`${baseUrl}/api/setting/update-with-image/${settingId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                    },
                });
                if (response.status === 200) {
                    notification.success({
                        message: 'Success',
                        description: 'Setting updated successfully!',
                        placement: 'topRight'
                    });
                    history.push('/setting');
                } else {
                    notification.info({
                        message: 'Info',
                        description: response.data.message,
                        placement: 'topRight'
                    });
                }
            } else {
                const response = await axios.post(`${baseUrl}/api/setting/create`, values, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                    },
                });
                if (response.status === 200) {
                    notification.success({
                        message: 'Success',
                        description: 'Setting added successfully!',
                        placement: 'topRight'
                    });
                    form.resetFields();
                    history.push('/setting');
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

    function imageSelect(image) {
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
                            <span>{isUpdateMode ? "Update Setting" : "Add Setting"}</span>
                            <Button type="primary" onClick={() => history.goBack()}>Back</Button>
                        </div>}
                    >
                        <Form style={{ "padding": "20px" }} form={form} onFinish={onFinish} layout="vertical">
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Privacy"
                                        name="privacy"
                                        rules={[{ required: true, message: 'Please enter privacy' }]}
                                    >
                                        <ReactQuill />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Terms & Condition"
                                        name="termsCondition"
                                        rules={[{ required: true, message: 'Please enter terms & condition' }]}
                                    >
                                        <ReactQuill />
                                    </Item>
                                </Col>
                                {/* <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Offer Image"
                                        rules={[{ required: settingId ? false : true, message: 'Offer banner image is required' }]}
                                    >
                                        <Input type="file" onChange={(e) => imageSelect(e.target.files[0])} />
                                    </Item>
                                </Col> */}
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

export default SettingForm;
