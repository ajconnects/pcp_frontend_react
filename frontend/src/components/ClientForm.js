import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CFormInput, CForm, CCol, CButton, CFormCheck, CFormFeedback, CFormTextarea } from '@coreui/react';
import { AuthContext } from './AuthContext';

const ClientForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone_number: '',
        address: '',
        bio: '',
        profile_picture: null,
    });

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            profile_picture: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();

        // Append user data individually
        form.append('user.name', formData.name);
        form.append('user.email', formData.email);
        form.append('user.password', formData.password);

        // Append other form data
        form.append('phone_number', formData.phone_number);
        form.append('address', formData.address);
        form.append('bio', formData.bio);

        // Append profile picture if it exists
        if (formData.profile_picture) {
            form.append('profile_picture', formData.profile_picture);
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/clients/', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const clientId = response.data.id; // Assuming the response contains the new client's ID

            // Verify clientId is not undefined before navigating
            if (clientId) {
                localStorage.setItem('access_token', response.data.jwt);
                localStorage.setItem('user_type', 'client');
                localStorage.setItem('user_id', clientId);

                login('client', clientId);
                navigate(`/client-profile/${clientId}`); // Redirect to the profile page
            } else {
                console.error('Client ID is undefined:', response.data);
            }
        } catch (error) {
            console.error('Error submitting form:', error.response.data); // Log detailed error message
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Client Registration Form:</h1>
            <br/>
            <CForm className="row g-3" onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
                <CCol md={6}>
                    <CFormInput
                        type="text"
                        id="inputName"
                        label="Full Name"
                        name="name"
                        onChange={handleChange}
                    />
                </CCol>
                <CCol md={6}>
                    <CFormInput
                        type="email"
                        id="inputEmail4"
                        label="Email"
                        name="email"
                        onChange={handleChange}
                    />
                </CCol>
                <CCol md={6}>
                    <CFormInput
                        type="password"
                        id="inputPassword4"
                        label="Password"
                        name="password"
                        onChange={handleChange}
                    />
                </CCol>
                <CCol md={6}>
                    <CFormInput
                        type="text"
                        id="inputPhoneNumber"
                        label="Phone Number"
                        name="phone_number"
                        onChange={handleChange}
                    />
                </CCol>
                <CCol xs={12}>
                    <CFormInput
                        id="inputAddress"
                        label="Address"
                        name="address"
                        placeholder="Current Location"
                        onChange={handleChange}
                    />
                </CCol>
                <CCol xs={12}>
                    <CFormTextarea
                        id="inputBio"
                        label="Bio"
                        name="bio"
                        rows={3}
                        placeholder="Tell us about yourself"
                        onChange={handleChange}
                    />
                </CCol>
                <CCol xs={12}>
                    <label>Profile Picture:</label>
                    <input
                        type="file"
                        name="profile_picture"
                        onChange={handleFileChange}
                    />
                </CCol>
                <CCol xs={12}>
                    <CFormCheck
                        type="checkbox"
                        id="invalidCheck"
                        label="Agree to terms and conditions"
                        required
                    />
                    <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                </CCol>
                <CCol xs={12}>
                    <CButton style={{ backgroundColor: '#1d899a', color: 'white' }} type="submit">Submit form</CButton>
                </CCol>
            </CForm>
        </div>
    );
};

export default ClientForm;