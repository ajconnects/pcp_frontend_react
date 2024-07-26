import axios from "axios";

const api = axios.create({
  baseURL: 'https://pcpconsultants.pythonanywhere.com',
});

// Authentication
export const login = (data) => api.post('/auth/login/', data);
export const registerClient = (data) => api.post('/auth/register-client/', data);
export const registerProgrammer = (data) => api.post('/auth/register-programmer/', data);

// Search
export const getSearchResults = (query) => api.get(`/search?query=${query}`);

// Categories
export const getCategoryProgrammers = (id) => api.get(`/programmers?category=${id}`);
export const getCategories = () => api.get('/categories/');
export const deleteProgrammerProfile = (id) => api.delete(`/programmers/${id}`);
export const updateProgrammerProfile = (id, data) => api.put(`/programmers/${id}`, data);

// Profiles
export const getProgrammerProfile = (id) => api.get(`/programmers/${id}`);
export const getClientProfile = (id) => api.get(`/clients/${id}`);
export const getProgrammers = () => api.get('/programmers/');

// Messages
export const getMessages = (id) => api.get(`/messages/${id}`);
export const sendMessage = (data) => api.post('/messages/', data);

export default api;