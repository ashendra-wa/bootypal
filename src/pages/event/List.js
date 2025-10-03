import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Card,
    Radio,
    Table,
    Upload,
    message,
    Progress,
    Button,
    Avatar,
    Typography,
    notification,
    Pagination,
    Image,
    Modal, // Step 1: Import Pagination
} from "antd";
import axios from "axios";
import { Link } from 'react-router-dom';
import { baseUrl } from "../../config";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, EyeOutlined } from "@ant-design/icons";
import Loader from "../../components/Loader";

const { Title } = Typography;
const { confirm } = Modal;

// table code start
const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    // {
    //     title: "University",
    //     dataIndex: "university",
    //     key: "university",
    // },
    {
        title: "Venue",
        dataIndex: "venue",
        key: "venue",
    },
    {
        title: "Category",
        dataIndex: "category",
        key: "category",
    },
    {
        title: "Date",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Time",
        dataIndex: "startTime",
        key: "startTime",
    },
    {
        title: "Created By",
        dataIndex: "createdBy",
        key: "createdBy",
    },
    {
        title: "Joined User",
        dataIndex: "joinUser",
        key: "joinUser",
    },
    // {
    //     title: "STATUS",
    //     key: "status",
    //     dataIndex: "status",
    // },
    // {
    //     title: "Action",
    //     key: "action",
    //     dataIndex: "action",
    // }
];

function EventList() {
    const [userList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [modalVisible, setModalVisible] = useState(false);
    const [privacy, setPrivacy] = useState('');
    const [totalUsers, setTotalUsers] = useState(0);
    const [joinUserList, setJoinUserList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserList();
    }, [currentPage, pageSize]); // Update data when page or page size changes

    async function getUserList() {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/api/event/list-admin`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                },
                params: {
                    page: currentPage,
                    limit: pageSize,
                },
            });
            if (response.data.success) {
                setUserList(response.data.result);
                setTotalUsers(response.data.pagination.count);
            } else {
                // notification.info({
                //     message: 'Info',
                //     description: response.data.message,
                //     placement: 'topRight',
                // });
            }
        } catch (error) {
            console.error("API error:", error);
            notification.info({
                message: 'Info',
                description: error.response?.data?.message,
                placement: 'topRight',
            });
        } finally {
            setLoading(false);
        }
    }

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const showModal = (privacy) => {
        setPrivacy(privacy);
        setModalVisible(true);
    };

    const handleOk = () => {
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    async function handleDelete(id) {
        try {
            const response = await axios.delete(`${baseUrl}/api/event/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                },
            });
            if (response.data.success) {
                getUserList();
                notification.success({
                    message: 'Success',
                    description: 'Plan deleted successfully!',
                    placement: 'topRight'
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

    const HandleJoinedUser = (users) => {
        setJoinUserList(users)
        setModalVisible(true);
    }

    return (
        <>
            <Loader visible={loading} />
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Event"
                            extra={
                                <>
                                    {/* <Link className="custom-btn" to="/event/add">Add</Link> */}
                                </>
                            }
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={userList.map((user, index) => ({
                                        key: index.toString(),
                                        name: (
                                            <div className="author-info">
                                                <p>{user.name}</p>
                                            </div>
                                        ),
                                        university: (
                                            <div className="author-info">
                                                <p>{user.university?.name}</p>
                                            </div>

                                        ),
                                        venue: (
                                            <div className="author-info">
                                                <p>{user.venue}</p>
                                            </div>

                                        ),
                                        category: (
                                            <div className="author-info">
                                                <p>{user.category.name}</p>
                                            </div>

                                        ),
                                        date: (
                                            <div className="author-info">
                                                <p>{new Date(user.date).toLocaleDateString()}</p>
                                            </div>

                                        ),
                                        startTime: (
                                            <div className="author-info">
                                                <p>{user.startTime}</p>
                                            </div>

                                        ),
                                        joinUser: (
                                            <div onClick={() => HandleJoinedUser(user.joinedUsers)} className="author-info">
                                                <EyeOutlined />
                                            </div>

                                        ),
                                        createdBy: (
                                            <div className="author-info">
                                                <Link to={`/users/${user?.userId?._id}`}><p style={{"text-decoration": "underline"}}>{user?.userId?.name}</p></Link>
                                            </div>

                                        ),
                                        // action: (
                                        //     <div className="button-container">
                                        //         <Link to={`/plan/update/${user._id}`} className="update-btn">
                                        //             <EditOutlined />
                                        //         </Link>
                                        //         <button onClick={() => showDeleteConfirm(user._id)} className="delete-btn">
                                        //             <DeleteOutlined />
                                        //         </button>
                                        //     </div>
                                        // )
                                    }))}
                                    pagination={{ // Step 3: Add pagination settings
                                        current: currentPage,
                                        pageSize: pageSize,
                                        total: totalUsers,
                                        onChange: handlePageChange,
                                    }}
                                    className="ant-border-space"
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
            <Modal
                title={`Joined User`}
                visible={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="author-info">
                    {joinUserList?.map((user) => (
                        <Link to={`users/${user._id}`}><h4>{user?.name}</h4></Link>
                    ))}
                </div>
            </Modal>
        </>
    );
}

export default EventList;
