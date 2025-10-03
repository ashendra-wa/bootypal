import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    Card,
    Table,
    Typography,
    notification,
    Modal
} from "antd";
import axios from "axios";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { baseUrl } from "../../config";
import Loader from "../../components/Loader";

const { confirm } = Modal;
const { Title } = Typography;

// table code start
const columns = [
    {
        title: "#",
        key: "key",
        dataIndex: "key",
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "32%",
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

function HobbiesList() {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getList()
    }, [])


    async function getList() {
        try {
            setLoading(true);
            // Make API call to submit form data
            const response = await axios.get(`${baseUrl}/api/hobbies/listAll`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                },
            });
            if (response.status === 200) {
                setUserList(response.data.result);
            } else {

                // notification.info({
                //     message: 'Info',
                //     description: response.data.message,
                //     placement: 'topRight' // You can adjust the placement as needed
                // });
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
            setLoading(false);
        }
    };

    async function handleDelete(id) {
        try {
            const response = await axios.delete(`${baseUrl}/api/hobbies/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                },
            });
            if (response.status === 200) {
                getList();
                notification.success({
                    message: 'Success',
                    description: 'Hobbies deleted successfully!',
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
            <Loader visible={loading} />
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Hobbies"
                            extra={
                                <>
                                    <Link className="custom-btn" to="/hobbies/add">Add</Link>
                                </>
                            }
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={userList.map((user, index) => ({
                                        key: index + 1,
                                        name: (
                                            <div className="author-info">
                                                <p>{user.name}</p>
                                            </div>
                                        ),
                                        status: (
                                            <span type="primary" className={user.enabled ? 'text-success' : 'text-danger'}>
                                                {user.enabled ? 'Active' : 'Inactive'}
                                            </span>
                                        ),
                                        action: (
                                            <div className="button-container">
                                                <Link to={`/hobbies/update/${user._id}`} className="update-btn">
                                                    <EditOutlined />
                                                </Link>
                                                <button onClick={() => showDeleteConfirm(user._id)} className="delete-btn">
                                                    <DeleteOutlined />
                                                </button>
                                            </div>
                                        )
                                    }))}
                                    pagination={false}
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

export default HobbiesList;
