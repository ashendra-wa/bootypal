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
        title: "Reported By",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Reported To",
        dataIndex: "reportedTo",
        key: "reportedTo",
    },
    {
        title: "Report Message",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Reported At",
        dataIndex: "createdAt",
        key: "createdAt",
    },
];

function PostReportList() {
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
            const response = await axios.get(`${baseUrl}/api/chat-report/list`, {
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

    const getReportedBy = (user) => {
        const matchedUser = user?.thread?.user_id?.find(
            (threadUser) => threadUser._id.toString() === user?.user.toString()
        );

        const reportByName = matchedUser ? matchedUser.name : 'Unknown';
        return reportByName;
    }

    const getReportedById = (user) => {
        const matchedUser = user?.thread?.user_id?.find(
            (threadUser) => threadUser._id.toString() === user?.user.toString()
        );

        const reportById = matchedUser ? matchedUser._id : 'Unknown';
        return reportById;
    }

    const getReportedTo = (user) => {
        const anotherUser = user?.thread?.user_id?.find(
            (threadUser) => threadUser._id.toString() !== user?.user.toString()
        );

        const reportedToName = anotherUser ? anotherUser.name : 'Unknown';
        return reportedToName;
    }

    const getReportedToId = (user) => {
        const anotherUser = user?.thread?.user_id?.find(
            (threadUser) => threadUser._id.toString() !== user?.user.toString()
        );

        const reportedToId = anotherUser ? anotherUser._id : 'Unknown';
        return reportedToId;
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
                            title="Chat Report"
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={userList.map((user, index) => ({
                                        key: index.toString(),
                                        name: (
                                            <div className="author-info">
                                                <Link to={`/users/${getReportedById(user)}`}>
                                                    <p style={{"text-decoration": "underline"}}>{getReportedBy(user)}</p>
                                                </Link>
                                            </div>
                                        ),
                                        reportedTo: (
                                            <div className="author-info">
                                                <Link to={`/users/${getReportedToId(user)}`}>
                                                    <p style={{"text-decoration": "underline"}}>{getReportedTo(user)}</p>
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

export default PostReportList;
