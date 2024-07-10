import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CContainer, CRow, CCol, CButton } from '@coreui/react';

const UserTypeSelection = () => {
  const navigate = useNavigate();

  const handleUserTypeSelection = (userType) => {
    if (userType === 'programmer') {
      navigate('/register-programmer');
    } else if (userType === 'client') {
      navigate('/register-client');
    }
  };

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={6} className="text-center">
          <h1>Select User Type</h1>
          <CButton onClick={() => handleUserTypeSelection('programmer')} className="custom-button-programmer m-2">Programmer</CButton>
          <CButton onClick={() => handleUserTypeSelection('client')} className="custom-button-client m-2">Client</CButton>
          <p className="mt-3">
            Already have an account? <Link to="/login"className="custom-link">Login here</Link>
          </p>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default UserTypeSelection;