import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Card,
    Table,
    Typography,
    notification,
    Modal,
    Tooltip,
} from "antd";
import axios from "axios";
import { baseUrl } from "../../config";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from 'moment';

const { Title } = Typography;

function MailSendList() {
    const [userList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [userModalVisible, setUserModalVisible] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        getUserList();
    }, [currentPage, pageSize]);

    const columns = [
        {
            title: "Subject",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Body",
            dataIndex: "body",
            key: "body",
            render: (text) => (
                <Tooltip
                    title={text}
                    overlayStyle={{ maxWidth: '600px', fontSize: '16px' }} // Increase tooltip width and font size
                    overlayInnerStyle={{ padding: '20px' }} // Add padding to all sides inside the tooltip
                >
                    <span>{text.length > 30 ? text.substring(0, 30) + '...' : text}</span>
                </Tooltip>
            ),
        },
        {
            title: "Users",
            dataIndex: "users",
            key: "users",
            render: (text, record) => (
                <EyeOutlined
                    style={{ cursor: "pointer" }}
                    onClick={() => showUsersModal(record.users)}
                />
            ),
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => (
                <span>{moment(text).format('DD-MM-YYYY HH:mm:ss')}</span>
            ),
        },
    ];

    async function getUserList() {
        try {
            const response = await axios.get(`${baseUrl}/api/mail-send/list`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                params: {
                    page: currentPage,
                    limit: pageSize,
                },
            });
            if (response.data.success) {
                setUserList(response.data.result);
                setTotalUsers(response.data.pagination.count);
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

    const showUsersModal = (users) => {
        setSelectedUsers(users);
        setUserModalVisible(true);
    };

    const handleUserModalOk = () => {
        setUserModalVisible(false);
    };

    const handleUserModalCancel = () => {
        setUserModalVisible(false);
    };

    const userTableColumns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text, record) => `${record.name} ${record.surname}`,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
    ];

    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Mail"
                            extra={
                                <Link className="custom-btn" to="/send-mail/add">Send</Link>
                            }
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={userList.map((user, index) => ({
                                        key: index.toString(),
                                        title: user.title,
                                        body: user.body,
                                        users: user.users,
                                        createdAt: user.createdAt,  // Add createdAt data
                                    }))}
                                    pagination={{
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

            {/* User Details Modal */}
            <Modal
                title="User List"
                visible={userModalVisible}
                onOk={handleUserModalOk}
                onCancel={handleUserModalCancel}
                footer={null}
            >
                <Table
                    columns={userTableColumns}
                    dataSource={selectedUsers.map((user, index) => ({
                        key: index.toString(),
                        name: user.name,
                        surname: user.surname,
                        email: user.email,
                    }))}
                    pagination={false}
                    scroll={{ y: 300 }} // Set the max height for scrolling
                />
            </Modal>

        </>
    );
}

export default MailSendList;
