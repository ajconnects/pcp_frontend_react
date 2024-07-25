import React, { useState, useEffect } from 'react';
import { CForm, CFormInput, CCol, CButton, CFormSelect, CFormTextarea, CFormCheck, CFormFeedback, CSpinner, CAlert } from '@coreui/react';
import { registerProgrammer, getCategories } from '../api';

const ProgrammerForm = () => {
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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(error);
        setLoading(false);
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

    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('password', formData.password);
    form.append('phone_number', formData.phone_number);
    form.append('address', formData.address);
    form.append('experience', formData.experience);
    form.append('rate', formData.rate);
    form.append('category_id', formData.category_id);
    form.append('skills', formData.skills);
    form.append('bio', formData.bio);

    if (formData.profile_picture) {
      form.append('profile_picture', formData.profile_picture);
    }

    if (formData.cv) {
      form.append('cv', formData.cv);
    }

    try {
      const response = await registerProgrammer(form);
      const programmerId = response.data.id;

      window.location.href = `/programmer-profile/${programmerId}`;
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error);
    }
  };

  if (loading) return <CSpinner color="primary" />;
  if (error) return <CAlert color="danger">Error fetching categories: {error.message}</CAlert>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Programmer Registration Form:</h1>
      <br />
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
            min={10}
            max={100}
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
          <CButton style={{ backgroundColor: '#1d899a', color: 'white' }} type="submit">Submit form</CButton>
        </CCol>
      </CForm>
    </div>
  );
};

export default ProgrammerForm;