import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';
import AIPage from './components/pages/AIPage';
import ShopDetailPage from './components/pages/ShopDetailPage';
import ProfilePage from './components/pages/ProfilePage';
import { AddShopPage } from "./components/pages/AddShopPage";

const AppContent = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/"); // login เสร็จให้เด้งไปหน้าแรกเลย
  };

  const handleLogout = () => {
    // 1. เคลียร์ค่าใน Storage ก่อน
    localStorage.removeItem("isLoggedIn");
    localStorage.clear(); 
    window.location.href = "/";
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
      <Route path='/ai' element={<AIPage />} />
      <Route path="/shop/:id" element={<ShopDetailPage />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/profile" element={
        isLoggedIn ? <ProfilePage onLogout={handleLogout} /> : <Navigate to="/login" replace />
      } />
      <Route path="/add-shop" element={
        isLoggedIn ? <AddShopPage /> : <Navigate to="/login" replace />
      } />
    </Routes>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;