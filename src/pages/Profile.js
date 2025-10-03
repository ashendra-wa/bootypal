import { useRef } from "react";
import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Descriptions,
  Avatar,
  notification,
  Carousel,
} from "antd";
import BgProfile from "../assets/images/bg-signup.jpg";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { baseUrl } from "../config";
import Loader from "../components/Loader";
import { CheckCircleOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";

function Profile() {
  const { userId } = useParams();
  const carouselRef = useRef(null);
  const [userData, setUserData] = useState();
  const [planDetails, setPlanDetails] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []); // Update data when page or page size changes

  async function getUser() {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/api/user/read/${userId}`);
      if (response.status === 200) {
        setUserData(response.data.result);
        setPlanDetails(response.data.plan);
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

  function getColor(name = '') {
    const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#ff4d4f', '#36cfc9'];
    let charCode = 0;
    for (let i = 0; i < name.length; i++) {
      charCode += name.charCodeAt(i);
    }
    return colors[charCode % colors.length];
  }

  const fileUrl = `${baseUrl}/${userData?.audioPrompt}`;
  const fileExtension = fileUrl.split('.').pop().toLowerCase();

  const getMimeType = (ext) => {
    switch (ext) {
      case 'mp3': return 'audio/mpeg';
      case 'm4a': return 'audio/mp4';
      case 'wav': return 'audio/wav';
      case 'ogg': return 'audio/ogg';
      case 'webm': return 'audio/webm';
      default: return 'audio/*'; // fallback for unknown types
    }
  };

  const media = [
    userData?.image1,
    userData?.image2,
    userData?.image3,
    userData?.image4,
  ].filter(Boolean);

  const isVideo = (url) => {
    if (!url) return false;
    const ext = url.split('.').pop().toLowerCase();
    return ['mp4', 'webm', 'ogg', 'mov'].includes(ext);
  };


  return (
    <>
      <Loader visible={loading} />
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>
      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar
                  size={74}
                  shape="square"
                  src={userData?.image1 ? `${baseUrl}/${userData.image1}` : null}
                  style={{
                    backgroundColor: !userData?.image1 ? getColor(userData?.name) : 'transparent',
                    color: !userData?.image1 ? '#fff' : 'inherit',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {!userData?.image1 && userData?.name?.[0]?.toUpperCase()}
                </Avatar>
                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{userData?.name} {userData?.isVerified && (<CheckCircleOutlined style={{ color: "#52c41a" }} />)}</h4>
                  <p>{userData?.email}</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={8} className="mb-24 ">
          <Card
            bordered={false}
            className="header-solid h-full card-profile-information"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <Descriptions title="Basic Information" style={{ marginTop: 30 }}>
              <Descriptions.Item label="Hobbies" span={3}>
                {userData?.hobbies?.map(data => data.name).join(', ')}
              </Descriptions.Item>
              <Descriptions.Item label="Interest In" span={3}>
                {userData?.interestIn}
              </Descriptions.Item>
              <Descriptions.Item label="Workout" span={3}>
                {userData?.workout}
              </Descriptions.Item>
              <Descriptions.Item label="looking For" span={3}>
                {userData?.lookingFor}
              </Descriptions.Item>
              <Descriptions.Item label="Height" span={3}>
                {userData?.height ? userData?.height + ' cm' : ''}
              </Descriptions.Item>
              <Descriptions.Item label="Prefered Distance" span={3}>
                {userData?.distance}
              </Descriptions.Item>
              <Descriptions.Item label="Smoking" span={3}>
                {userData?.smoking}
              </Descriptions.Item>
              <Descriptions.Item label="Drinking" span={3}>
                {userData?.drinking}
              </Descriptions.Item>
              <Descriptions.Item label="Interact Age" span={3}>
                {userData?.startAge && userData?.endAge && (userData?.startAge + ' - ' + userData?.endAge)}
              </Descriptions.Item>
              <Descriptions.Item label="Audio Prompt" span={3}>
                {userData?.audioPromptType}
              </Descriptions.Item>
              {userData?.audioPrompt &&
                <Descriptions.Item>
                  <div
                    style={{
                      background: "linear-gradient(to bottom, #C78BE1, #F7A8B8)",
                      padding: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <audio controls >
                      <source src={`${baseUrl}/${userData?.audioPrompt}`} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>

                  </div>
                </Descriptions.Item>
              }
            </Descriptions>
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            className="header-solid h-full card-profile-information"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >

            <Descriptions title="Personal Information" style={{ marginTop: 30 }}>
              <Descriptions.Item label="Mobile" span={3}>
                {userData?.countryCode + userData?.phoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                {userData?.email}
              </Descriptions.Item>
              <Descriptions.Item label="DOB" span={3}>
                {userData?.dob && (new Date(userData?.dob).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long', // This will display the full month name
                  year: 'numeric',
                }))}
              </Descriptions.Item>
              <Descriptions.Item label="Gender" span={3}>
                {userData?.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Location" span={3}>
                {userData?.address}
              </Descriptions.Item>
              <Descriptions.Item label="Bio" span={3}>
                {userData?.introduction}
              </Descriptions.Item>
            </Descriptions>
            {userData?.image1 && (
              <div className="carousel-wrapper">
                <Carousel autoplay={false} arrows dots={false} ref={carouselRef}>
                  {media.map((file, index) => (
                    <div key={index}>
                      {isVideo(file) ? (
                        <video
                          src={baseUrl + '/' + file}
                          controls
                          style={{ width: "100%", borderRadius: "10px" }}
                        />
                      ) : (
                        <img
                          src={baseUrl + '/' + file}
                          alt={`media-${index}`}
                          style={{ width: "100%", height: 600, objectFit: "cover", borderRadius: "10px" }}
                        />
                      )}
                    </div>
                  ))}
                </Carousel>
                {/* Arrows */}
                <button className="arrow left" onClick={() => carouselRef.current.prev()}>
                  <LeftOutlined />
                </button>
                <button className="arrow right" onClick={() => carouselRef.current.next()}>
                  <RightOutlined />
                </button>
              </div>
            )}

          </Card>
        </Col>

        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            className="header-solid h-full card-profile-information"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            {planDetails && (
              <Descriptions title="Plan Details" style={{ marginTop: 30 }}>
                <Descriptions.Item label="Name" span={3}>
                  {planDetails?.productId
                    ? planDetails.productId.charAt(0).toUpperCase() + planDetails.productId.slice(1)
                    : ''}
                </Descriptions.Item>
                {/* <Descriptions.Item label="Amount" span={3}>
                  ${planDetails?.amount}
                </Descriptions.Item> */}
                <Descriptions.Item label="Status" span={3}>
                  {planDetails?.status
                    ? planDetails.status.charAt(0).toUpperCase() + planDetails.status.slice(1)
                    : ''}
                </Descriptions.Item>
              </Descriptions>
            )}
            <Descriptions title="Answer Prompts" style={{ marginTop: 30 }}>
              {userData?.answerPrompts?.map((item) => (
                <Descriptions.Item label={item?.type} span={3}>
                  {item?.description}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Card>
        </Col>

      </Row>
    </>
  );
}

export default Profile;
