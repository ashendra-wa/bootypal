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
import ReactQuill from "react-quill";
import moment from 'moment';

const { Title } = Typography;
const { Item } = Form;
const { Option } = Select;

function OfferForm() {
    const { offerId } = useParams(); // Extract offerId from URL
    const history = useHistory();
    const [form] = Form.useForm();
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [brandLogo, setBrandLogo] = useState();
    const [expireDateNew, setExpireDateNew] = useState();
    const [image, setImage] = useState();

    useEffect(() => {
        console.log("offerId", offerId);
        // Check if offerId exists to determine if it's an update mode
        if (offerId) {
            setIsUpdateMode(true);
            fetchDetails();
        }
    }, [offerId]);

    const fetchDetails = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/offer/read/${offerId}`);
            if (response.data.success) {
                const { brandLogo, image, expireDate, ...otherFields } = response.data.result;
                const expireDate1 = new Date(expireDate);
                const formattedDate = expireDate1.getFullYear() + '-' + ('0' + (expireDate1.getMonth() + 1)).slice(-2) + '-' + ('0' + expireDate1.getDate()).slice(-2);
                setExpireDateNew(formattedDate); // Set brandLogo in state
                // setImage(''); // Set image in state
                console.log("formattedDate", otherFields);
                form.setFieldsValue({
                    expireDate: formattedDate,
                    ...otherFields
                });
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
            if (key === 'brandLogo') {
                formData.append('file', brandLogo);
            } else if (key === 'image') {
                formData.append('document', image);
            } else {
                formData.append(key, values[key]);
            }
        }
        try {
            if (isUpdateMode) {
                const response = await axios.patch(`${baseUrl}/api/offer/update/${offerId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                    },
                });
                if (response.data.success) {
                    notification.success({
                        message: 'Success',
                        description: 'Offer updated successfully!',
                        placement: 'topRight'
                    });
                    history.push('/offer');
                } else {
                    notification.info({
                        message: 'Info',
                        description: response.data.message,
                        placement: 'topRight'
                    });
                }
            } else {
                const response = await axios.post(`${baseUrl}/api/offer/create`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                    },
                });
                if (response.status === 200) {
                    notification.success({
                        message: 'Success',
                        description: 'Offer added successfully!',
                        placement: 'topRight'
                    });
                    form.resetFields();
                    history.push('/offer');
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

    function brandLogoSelect(brandLogo) {
        setBrandLogo(brandLogo);
    }

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
                        title={isUpdateMode ? "Update Offer" : "Add Offer"}
                    >
                        <Form style={{ "padding": "20px" }} form={form} onFinish={onFinish} layout="vertical">
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Title"
                                        name="title"
                                        rules={[{ required: true, message: 'Please enter title' }]}
                                    >
                                        <Input placeholder="Please enter title" />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Brand Logo" imageSelect
                                        name="brandLogo"
                                        rules={[{ required: offerId ? false : true, message: 'Brand logo is required' }]}
                                    >
                                        <Input type="file" onChange={(e) => brandLogoSelect(e.target.files[0])} />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Offer Image"
                                        name="image"
                                        rules={[{ required: offerId ? false : true, message: 'Offer image is required' }]}
                                    >
                                        <Input type="file" onChange={(e) => imageSelect(e.target.files[0])} />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Off (%)"
                                        name="off"
                                        rules={[{ required: true, message: 'Please enter off' }]}
                                    >
                                        <Input min={0} type="number" placeholder="Please enter off" />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Minimum Purchase Amount"
                                        name="minimumPurchaseAmount"
                                    // rules={[{ required: true, message: 'Please enter minimum purchase amount' }]}
                                    >
                                        <Input min={0} type="number" placeholder="Please enter amount" />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Minimum Members"
                                        name="minimumMember"
                                    // rules={[{ required: true, message: 'Please enter minimum purchase amount' }]}
                                    >
                                        <Input min={0} type="number" placeholder="Please enter minimum members" />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Expire Date"
                                        name="expireDate"
                                        rules={[{ required: true, message: 'Please select expire date' }]}
                                    >
                                        <Input type="date" min={moment().endOf('day').format('YYYY-MM-DD')} />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Description"
                                        name="description"
                                        rules={[{ required: true, message: 'Please enter description' }]}
                                    >
                                        <ReactQuill />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Status"
                                        name="enabled"
                                        rules={[{ required: true, message: 'Please select status' }]}
                                    >
                                        {/* <Input type="text" placeholder="Please enter status" /> */}
                                        {/* Or use a select dropdown */}
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

export default OfferForm;
