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
    Carousel,
    Tooltip,
    Input
} from "antd";
import axios from "axios";
import { Link } from 'react-router-dom';
import { baseUrl } from "../../config";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, EyeOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { confirm } = Modal;
const { Search } = Input;

// table code start
const columns = [
    {
        title: "Title",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "Posts",
        dataIndex: "post",
        key: "post",
    },
    {
        title: "User Name",
        dataIndex: "user",
        key: "user",
    },
    {
        title: "Added At",
        dataIndex: "created",
        key: "created",
    },
    {
        title: "Action",
        key: "action",
        dataIndex: "action",
    }
];

function PostList() {
    const [userList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [mediaItems, setMediaItems] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getUserList();
    }, [currentPage, pageSize, searchTerm]); // Update data when page or page size changes

    async function getUserList() {
        try {
            const params = {
                page: currentPage,
                items: pageSize,
            };

            // Check if search is not null or empty, then add it to params
            if (searchTerm && searchTerm.trim() !== '') {
                params.q = searchTerm;
                params.fields = 'name'; // Specify searchable fields
            }

            const response = await axios.get(`${baseUrl}/api/post/list`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                },
                params
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


    async function handleDelete(id) {
        try {
            const response = await axios.delete(`${baseUrl}/api/post/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                },
            });
            if (response.data.success) {
                getUserList();
                notification.success({
                    message: 'Success',
                    description: 'Post deleted successfully!',
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

    const openModal = (media) => {
        setMediaItems(media);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const PrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <LeftOutlined
                className={className}
                style={{ ...style, fontSize: '24px', color: '#000' }}
                onClick={onClick}
            />
        );
    };

    const NextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <RightOutlined
                className={className}
                style={{ ...style, fontSize: '24px', color: '#000' }}
                onClick={onClick}
            />
        );
    };

    const handleSearch = (value) => {
        if (value.length >= 3 || value.length === 0) {
            setSearchTerm(value);
            setCurrentPage(1);
        }
    };

    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Post"
                            extra={<Search placeholder="Search by title" onSearch={handleSearch} allowClear />}
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={userList.map((user, index) => ({
                                        key: index.toString(),
                                        title: (
                                            <Tooltip title={user.name}> {/* Full message shown on hover */}
                                                <p style={{
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    maxWidth: "200px" // Adjust width as needed
                                                }}>
                                                    {user.name ? user.name : '-'}
                                                </p>
                                            </Tooltip>
                                        ),
                                        post: (
                                            user.image1 || user.image2 || user.image3 || user.video ?
                                            <Button type="primary" onClick={() => openModal(user)}>
                                                <EyeOutlined />
                                            </Button> : '-'

                                        ),
                                        user: (
                                            <div className="author-info">
                                                <Link to={`/users/${user.userId._id}`}>
                                                    <p>{user.userId.name}</p>
                                                </Link>
                                            </div>

                                        ),
                                        created: (
                                            <div className="author-info">
                                                <p>{new Date(user.created).toLocaleDateString()}</p>
                                            </div>

                                        ),
                                        action: (
                                            <div className="button-container">
                                                {/* <Link to={`/plan/update/${user._id}`} className="update-btn">
                                                    <EditOutlined />
                                                </Link> */}
                                                <button onClick={() => showDeleteConfirm(user._id)} className="delete-btn">
                                                    <DeleteOutlined />
                                                </button>
                                            </div>
                                        )
                                    }))}
                                    scroll={{ x: 800 }}
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
                title="Media Viewer"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={600}
                centered={true}
            >
                <Carousel arrows prevArrow={<PrevArrow />} nextArrow={<NextArrow />}>
                    {mediaItems.image1 && (
                        <div key="image1">
                            <Image src={`${baseUrl}/${mediaItems.image1}`} width="100%" height="500" />
                        </div>
                    )}
                    {mediaItems.image2 && (
                        <div key="image2">
                            <Image src={`${baseUrl}/${mediaItems.image2}`} width="100%" height="500" />
                        </div>
                    )}
                    {mediaItems.image3 && (
                        <div key="image3">
                            <Image src={`${baseUrl}/${mediaItems.image3}`} width="100%" height="500" />
                        </div>
                    )}
                    {mediaItems.video && (
                        <div key="video">
                            <video width="100%" height="700" controls>
                                <source src={`${baseUrl}/${mediaItems.video}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}
                </Carousel>
            </Modal>
        </>
    );
}

export default PostList;
