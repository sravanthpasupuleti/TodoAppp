// frontend/utils/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Use your local IP if testing on a real device
});

export default API;
