import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Card,
    Table,
    Button,
    notification,
    Image,
    Modal,
} from "antd";
import axios from "axios";
import { Link } from 'react-router-dom';
import { baseUrl } from "../../config";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, EyeOutlined } from "@ant-design/icons";

const { confirm } = Modal;

// table code start
const columns = [
    {
        title: "Title",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "Short Description",
        dataIndex: "shortDescription",
        key: "shortDescription",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Image",
        dataIndex: "image",
        key: "image",
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

function BlogList() {
    const [userList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [modalVisible, setModalVisible] = useState(false);
    const [privacy, setPrivacy] = useState('');
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        getUserList();
    }, [currentPage, pageSize]); // Update data when page or page size changes

    async function getUserList() {
        try {
            const response = await axios.get(`${baseUrl}/api/blog/list`, {
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
            const response = await axios.delete(`${baseUrl}/api/blog/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                },
            });
            if (response.data.success) {
                getUserList();
                notification.success({
                    message: 'Success',
                    description: 'Blog deleted successfully!',
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

    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Blogs"
                            extra={
                                <>
                                    <Link className="custom-btn" to="/blog/add">Add</Link>
                                </>
                            }
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={userList.map((user, index) => ({
                                        key: index.toString(),
                                        title: (
                                            <div className="author-info">
                                                <p>{user.title}</p>
                                            </div>
                                        ),
                                        shortDescription: (
                                            <Button type="primary" onClick={() => showModal(user.shortDescription)}>
                                                <EyeOutlined />
                                            </Button>
                                        ),
                                        description: (
                                            <Button type="primary" onClick={() => showModal(user.description)}>
                                                <EyeOutlined />
                                            </Button>
                                        ),
                                        image: (
                                            <Image
                                                width={70}
                                                height={40}
                                                src={baseUrl + '/' + user.image}
                                            />
                                        ),
                                        status: (
                                            <span className={user.enabled ? 'text-success' : 'text-danger'}>
                                                {user.enabled ? 'Active' : 'Inactive'}
                                            </span>
                                        ),
                                        action: (
                                            <div className="button-container">
                                                <Link to={`/blog/update/${user._id}`} className="update-btn">
                                                    <EditOutlined />
                                                </Link>
                                                <button onClick={() => showDeleteConfirm(user._id)} className="delete-btn">
                                                    <DeleteOutlined />
                                                </button>
                                            </div>
                                        )
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
                title={`Description`}
                visible={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="author-info">
                    <div dangerouslySetInnerHTML={{ __html: privacy }} />
                </div>
            </Modal>
        </>
    );
}

export default BlogList;
