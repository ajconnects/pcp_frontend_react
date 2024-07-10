import React from 'react';
import { CForm, CFormLabel, CFormInput, CFormTextarea, CFormSelect, CButton } from '@coreui/react';

const EditProgrammerProfile = ({ formData, categories, handleChange, handleFileChange, handleSubmit, setEditing }) => {
  return (
    <CForm onSubmit={handleSubmit}>
      <div className="profile-picture">
        {formData.profile_picture && (
          <img
            src={formData.profile_picture}
            alt={`${formData.name}'s profile`}
            className="img-fluid rounded-circle"
          />
        )}
      </div>
      <div className="profile-details">
        <div className="mb-3">
          <CFormLabel htmlFor="name">Full Name</CFormLabel>
          <CFormInput
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="email">Email</CFormLabel>
          <CFormInput
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="phone_number">Phone Number</CFormLabel>
          <CFormInput
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="address">Address</CFormLabel>
          <CFormInput
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="experience">Experience</CFormLabel>
          <CFormInput
            type="number"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="rate">Rate</CFormLabel>
          <CFormInput
            type="number"
            id="rate"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            min={10}
            max={100}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="category_id">Category</CFormLabel>
          <CFormSelect
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </CFormSelect>
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="skills">Skills</CFormLabel>
          <CFormInput
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="bio">Bio</CFormLabel>
          <CFormTextarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="cv">CV</CFormLabel>
          <CFormInput
            type="file"
            id="cv"
            name="cv"
            onChange={handleFileChange}
          />
        </div>
        <CButton type="submit" color="primary">Update</CButton>
        <CButton type="button" color="secondary" onClick={() => setEditing(false)} className="ms-2">Cancel</CButton>
      </div>
    </CForm>
  );
};

export default EditProgrammerProfile;