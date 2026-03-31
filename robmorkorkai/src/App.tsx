import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MOCK_SHOPS } from './data/mockData'; // นำเข้าข้อมูล 30 ร้านที่คุณสร้างไว้
import type { Shop } from './types/shop';
import 'bootstrap/dist/css/bootstrap.min.css';

// Context
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import Login from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';
import { AIPage } from './components/pages/AIPage';
import ShopDetailPage from './components/pages/ShopDetailPage';
import ProfilePage from './components/pages/ProfilePage';
import { AdminPage } from "./components/pages/AdminPage";
import { SearchPage } from "./components/pages/SearchPage";

// สร้าง Component Wrapper สำหรับ Route ที่ต้อง Login (Protected Route)
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn, loading } = useAuth();
  
  if (loading) {
    return null; // รอให้ session load เสร็จก่อน
  }
  
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// แสดง HomePage เสมอ ไม่ต้องตัดสินใจ redirect
const HomeRedirect = ({ shops }: { shops: Shop[] }) => {
  return <HomePage />;
};

const AppContent = () => {
  const [shops, setShops] = useState<Shop[]>(MOCK_SHOPS);
  const handleUpdateShop = (updatedShop: Shop) => {
    setShops(prev => prev.map(s => s.id === updatedShop.id ? updatedShop : s));
  };
  const handleDeleteShop = (id: string) => {
    setShops(prev => prev.filter(s => s.id !== id));
  };
  return (
    <Routes>

      <Route path="/" element={<HomeRedirect shops={shops}/>} />
      <Route path="/search" element={<SearchPage />} />
      <Route path='/ai' element={<AIPage />} />

      {/* ShopDetailPage ก็ไม่ต้องส่ง Props แล้ว */}
      <Route path="/shop/:id" element={<ShopDetailPage />} />

      {/* Login ไม่ต้องรับ onLogin แล้ว */}
      <Route path="/login" element={<Login />} />

      {/* ใช้ ProtectedRoute แบบใหม่ สั้นและอ่านง่ายกว่า */}
      <Route path="/profile" element={
        <ProtectedRoute><ProfilePage /></ProtectedRoute>
      } />

      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminPage 
            shops={shops} 
            onUpdateShop={handleUpdateShop} 
            onDeleteShop={handleDeleteShop} 
          />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;