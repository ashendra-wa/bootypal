import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Card,
    Table,
    Button,
    notification,
    Input,
    Select
} from "antd";
import axios from "axios";
import { baseUrl } from "../../config";
import UserAvatar from "../../components/UserAvatar";
import Loader from "../../components/Loader";

const { Search } = Input;
const { Option } = Select;

function Users() {
    const [userList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [planFilter, setPlanFilter] = useState("");

    useEffect(() => {
        getUserList();
    }, [searchTerm, currentPage, pageSize, statusFilter, planFilter]); // Update data when page or page size changes

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "32%",
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
        },
        {
            title: "Actions",
            key: "actions",
            dataIndex: "actions",
        },
    ];

    async function getUserList() {
        try {
            const params = {
                page: currentPage,
                items: pageSize,
            };

            // Check if search is not null or empty, then add it to params
            if (searchTerm && searchTerm.trim() !== '') {
                params.q = searchTerm;
                params.fields = 'name,email,phoneNumber'; // Specify searchable fields
            }

            if (statusFilter !== "") {
                params.filter = "user.enabled";
                params.equal = statusFilter;
            }

            if (planFilter !== "") {
                params.planFilter = planFilter;
            }
            setLoading(true);
            const response = await axios.get(`${baseUrl}/api/admin/list`, {
                params,
            });
            if (response.status === 200) {
                setUserList(response.data.result);
                setTotalUsers(response.data.pagination.count);
            } else {
                notification.info({
                    message: 'Info',
                    description: response.data.message,
                    placement: 'topRight',
                });
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

    async function handleDeactivateUser(userId, status) {
        try {
            notification.destroy();
            const response = await axios.patch(`${baseUrl}/api/admin/status/${userId}?enabled=${status}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            if (response.data.success) {
                notification.success({
                    message: 'Success',
                    description: response.data.message,
                    placement: 'topRight',
                });
                getUserList(); // Refresh user list after deactivation
            } else {
                notification.error({
                    message: 'Error',
                    description: response.data.message,
                    placement: 'topRight',
                });
            }
        } catch (error) {
            console.error("API error:", error);
            notification.error({
                message: 'Error',
                description: error.response?.data?.message,
                placement: 'topRight',
            });
        }
    }

    const handleSearch = (value) => {
        if (value.length >= 3 || value.length === 0) {
            setSearchTerm(value);
            setCurrentPage(1);
        }
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
                            title="Users"
                            extra={<div style={{ display: 'flex', gap: 12 }}><Select
                                placeholder="Filter by plan"
                                onChange={(value) => {
                                    setPlanFilter(value);
                                    setCurrentPage(1); // Reset to page 1 on filter change
                                }}
                                allowClear
                                style={{ width: 160 }}
                            >
                                <Option value="silver">Silver</Option>
                                <Option value="gold">Gold</Option>
                                <Option value="platinum">Platinum</Option>
                            </Select><Select
                                placeholder="Filter by status"
                                onChange={(value) => {
                                    setStatusFilter(value);
                                    setCurrentPage(1); // Reset to page 1 on filter change
                                }}
                                allowClear
                                style={{ width: 160 }}
                            >
                                    <Option value="true">Active</Option>
                                    <Option value="false">Inactive</Option>
                                </Select><Search placeholder="Search by name, email or phone no" onSearch={handleSearch} allowClear /></div>}
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={userList.map((user, index) => ({
                                        key: index.toString(),
                                        name: (
                                            <UserAvatar user={user} baseUrl={baseUrl} />
                                        ),
                                        phoneNumber: (
                                            <div className="author-info">
                                                <p>{user?.user?.countryCode + user?.user?.phoneNumber}</p>
                                            </div>
                                        ),
                                        gender: (
                                            <div className="author-info">
                                                <p>{user?.user?.gender}</p>
                                            </div>
                                        ),
                                        status: (
                                            <span className={user?.user?.enabled ? 'text-success' : 'text-danger'}>
                                                {user?.user?.enabled ? 'Active' : 'Inactive'}
                                            </span>
                                        ),
                                        actions: (
                                            <div>
                                                {user?.user?.enabled ? (
                                                    <Button type="danger" onClick={() => handleDeactivateUser(user?.user?._id, false)}>
                                                        Deactivate
                                                    </Button>
                                                ) : (
                                                    <Button type="primary" onClick={() => handleDeactivateUser(user?.user?._id, true)}>
                                                        Activate
                                                    </Button>
                                                )}
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
        </>
    );
}

export default Users;
