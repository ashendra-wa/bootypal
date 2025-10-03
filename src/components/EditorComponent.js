import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import axios from 'axios';

// Editor Component
const EditorComponent = ({ value, onChange }) => {
    // Function to handle image upload
    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                const imageUrl = await uploadImage(file);
                if (imageUrl) {
                    const quill = document.querySelector('.ql-editor');
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    quill.appendChild(img);
                }
            }
        };
        input.click();
    };

    // Function to upload image to server
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post('https://your-api-endpoint/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.imageUrl; // Assuming the API returns the image URL
        } catch (error) {
            console.error('Image upload failed:', error);
            return null;
        }
    };

    // ReactQuill modules configuration
    const modules = {
        toolbar: {
            container: [
                [{ 'header': '1' }, { 'header': '2' }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['link', 'image'],
            ],
            handlers: {
                image: handleImageUpload, // Custom image upload handler
            },
        },
    };

    return (
        <ReactQuill
            value={value}
            onChange={onChange}
            modules={modules}
        />
    );
};

export default EditorComponent;
