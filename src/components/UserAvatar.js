import { useState } from 'react';
import { Avatar, Modal, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { CheckCircleOutlined } from '@ant-design/icons';


const { Title } = Typography;

const UserAvatar = ({ user, baseUrl }) => {
  const [visible, setVisible] = useState(false);

  const imageUrl = user?.user?.image1 ? `${baseUrl}/${user?.user?.image1}` : '';

  function getColor(name = '') {
    const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#ff4d4f', '#36cfc9'];
    let charCode = 0;
    for (let i = 0; i < name.length; i++) {
      charCode += name.charCodeAt(i);
    }
    return colors[charCode % colors.length];
  }

  return (
    <>
      {/* <div onClick={() => imageUrl && setVisible(true)} style={{ cursor: 'pointer' }}> */}
      <Avatar.Group>
        <Avatar
          onClick={() => imageUrl && setVisible(true)}
          className="shape-avatar"
          shape="square"
          size={40}
          src={user?.user?.image1 ? baseUrl + '/' + user?.user?.image1 : null}
          style={{
            backgroundColor: !user?.user?.image1 ? getColor(user?.user?.name) : 'transparent',
            color: !user?.user?.image1 ? '#fff' : 'inherit',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {!user?.user?.image1 && user?.user?.name?.[0]?.toUpperCase()}
        </Avatar>

        <Link to={`/users/${user?.user?._id}`}>
          <div className="avatar-info">
            <Title level={5}>{user?.user?.name} {user?.user?.isVerified && (<CheckCircleOutlined style={{ color: "#52c41a" }} />)}</Title>
            <p>{user?.user?.email}</p>
          </div>
        </Link>

      </Avatar.Group>
      {/* </div> */}

      <Modal
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        centered
        width={600} // ✅ Medium size
      >
        <div style={{ textAlign: 'center' }}>
          {/* <div style={{ marginBottom: 10 }}>
            <Button onClick={zoomIn}>Zoom In</Button>
            <Button onClick={zoomOut} style={{ margin: '0 8px' }}>Zoom Out</Button>
            <Button onClick={resetZoom}>Reset</Button>
          </div> */}
          <img
            src={imageUrl}
            alt="User"
            style={{
              maxWidth: '100%',
              transition: 'transform 0.3s ease',
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default UserAvatar;
