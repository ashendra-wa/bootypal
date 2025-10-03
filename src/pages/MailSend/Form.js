// import React, { useEffect, useState } from "react";
// import { Row, Col, Card, Button, notification, Form, Input, Select } from "antd";
// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import { baseUrl } from "../../config";
// import debounce from 'lodash.debounce';

// const { Item } = Form;
// const { Option } = Select;

// function MailSendForm() {
//     const history = useHistory();
//     const [form] = Form.useForm();
//     const [isUpdateMode, setIsUpdateMode] = useState(false);
//     const [userList, setUserList] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [pageSize] = useState(10);
//     const [loading, setLoading] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [hasMore, setHasMore] = useState(true);
//     const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

//     useEffect(() => {
//         fetchUser(1, '');  // Initial load with page 1 and empty search term
//     }, []);

//     useEffect(() => {
//         // Set a 1.5-second delay after typing
//         const timer = setTimeout(() => {
//             setDebouncedSearchTerm(searchTerm);
//         }, 1500);

//         // Clear the timer if the user types again within 1.5 seconds
//         return () => clearTimeout(timer);
//     }, [searchTerm]);

//     useEffect(() => {
//         if (debouncedSearchTerm.length >= 3 || debouncedSearchTerm.length === 0) {
//             fetchUser(1, debouncedSearchTerm); // Fetch user only after debounce
//             setCurrentPage(1);
//             setUserList([]);
//             setHasMore(true);
//         }
//     }, [debouncedSearchTerm]);

//     const fetchUser = async (page, search) => {
//         if (loading || (!hasMore && page > 1)) return;
//         setLoading(true);
//         try {
//             const response = await axios.get(`${baseUrl}/api/admin/list`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//                 },
//                 params: {
//                     page,
//                     items: pageSize,
//                     q: search || '',
//                     fields: 'name,surname',
//                 },
//             });
//             if (response.data.success) {
//                 const newUserList = response.data.result;
//                 setUserList(prevList => page === 1 ? newUserList : [...prevList, ...newUserList]);
//                 setHasMore(newUserList.length === pageSize);
//             } else {
//                 setUserList([]);
//                 notification.info({
//                     message: 'Info',
//                     description: response.data.message,
//                     placement: 'topRight'
//                 });
//                 setHasMore(false);
//             }
//         } catch (error) {
//             console.error("API error:", error);
//             notification.info({
//                 message: 'Info',
//                 description: error.response?.data?.message || "Error occurred",
//                 placement: 'topRight'
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const onFinish = async (values) => {
//         try {
//             console.log("values", values);

//             const response = await axios.post(`${baseUrl}/api/mail-send/create`, values, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//                 },
//             });
//             if (response.status === 200) {
//                 notification.success({
//                     message: 'Success',
//                     description: 'Mail sent successfully!',
//                     placement: 'topRight'
//                 });
//                 form.resetFields();
//                 history.push('/send-mail');
//             } else {
//                 notification.info({
//                     message: 'Info',
//                     description: response.data.message,
//                     placement: 'topRight'
//                 });
//             }
//         } catch (error) {
//             console.error("API error:", error);
//             notification.info({
//                 message: 'Info',
//                 description: error.response?.data?.message,
//                 placement: 'topRight'
//             });
//         }
//     };

//     const handleSearch = (value) => {
//         setSearchTerm(value);
//     };

//     const handlePopupScroll = debounce((e) => {
//         const { target } = e;
//         if (target.scrollTop + target.offsetHeight >= target.scrollHeight - 10 && hasMore) {
//             setCurrentPage(prevPage => {
//                 const nextPage = prevPage + 1;
//                 fetchUser(nextPage, debouncedSearchTerm);
//                 return nextPage;
//             });
//         }
//     }, 200);

//     // Cleanup debounce on unmount
//     useEffect(() => {
//         return () => handlePopupScroll.cancel();
//     }, []);

//     return (
//         <div className="tabled">
//             <Row gutter={[24, 0]}>
//                 <Col xs="24" xl={24}>
//                     <Card bordered={false} className="criclebox tablespace mb-24" title="Mail Send">
//                         <Form style={{ padding: "20px" }} form={form} onFinish={onFinish} layout="vertical">
//                             <Row gutter={[16, 16]}>
//                                 <Col xs={24} sm={12} lg={12}>
//                                     <Item label="Subject" name="title" rules={[{ required: true, message: 'Please enter subject' }]}>
//                                         <Input placeholder="Please enter subject" />
//                                     </Item>
//                                 </Col>
//                                 <Col xs={24} sm={12} lg={12}>
//                                     <Item label="Body" name="body" rules={[{ required: true, message: 'Please enter body' }]}>
//                                         <Input.TextArea placeholder="Please enter body" rows={4} />
//                                     </Item>
//                                 </Col>
//                                 <Col xs={24} sm={12} lg={12}>
//                                     <Item label="Select users" name="users" rules={[{ required: true, message: 'Please select users' }]}>
//                                     <Select
//                                             mode="multiple"
//                                             placeholder="Search and select users"
//                                             style={{ width: '100%' }}
//                                             loading={loading}
//                                             onSearch={handleSearch}
//                                             onPopupScroll={handlePopupScroll}
//                                             filterOption={false}
//                                             showSearch
//                                             notFoundContent={loading ? <span>Loading...</span> : <span>No users found</span>}
//                                         >
//                                             {userList.map((item) => (
//                                                 <Option key={item._id} value={item._id}>
//                                                     {item.name} {item.surname || ''}
//                                                 </Option>
//                                             ))}
//                                         </Select>
//                                     </Item>
//                                 </Col>
//                             </Row>
//                             <Row>
//                                 <Col xs={24} sm={12} lg={8}>
//                                     <Item>
//                                         <Button type="primary" htmlType="submit">
//                                             {isUpdateMode ? "Update" : "Add"}
//                                         </Button>
//                                     </Item>
//                                 </Col>
//                             </Row>
//                         </Form>
//                     </Card>
//                 </Col>
//             </Row>
//         </div>
//     );
// }

// export default MailSendForm;


import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, notification, Form, Input, Select } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../../config";
import debounce from 'lodash.debounce';

