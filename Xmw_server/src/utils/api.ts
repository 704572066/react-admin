import axios from 'axios';

const API_URL = 'https://localhost:3002';

const token = 'df06ad61e0c14be69a60fbb615448bcb'; // 假设你已经获得了一个有效的token

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;