import React, { useEffect, useState } from "react";
import { Row, Col, Card, notification } from "antd";
import axios from "axios";
import { baseUrl } from "../../config";
import Loader from "../../components/Loader";

function WebDataDetails() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWebData();
  }, []);

  const fetchWebData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/childsafetypolicy`);
      if (response.data.success) {
        setContent(response.data.result.childsafetypolicy);
      } else {
        notification.info({
          message: "Info",
          description: response.data.message,
          placement: "topRight",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.response?.data?.message || "Failed to fetch data",
        placement: "topRight",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Child Safety Policy"
          >
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <Loader visible={loading} />
              </div>
            ) : (
              <div
                style={{ padding: "20px" }}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default WebDataDetails;
