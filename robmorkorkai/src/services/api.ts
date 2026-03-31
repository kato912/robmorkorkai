// ไฟล์: robmorkorkai/src/services/api.ts

import axios from 'axios';

// 1. สร้าง Axios Instance
const api = axios.create({
    // baseURL คือที่อยู่ของ Backend คุณ
    // ถ้าคุณรัน backend ที่ port 3000 ก็ใส่ localhost:3000
    baseURL: import.meta.env.VITE_API_URL, 
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// 2. Request Interceptor: ฝัง Token ไปกับทุก Request อัตโนมัติ
api.interceptors.request.use(
    (config) => {
        // ดึง Token จาก LocalStorage (ต้องตรงกับตอน Login ที่คุณ save ไว้)
        const token = localStorage.getItem('token');
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;