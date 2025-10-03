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

const { Title } = Typography;
const { Item } = Form;
const { Option } = Select;

function PlanForm() {
    const { planId } = useParams(); // Extract planId from URL
    const history = useHistory();
    const [form] = Form.useForm();
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [universityList, setUniversityList] = useState([])

    useEffect(() => {
        // fetchUniversity();
        // Check if planId exists to determine if it's an update mode
        if (planId) {
            setIsUpdateMode(true);
            fetchDetails();
        }
    }, [planId]);

    // const fetchUniversity = async () => {
    //     try {
    //         const response = await axios.get(`${baseUrl}/api/university/listAll`);
    //         if (response.data.success) {
    //             setUniversityList(response.data.result);
    //         } else {
    //             notification.info({
    //                 message: 'Info',
    //                 description: response.data.message,
    //                 placement: 'topRight'
    //             });
    //         }
    //     } catch (error) {
    //         console.error("API error:", error);
    //         notification.info({
    //             message: 'Info',
    //             description: error.response?.data?.message,
    //             placement: 'topRight'
    //         });
    //     }
    // };

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
        try {
            if (isUpdateMode) {
                const response = await axios.patch(`${baseUrl}/api/plan/update/${planId}`, values, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                    },
                });
                if (response.data.success) {
                    notification.success({
                        message: 'Success',
                        description: 'Plan updated successfully!',
                        placement: 'topRight'
                    });
                    history.push('/plan');
                } else {
                    notification.info({
                        message: 'Info',
                        description: response.data.message,
                        placement: 'topRight'
                    });
                }
            } else {
                const response = await axios.post(`${baseUrl}/api/plan/create`, values, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                    },
                });
                if (response.status === 200) {
                    notification.success({
                        message: 'Success',
                        description: 'Plan added successfully!',
                        placement: 'topRight'
                    });
                    form.resetFields();
                    history.push('/plan');
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
                            <span>{isUpdateMode ? "Update Plan" : "Add Plan"}</span>
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
                                        label="Short Description"
                                        name="description"
                                        rules={[{ required: true, message: 'Please enter short description' }]}
                                    >
                                        <Input placeholder="Please enter short description" />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Create Profile and upload photo"
                                        name="createProfileUploadPhoto"
                                        rules={[{ required: true, message: 'Please select one' }]}
                                    >
                                        <Select placeholder="Select an option">
                                            <Option value={true}>Yes</Option>
                                            <Option value={false}>No</Option>
                                        </Select>
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Select Send Profile"
                                        name="sendInterestLimit"
                                        rules={[{ required: true, message: 'Please select one' }]}
                                    >
                                        <Select placeholder="Select an option">
                                            <Option value="50">50</Option>
                                            <Option value="100">100</Option>
                                            <Option value="unlimited">Unlimited</Option>
                                        </Select>
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Only Current location"
                                        name="currentLocationEdit"
                                        rules={[{ required: true, message: 'Please select one' }]}
                                    >
                                        <Select placeholder="Select an option">
                                            <Option value={true}>Yes</Option>
                                            <Option value={false}>No</Option>
                                        </Select>
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Other user Distance"
                                        name="otherUserDistance"
                                        rules={[{ required: true, message: 'Please enter distance' }]}
                                    >
                                        <Input min={0} type="number" />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Other user age start"
                                        name="OtherUserAgeStart"
                                        rules={[{ required: true, message: 'Please enter age' }]}
                                    >
                                        <Input min={0} type="number" />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Other user age End"
                                        name="OtherUserAgeEnd"
                                        rules={[{ required: true, message: 'Please enter age' }]}
                                    >
                                        <Input min={0} type="number" />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Can edit current location"
                                        name="canEditCurrentLocation"
                                        rules={[{ required: true, message: 'Please select one' }]}
                                    >
                                        <Select placeholder="Select an option">
                                            <Option value={true}>Yes</Option>
                                            <Option value={false}>No</Option>
                                        </Select>
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Looking for"
                                        name="lookingFor"
                                        rules={[{ required: true, message: 'Please enter looking for' }]}
                                    >
                                        <Select
                                            mode="multiple"
                                            placeholder="Select options"
                                            style={{ width: '100%' }}
                                        >
                                            <Option value="Long-term partner">Long-term partner</Option>
                                            <Option value="Short-term partner">Short-term partner</Option>
                                            <Option value="Fun partner">Fun partner</Option>
                                            <Option value="One nightstand">One nightstand</Option>
                                            <Option value="New Friends">New Friends</Option>
                                            <Option value="Still figuring out">Still figuring out</Option>
                                        </Select>
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="You are interested in"
                                        name="interestedIn"
                                        rules={[{ required: true, message: 'Please enter interested in' }]}
                                    >
                                        <Select
                                            mode="multiple"
                                            placeholder="Select options"
                                            style={{ width: '100%' }}
                                        >
                                            <Option value="Male">Male</Option>
                                            <Option value="Female">Female</Option>
                                            <Option value="Others">Others</Option>
                                        </Select>
                                    </Item>
                                </Col> */}
                                {/* <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Which university you want to date ?"
                                        name="university"
                                        rules={[{ required: true, message: 'Please enter interested in' }]}
                                    >
                                        <Select
                                            mode="multiple"
                                            placeholder="Select options"
                                            style={{ width: '100%' }}
                                        >
                                            {universityList.map((item, i) => {
                                                return (
                                                    <Option value={item._id}>{item.name}</Option>
                                                )
                                            })}
                                        </Select>
                                    </Item>
                                </Col> */}
                                {/* <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Which education level you want to date ?"
                                        name="educationLevel"
                                        rules={[{ required: true, message: 'Please enter interested in' }]}
                                    >
                                        <Select
                                            mode="multiple"
                                            placeholder="Select options"
                                            style={{ width: '100%' }}
                                        >
                                            <Option value="Bachelors">Bachelors</Option>
                                            <Option value="Incollege">Incollege</Option>
                                            <Option value="High School">High School</Option>
                                            <Option value="PhD">PhD</Option>
                                            <Option value="In gradschool">In gradschool</Option>
                                            <Option value="Masters">Masters</Option>
                                            <Option value="Tech School">Tech School</Option>
                                        </Select>
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="See who viewed your profile"
                                        name="SeeWhoViewedYourProfile"
                                        rules={[{ required: true, message: 'Please select one' }]}
                                    >
                                        <Select placeholder="Select an option">
                                            <Option value={true}>Yes</Option>
                                            <Option value={false}>No</Option>
                                        </Select>
                                    </Item>
                                </Col> */}



                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Benefit"
                                        name="benefit"
                                        rules={[{ required: true, message: 'Please enter benefit' }]}
                                    >
                                        <ReactQuill />
                                    </Item>
                                </Col>

                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Plan Type"
                                        name="planType"
                                        rules={[{ required: true, message: 'Please select one' }]}
                                    >
                                        <Select placeholder="Select an option">
                                            <Option value="free">Free</Option>
                                            <Option value="silver">Silver</Option>
                                            <Option value="gold">Gold</Option>
                                            <Option value="platinum">Platinum</Option>

                                        </Select>
                                    </Item>
                                </Col>

                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Select price"
                                        name="price"
                                        rules={[{ required: true, message: 'Please select price' }]}
                                    >
                                        <Select placeholder="Select an option">
                                            <Option value="0.00">0.00</Option>
                                            <Option value="0.29">0.29</Option>
                                            <Option value="0.79">0.79</Option>
                                            <Option value="1.19">1.19</Option>
                                            <Option value="1.59">1.59</Option>
                                            <Option value="1.69">1.69</Option>
                                            <Option value="2.29">2.29</Option>
                                            <Option value="4.49">4.49</Option>
                                            <Option value="6.49">6.49</Option>
                                            <Option value="7.99">7.99</Option>
                                            <Option value="9.99">9.99</Option>
                                            <Option value="11.49">11.49</Option>
                                            <Option value="13.49">13.49</Option>
                                            <Option value="14.99">14.99</Option>
                                            <Option value="15.99">15.99</Option>
                                            <Option value="17.99">17.99</Option>
                                            <Option value="19.00">19.00</Option>
                                            <Option value="19.99">19.99</Option>
                                            <Option value="21.00">21.00</Option>
                                            <Option value="22.49">22.49</Option>
                                            <Option value="24.99">24.99</Option>
                                            <Option value="25.99">25.99</Option>
                                            <Option value="27.99">27.99</Option>
                                            <Option value="28.99">28.99</Option>
                                            <Option value="29.99">29.99</Option>
                                            <Option value="30.00">30.00</Option>
                                        </Select>
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Product Id"
                                        name="productId"
                                        rules={[{ required: true, message: 'Please enter product id' }]}
                                    >
                                        <Input type="text" placeholder="Product id" />
                                    </Item>
                                </Col>
                                {/* <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Is Incognito"
                                        name="isIncognito"
                                        rules={[{ required: true, message: 'Please select one' }]}
                                    >
                                        <Select placeholder="Select an option">
                                            <Option value={true}>Yes</Option>
                                            <Option value={false}>No</Option>
                                        </Select>
                                    </Item>
                                </Col> */}
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Is Recommended"
                                        name="isRecommended"
                                        rules={[{ required: true, message: 'Please select one' }]}
                                    >
                                        <Select placeholder="Select an option">
                                            <Option value={true}>Yes</Option>
                                            <Option value={false}>No</Option>
                                        </Select>
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

export default PlanForm;