const { Item } = Form;
const { Option } = Select;

function MailSendForm() {
    const history = useHistory();
    const [form] = Form.useForm();
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [userList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    useEffect(() => {
        fetchUser(1, '');  // Initial load with page 1 and empty search term
    }, []);

    useEffect(() => {
        // Set a 1.5-second delay after typing
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 1500);

        // Clear the timer if the user types again within 1.5 seconds
        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedSearchTerm.length >= 3 || debouncedSearchTerm.length === 0) {
            fetchUser(1, debouncedSearchTerm); // Fetch user only after debounce
            setCurrentPage(1);
            setUserList([]);
            setHasMore(true);
        }
    }, [debouncedSearchTerm]);

    const fetchUser = async (page, search) => {
        if (loading || (!hasMore && page > 1)) return;
        setLoading(true);
        try {
            const response = await axios.get(`${baseUrl}/api/admin/list`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                params: {
                    page,
                    items: pageSize,
                    q: search || '',
                    fields: 'name,surname',
                },
            });
            if (response.data.success) {
                const newUserList = response.data.result;
                setUserList(prevList => page === 1 ? newUserList : [...prevList, ...newUserList]);
                setHasMore(newUserList.length === pageSize);
            } else {
                setUserList([]);
                notification.info({
                    message: 'Info',
                    description: response.data.message,
                    placement: 'topRight'
                });
                setHasMore(false);
            }
        } catch (error) {
            console.error("API error:", error);
            notification.info({
                message: 'Info',
                description: error.response?.data?.message || "Error occurred",
                placement: 'topRight'
            });
        } finally {
            setLoading(false);
        }
    };

    const onFinish = async (values) => {
        try {
            console.log("values", values);

            const response = await axios.post(`${baseUrl}/api/mail-send/create`, values, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            if (response.status === 200) {
                notification.success({
                    message: 'Success',
                    description: 'Mail sent successfully!',
                    placement: 'topRight'
                });
                form.resetFields();
                history.push('/send-mail');
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

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const handlePopupScroll = debounce((e) => {
        const { target } = e;
        if (target.scrollTop + target.offsetHeight >= target.scrollHeight - 10 && hasMore) {
            setCurrentPage(prevPage => {
                const nextPage = prevPage + 1;
                fetchUser(nextPage, debouncedSearchTerm);
                return nextPage;
            });
        }
    }, 200);

    const handleSelectChange = (value) => {
        if (value.includes("all")) {
            setSelectedUsers(["all"]);  // Only "All Users" option is selected
        } else {
            setSelectedUsers(value);  // Selected individual users
        }
    };

    return (
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                    <Card bordered={false} className="criclebox tablespace mb-24" title="Mail Send">
                        <Form style={{ padding: "20px" }} form={form} onFinish={onFinish} layout="vertical">
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item label="Subject" name="title" rules={[{ required: true, message: 'Please enter subject' }]}>
                                        <Input placeholder="Please enter subject" />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item label="Body" name="body" rules={[{ required: true, message: 'Please enter body' }]}>
                                        <Input.TextArea placeholder="Please enter body" rows={4} />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item label="Select users" name="users" rules={[{ required: true, message: 'Please select users' }]}>
                                        <Select
                                            mode="multiple"
                                            placeholder="Search and select users"
                                            style={{ width: '100%' }}
                                            loading={loading}
                                            onSearch={handleSearch}
                                            onPopupScroll={handlePopupScroll}
                                            filterOption={false}
                                            showSearch
                                            value={selectedUsers}
                                            onChange={handleSelectChange}
                                            notFoundContent={loading ? <span>Loading...</span> : <span>No users found</span>}
                                        >
                                            <Option key="all" value="all">
                                                All Users
                                            </Option>
                                            {userList.map((item) => (
                                                <Option key={item._id} value={item._id} disabled={selectedUsers.includes("all")}>
                                                    {item.name} {item.surname || ''}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={12} lg={8}>
                                    <Item>
                                        <Button type="primary" htmlType="submit">
                                            {isUpdateMode ? "Update" : "Add"}
                                        </Button>
                                    </Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default MailSendForm;
