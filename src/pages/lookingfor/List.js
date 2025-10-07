import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Button,
  Avatar,
  Typography,
  notification,
  Modal,
} from "antd";
import axios from "axios";
import Icon, {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { baseUrl, backendUrl } from "../../config";
import Loader from "../../components/Loader";

const { Title } = Typography;
const { confirm } = Modal;

// table code start
const columns = [
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
    title: "Icons",
    key: "icons",
    dataIndex: "icons",
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
  },
];

function LookingForList() {
  const [LookingForList, setLookingForList] = useState([]);
  const [privacy, setPrivacy] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserList();
  }, [backendUrl]);

  async function getUserList() {
    try {
      setLoading(true);
      // Make API call to submit form data
      const response = await axios.get(
        `${backendUrl}/api/lookingfor/listAll?enabled=true`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.status === 200) {
        setLookingForList(response.data.result);
      }
      // Handle success response from the API
    } catch (error) {
      console.error("API error:", error);
      notification.info({
        message: "Info",
        description: error.response?.data?.message,
        placement: "topRight", // You can adjust the placement as needed
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/lookingfor/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include access token in headers
          },
        }
      );
      if (response.status === 200) {
        getUserList();
        notification.success({
          message: "Success",
          description: "Faq deleted successfully!",
          placement: "topRight",
        });
      } else {
        notification.info({
          message: "Info",
          description: response.data.message,
          placement: "topRight",
        });
      }
    } catch (error) {
      console.error("API error:", error);
      notification.info({
        message: "Info",
        description: error.response?.data?.message,
        placement: "topRight",
      });
    }
  }

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure you want to delete this item?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(id);
      },
    });
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
  console.log(
    "======>LookingForListLookingForListLookingForList",
    LookingForList
  );

  return (
    <>
      <Loader visible={loading} />
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Looking For"
              extra={
                <>
                  <Link className="custom-btn" to="/looking-for/Add">
                    Add
                  </Link>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={LookingForList?.map((user, index) => ({
                    key: index.toString(),
                    name: (
                      <div className="author-info">
                        <p>{user?.name ?? ""}</p>
                      </div>
                    ),
                    status: (
                      <span
                        type="primary"
                        className={
                          user.enabled ? "text-success" : "text-danger"
                        }
                      >
                        {user.enabled ? "Active" : "Inactive"}
                      </span>
                    ),
                    icons: (
                      <span type="primary">
                        <img
                          src={`${backendUrl}/${user.icon}`}
                          alt={user.name}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 8,
                            objectFit: "cover",
                          }}
                        />
                      </span>
                    ),

                    action: (
                      <div className="button-container">
                        <Link
                          to={`/looking-for/update/${user._id}`}
                          className="update-btn"
                        >
                          <EditOutlined />
                        </Link>
                        <button
                          onClick={() => showDeleteConfirm(user._id)}
                          className="delete-btn"
                        >
                          <DeleteOutlined />
                        </button>
                      </div>
                    ),
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

export default LookingForList;
