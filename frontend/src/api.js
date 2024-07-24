import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://pcpconsultants.pythonanywhere.com',
});

// Authentication
export const login = (data) => api.post('/auth/login/', data);
export const registerClient = (data) => api.post('/auth/register-client/', data);
export const registerProgrammer = (data) => api.post('/auth/register-programmer/', data);

// Search
export const getSearchResults = (query) => api.get(`/search?query=${query}`);

// Categories
export const getCategoryProgrammers = (id) => api.get(`/category/${id}`);

// Profiles
export const getProgrammerProfile = (id) => api.get(`/programmer-profile/${id}`);
export const getClientProfile = (id) => api.get(`/client-profile/${id}`);

// Messages
export const getMessages = (id) => api.get(`/messages/${id}`);
export const sendMessage = (data) => api.post('/messages/', data);

export default api;