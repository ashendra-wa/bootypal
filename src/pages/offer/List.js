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

const { Title } = Typography;
const { confirm } = Modal;

// table code start
const columns = [
    {
        title: "Title",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "Expire Date",
        dataIndex: "expireDate",
        key: "expireDate",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Brand Logo",
        dataIndex: "brandLogo",
        key: "brandLogo",
    },
    {
        title: "Image",
        dataIndex: "image",
        key: "image",
    },
    {
        title: "Status",
        key: "status",
        dataIndex: "status",
    },
    {
        title: "Action",
        key: "action",
        dataIndex: "action",
    }
];

function OfferList() {
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
            const response = await axios.get(`${baseUrl}/api/offer/list`, {
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
            const response = await axios.delete(`${baseUrl}/api/offer/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                },
            });
            if (response.data.success) {
                getUserList();
                notification.success({
                    message: 'Success',
                    description: 'Offer deleted successfully!',
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
                            title="Offers"
                            extra={
                                <>
                                    <Link className="custom-btn" to="/offer/add">Add</Link>
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
                                        expireDate: (
                                            <div className="author-info">
                                                <p>{new Date(user.expireDate).toLocaleDateString()}</p>
                                            </div>
                                        ),
                                        description: (
                                            <Button type="primary" onClick={() => showModal(user.description)}>
                                                <EyeOutlined />
                                            </Button>
                                        ),
                                        brandLogo: (
                                            <Image
                                                width={50}
                                                src={baseUrl + '/' + user.brandLogo}
                                            />
                                        ),
                                        image: (
                                            <Image
                                                width={50}
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
                                                <Link to={`/offer/update/${user._id}`} className="update-btn">
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
                title={`Description Policy`}
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

export default OfferList;
