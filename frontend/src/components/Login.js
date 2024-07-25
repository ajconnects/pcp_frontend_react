import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CForm, CFormInput, CButton, CContainer, CRow, CCol } from '@coreui/react';
import { AuthContext } from './AuthContext';
import { login } from '../api'; // Use the login function from api.js

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem('access_token', response.data.token);
      localStorage.setItem('user_type', response.data.user_type);
      localStorage.setItem('user_id', response.data.user_id);

      authLogin(response.data.user_type, response.data.user_id);

      if (response.data.user_type === 'programmer') {
        navigate(`/programmer-profile/${response.data.user_id}`);
      } else if (response.data.user_type === 'client') {
        navigate(`/client-profile/${response.data.user_id}`);
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={6}>
          <h1>Login</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <CForm onSubmit={handleSubmit}>
            <CFormInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <CFormInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <CButton type="submit" className="custom-button">Login</CButton>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Login;