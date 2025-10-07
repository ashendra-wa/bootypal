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
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { backendUrl } from "../../config";
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
    title: "Action",
    key: "action",
    dataIndex: "action",
  },
];

function LanguageSpeak() {
  const [LanguageSpeak, setLanguageSpeak] = useState([]);
  const [privacy, setPrivacy] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserList();
  }, []);

  async function getUserList() {
    try {
      setLoading(true);
      // Make API call to submit form data
      const response = await axios.get(`${backendUrl}/api/language/listAll`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include access token in headers
        },
      });
      if (response.status === 200) {
        setLanguageSpeak(response.data.result);
        console.log("response", response.data.result);
      }
      // Handle success response from the API
    } catch (error) {
      console.error("API error:", error);
      notification.info({
        message: "Info",
        description: error.response?.data?.message,
        placement: "topRight", // You can adjust the placement as needed
      });
      // Handle error response from the API
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/language/delete/${id}`,
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
          description: "language deleted successfully!",
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

  return (
    <>
      <Loader visible={loading} />
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Language Speak"
              extra={
                <>
                  <Link className="custom-btn" to="/language-speak/add">
                    Add
                  </Link>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={LanguageSpeak.map((user, index) => ({
                    key: index.toString(),
                    name: (
                      <div className="author-info">
                        <p>{user.name}</p>
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

                    action: (
                      <div className="button-container">
                        <Link
                          to={`/language-speak/update/${user._id}`}
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

export default LanguageSpeak;
