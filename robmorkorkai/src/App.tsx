// import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// Context
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import Login from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';
import AIPage from './components/pages/AIPage';
import ShopDetailPage from './components/pages/ShopDetailPage';
import ProfilePage from './components/pages/ProfilePage';
import { AddShopPage } from "./components/pages/AddShopPage";
import { SearchPage } from "./components/pages/SearchPage";

// สร้าง Component Wrapper สำหรับ Route ที่ต้อง Login (Protected Route)
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const AppContent = () => {
  return (
    <Routes>
      {/* ลบ Props isLoggedIn={...} ออกให้หมด เพราะข้างในจะไปเรียก useAuth เอง */}
      <Route path="/" element={<HomePage />} />
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
      <Route path="/add-shop" element={
        <ProtectedRoute><AddShopPage /></ProtectedRoute>
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