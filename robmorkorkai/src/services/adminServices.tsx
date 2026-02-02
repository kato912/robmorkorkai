// src/services/adminService.ts

// 1. Import Type และ Data มาใช้ (แก้ Path ให้ถูกตามโครงสร้างโปรเจคคุณ)
// ถ้าไฟล์ service อยู่ใน src/services และ data อยู่ใน src/data ให้ใช้ ../data/...
import { mockStoreRequests, ShopRequest, typeStoreStatus } from "../data/mockAdminData";

// 2. สร้างตัวแปร Local จำลอง Database (เพื่อให้แก้ไขข้อมูลได้)
let MOCK_DB: ShopRequest[] = [...mockStoreRequests]; 

// 3. Service Functions

export const fetchShops = async (): Promise<ShopRequest[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve([...MOCK_DB]), 500); 
    });
};

export const updateShopStatus = async (id: string, status: string): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            MOCK_DB = MOCK_DB.map(s => s.id === id ? { ...s, status } : s);
            resolve();
        }, 300);
    });
};

export const updateShopDetails = async (updatedShop: ShopRequest): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            MOCK_DB = MOCK_DB.map(s => s.id === updatedShop.id ? updatedShop : s);
            resolve();
        }, 300);
    });
};

export const deleteShop = async (id: string): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            MOCK_DB = MOCK_DB.filter(s => s.id !== id);
            resolve();
        }, 300);
    });
};