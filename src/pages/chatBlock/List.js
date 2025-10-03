import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Card,
    Table,
    notification,
    Tooltip,
} from "antd";
import axios from "axios";
import { Link } from 'react-router-dom';
import { baseUrl } from "../../config";
import moment from "moment";
import Loader from "../../components/Loader";

// table code start
const columns = [
    {
        title: "Block By",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Blocked To",
        dataIndex: "reportedTo",
        key: "reportedTo",
    },
    {
        title: "Blocked At",
        dataIndex: "createdAt",
        key: "createdAt",
    },
];

function ChatBlockList() {
    const [userList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserList();
    }, [currentPage, pageSize]); // Update data when page or page size changes

    async function getUserList() {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/api/chat-block/list`, {
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

    return (
        <>
            <Loader visible={loading} />
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Chat Block"
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={userList.map((user, index) => ({
                                        key: index.toString(),
                                        name: (
                                            <div className="author-info">
                                                <Link to={`/users/${user?.blockBy?._id}`}>
                                                    <p style={{"text-decoration": "underline"}}>{user?.blockBy?.name}</p>
                                                </Link>
                                            </div>
                                        ),
                                        reportedTo: (
                                            <div className="author-info">
                                                <Link to={`/users/${user?.blockedUser?._id}`}>
                                                    <p style={{"text-decoration": "underline"}}>{user?.blockedUser?.name}</p>
                                                </Link>
                                            </div>

                                        ),
                                        description: (
                                            <Tooltip title={user?.message}> {/* Full message shown on hover */}
                                                <p style={{
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    maxWidth: "200px" // Adjust width as needed
                                                }}>
                                                    {user?.message ? user?.message : '-'}
                                                </p>
                                            </Tooltip>
                                        ),
                                        createdAt: (
                                            <p>{moment(user.created).format("MMMM DD, YYYY hh:mm A")}</p>
                                        ),
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
        </>
    );
}

export default ChatBlockList;
