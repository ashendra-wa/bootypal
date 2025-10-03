import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Card,
    Button,
    notification,
    Form,
    Input,
    Select,
} from "antd";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { baseUrl } from "../../config";

const { Item } = Form;
const { Option } = Select;

function UniversityAdd() {
    const { blogId } = useParams(); // Extract blogId from URL
    const history = useHistory();
    const [form] = Form.useForm();
    const [image, setImage] = useState();
    const [blogCategoryList, setBlogCategoryList] = useState([]);
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    useEffect(() => {
        // Check if blogId exists to determine if it's an update mode
        fetchBlogCategory();
        if (blogId) {
            setIsUpdateMode(true);
            fetchUniversityDetails();
        }
    }, [blogId]);

    const fetchBlogCategory = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/blog-category/listAll`);
            if (response.status === 200) {
                setBlogCategoryList(response.data.result)
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

    const fetchUniversityDetails = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/blog/read/${blogId}`);
            if (response.status === 200) {
                const { image, ...otherFields } = response.data.result;
                form.setFieldsValue({ ...otherFields }); // Populate form fields with fetched data
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

    function handleImage(image) {
        setImage(image);
    }

    // Function to generate slug from the title
    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^\w\s]/g, '') // Remove non-word characters
            .replace(/\s+/g, '-')     // Replace spaces with hyphens
            .trim();
    };

    // Function to handle title change
    const handleTitleChange = (e) => {
        const title = e.target.value;
        const slug = generateSlug(title); // Generate slug from title
        form.setFieldsValue({ slug });    // Set the slug field value in the form
    };

    const onFinish = async (values) => {
        const formData = new FormData();
        for (let key in values) {
            if (key === 'image') {
                formData.append('file', image);
            } else {
                formData.append(key, values[key]);
            }
        }
        try {
            if (isUpdateMode) {
                const response = await axios.patch(`${baseUrl}/api/blog/update/${blogId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                    },
                });
                if (response.data.success) {
                    notification.success({
                        message: 'Success',
                        description: 'Blog updated successfully!',
                        placement: 'topRight'
                    });
                    history.push('/blogs');
                } else {
                    notification.info({
                        message: 'Info',
                        description: response.data.message,
                        placement: 'topRight'
                    });
                }
            } else {
                const response = await axios.post(`${baseUrl}/api/blog/create`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include access token in headers
                    },
                });
                if (response.status === 200) {
                    notification.success({
                        message: 'Success',
                        description: 'Blog added successfully!',
                        placement: 'topRight'
                    });
                    form.resetFields();
                    history.push('/blogs');
                } else {
                    notification.info({
                        message: 'Info',
                        description: response.data.message,
                        placement: 'topRight'
                    });
                }
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

    return (
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title={isUpdateMode ? "Update Blog" : "Add Blog"}
                    >
                        <Form style={{ "padding": "20px" }} form={form} onFinish={onFinish} layout="vertical">
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Post Title"
                                        name="title"
                                        rules={[{ required: true, message: 'Please enter title' }]}
                                    >
                                        <Input onChange={handleTitleChange} />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Slug"
                                        name="slug"
                                        rules={[{ required: true, message: 'Slug is required' }]}
                                    >
                                        <Input />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Author"
                                        name="author"
                                        rules={[{ required: true, message: 'Please enter author' }]}
                                    >
                                        <Input />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="SEO Title"
                                        name="seoTitle"
                                        rules={[{ required: true, message: 'Please enter seo title' }]}
                                    >
                                        <Input />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Category"
                                        name="category"
                                        rules={[{ required: true, message: 'Please select blog type' }]}
                                    >
                                        <Select placeholder="Select an option">
                                            {blogCategoryList.map((item, i) => (
                                                <Option value={item._id}>{item.name}</Option>
                                            ))}
                                        </Select>
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Focus Keyword"
                                        name="focusKeyword"
                                        rules={[{ required: true, message: 'Please enter focus keyword' }]}
                                    >
                                        <Input />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Status"
                                        name="enabled"
                                        rules={[{ required: true, message: 'Please select status' }]}
                                    >
                                        <Select placeholder="Please select status">
                                            <Option value={true}>Active</Option>
                                            <Option value={false}>Inactive</Option>
                                        </Select>
                                    </Item>
                                </Col>




                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Image"
                                        name="image"
                                        rules={[{ required: blogId ? false : true, message: 'Image is required' }]}
                                    >
                                        <Input type="file" onChange={(e) => handleImage(e.target.files[0])} />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Short Description"
                                        name="shortDescription"
                                        rules={[{ required: true, message: 'Please enter short description' }]}
                                    >
                                        <ReactQuill />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Description"
                                        name="description"
                                        rules={[{ required: true, message: 'Please enter description' }]}
                                    >
                                        <ReactQuill />
                                    </Item>
                                </Col>
                                <Col xs={24} sm={12} lg={12}>
                                    <Item
                                        label="Meta description"
                                        name="metaDescription"
                                        rules={[{ required: true, message: 'Please enter meta description' }]}
                                    >
                                        <Input />
                                    </Item>
                                </Col>

                            </Row>
                            <Row>
                                <Col xs={24} sm={12} lg={8}>
                                    <Item>
                                        <Button type="primary" htmlType="submit">
                                            {isUpdateMode ? "Update Blog" : "Add Blog"}
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

export default UniversityAdd;

