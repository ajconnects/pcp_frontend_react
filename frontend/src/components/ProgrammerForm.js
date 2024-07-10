import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CFormInput, CForm, CCol, CButton, CFormCheck, CFormSelect, CFormTextarea, CFormFeedback } from '@coreui/react';
import { AuthContext } from './AuthContext';

const ProgrammerForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone_number: '',
        address: '',
        experience: '',
        rate: '',
        category_id: '',
        skills: '',
        bio: '',
        profile_picture: null,
        cv: null
    });

    const { login } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/categories/');
                setCategories(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0],
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
        form.append('experience', formData.experience);
        form.append('rate', formData.rate);
        form.append('category_id', formData.category_id);
        form.append('skills', formData.skills);
        form.append('bio', formData.bio);

        // Append profile picture if it exists
        if (formData.profile_picture) {
            form.append('profile_picture', formData.profile_picture);
        }

        // Append CV if it exists
        if (formData.cv) {
            form.append('cv', formData.cv);
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/programmers/', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const programmerId = response.data.id; // Assuming the response contains the new programmer's ID

            // Verify programmerId is not undefined before navigating
            if (programmerId) {
                localStorage.setItem('access_token', response.data.jwt);
                localStorage.setItem('user_type', 'programmer');
                localStorage.setItem('user_id', programmerId);

                login('programmer', programmerId);
                navigate(`/programmer-profile/${programmerId}`); // Redirect to the profile page
            } else {
                console.error('Programmer ID is undefined:', response.data);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            if (error.response) {
                setError(error.response.data);
            }
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Programmer Registration Form:</h1>
            <br/>
            {isLoading ? (
                <p>Loading categories...</p>
            ) : (
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
                    <CCol md={6}>
                        <CFormInput
                            type="number"
                            id="inputExperience"
                            label="Experience (years)"
                            name="experience"
                            onChange={handleChange}
                        />
                    </CCol>
                    <CCol md={6}>
                        <CFormInput
                            type="number"
                            id="inputRate"
                            label="Rate"
                            name="rate"
                            onChange={handleChange}
                            min={10}  // Minimum value for rate
                            max={100} // Maximum value for rate
                        />
                    </CCol>
                    <CCol md={12}>
                        <CFormSelect
                            id="inputCategories"
                            label="Categories"
                            name="category_id"
                            onChange={handleChange}
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </CFormSelect>
                    </CCol>
                    <CCol xs={12}>
                        <CFormInput
                            id="inputSkills"
                            label="Skills"
                            name="skills"
                            placeholder="e.g Python/Django"
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
                        <label>CV:</label>
                        <input
                            type="file"
                            name="cv"
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
                        <CButton style={{ backgroundColor: '#1d899a', color: 'white'}} type="submit">Submit form</CButton>
                    </CCol>
                </CForm>
            )}
            {error && <p style={{ color: 'red' }}>Error: {JSON.stringify(error)}</p>}
        </div>
    );
};

export default ProgrammerForm;