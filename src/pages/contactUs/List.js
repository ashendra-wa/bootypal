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
    Modal,
    Tooltip, // Step 1: Import Pagination
} from "antd";
import axios from "axios";
import { Link } from 'react-router-dom';
import { baseUrl } from "../../config";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import Loader from "../../components/Loader";

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
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Phone No",
        dataIndex: "phoneNo",
        key: "phoneNo",
    },
    {
        title: "Message",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
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

function ContactUsList() {
    const [userList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [modalVisible, setModalVisible] = useState(false);
    const [privacy, setPrivacy] = useState('');
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserList();
    }, [currentPage, pageSize]); // Update data when page or page size changes

    async function getUserList() {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/api/contact-us/list`, {
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

    const handleOk = () => {
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <>
            <Loader visible={loading} />
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Contact Us"
                            extra={
                                <>
                                    {/* <Link className="custom-btn" to="/plan/add">Add</Link> */}
                                </>
                            }
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={columns}s
                                    dataSource={userList.map((user, index) => ({
                                        key: index.toString(),
                                        title: (
                                            <Tooltip title={user.title}> {/* Full message shown on hover */}
                                                <p style={{
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    maxWidth: "200px" // Adjust width as needed
                                                }}>
                                                    {user.title ? user.title : '-'}
                                                </p>
                                            </Tooltip>
                                        ),
                                        email: (
                                            <div className="author-info">
                                                <p>{user.email}</p>
                                            </div>

                                        ),
                                        phoneNo: (
                                            <div className="author-info">
                                                <p>{user.phoneNo}</p>
                                            </div>

                                        ),
                                        description: (
                                            <Tooltip title={user.description}> {/* Full message shown on hover */}
                                                <p style={{
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    maxWidth: "200px" // Adjust width as needed
                                                }}>
                                                    {user.description ? user.description : '-'}
                                                </p>
                                            </Tooltip>
                                            // <Button type="primary" onClick={() => showModal(user.description, 'Description')}>
                                            //     <EyeOutlined />
                                            // </Button>
                                        ),
                                        createdAt: (
                                            <p>{moment(user.created).format("MMMM DD, YYYY hh:mm A")}</p>
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

export default ContactUsList;
