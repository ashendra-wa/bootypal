import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    Card,
    Radio,
    Table,
    Button,
    Avatar,
    Typography,
    notification,
    Modal,
    Spin,
    Empty,
} from "antd";
import axios from "axios";
import { baseUrl } from "../../config";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { confirm } = Modal;

// table code start
const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "32%",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "STATUS",
        key: "status",
        dataIndex: "status",
    },
    {
        title: "Action",
        key: "action",
        dataIndex: "action",
    }
];



function UniversityList() {

    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);  // Loading state

    useEffect(() => {
        getUserList()
    }, [])


    async function getUserList() {
        try {
            setLoading(true);  // Set loading to true before making the API call
            // Make API call to submit form data
            const response = await axios.get(`${baseUrl}/api/university/listAll`);
            if (response.data.success) {
                setUserList(response.data.result);
            } else {

                notification.info({
                    message: 'Info',
                    description: response.data.message,
                    placement: 'topRight' // You can adjust the placement as needed
                });
            }
            // Handle success response from the API
        } catch (error) {
            console.error("API error:", error);
            notification.info({
                message: 'Info',
                description: error.response?.data?.message,
                placement: 'topRight' // You can adjust the placement as needed
            });
            // Handle error response from the API
        } finally {
            setLoading(false);  // Set loading to false after the API call
        }
    };

    async function handleDelete(id) {
        try {
            const response = await axios.delete(`${baseUrl}/api/university/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                },
            });
            if (response.data.success) {

                notification.success({
                    message: 'Success',
                    description: 'University deleted successfully!',
                    placement: 'topRight'
                });
                getUserList();
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

    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Are you sure you want to delete this item?',
            icon: <ExclamationCircleOutlined />,
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDelete(id);
            },
        });
    };

    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="University"
                            extra={
                                <>
                                    <Link className="custom-btn" to="/university/add">Add</Link>
                                </>
                            }
                        >
                            <div className="table-responsive">
                                {/* <Spin spinning={loading}> */}
                                <Table
                                    columns={columns}
                                    dataSource={userList.map((user, index) => ({
                                        key: index.toString(),
                                        name: (
                                            <Avatar.Group>
                                                {/* <Avatar
                                                    className="shape-avatar"
                                                    shape="square"
                                                    size={40}
                                                    src={baseUrl + '/' + user.photo}
                                                ></Avatar> */}
                                                <div className="avatar-info">
                                                    <Title level={5}>{user.name}</Title>
                                                    <p>{user.email}</p>
                                                </div>
                                            </Avatar.Group>
                                        ),
                                        description: (
                                            <div className="author-info">
                                                {/* <Title level={5}>{user.role}</Title> */}
                                                <p>{user.description}</p>
                                            </div>
                                        ),
                                        status: (
                                            <span type="primary" className={user.enabled ? 'text-success' : 'text-danger'}>
                                                {user.enabled ? 'Active' : 'Inactive'}
                                            </span>
                                        ),
                                        action: (
                                            // action: (
                                            <div className="button-container">
                                                <Link to={`/university-update/${user._id}`} className="update-btn">
                                                    <EditOutlined />
                                                </Link>
                                                <button onClick={() => showDeleteConfirm(user._id)} className="delete-btn">
                                                    <DeleteOutlined />
                                                </button>
                                            </div>
                                            // )
                                            // <Link to={`/university-update/${user._id}`} className="tag-primary">
                                            //     Update
                                            // </Link>
                                        )
                                    }))}
                                    pagination={false}
                                    className="ant-border-space"
                                    locale={{
                                        emptyText: loading ? <Spin /> : <Empty />
                                    }}
                                />
                                {/* </Spin> */}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default UniversityList;
