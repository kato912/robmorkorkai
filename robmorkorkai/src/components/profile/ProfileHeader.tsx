import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ChevronLeft, Camera, Edit2, LogOut, Check, BadgeCheck, Home, Search, Bot,
    User
} from "lucide-react";
import type { ProfileData } from "../pages/ProfilePage";

interface Props {
    profile: ProfileData;
    isEditing: boolean;
    setIsEditing: (val: boolean) => void;
    onLogout: () => void;
    stats: { reviews: number, favorites: number, helpful: number };
}

export const ProfileHeader: React.FC<Props> = ({
    profile, isEditing, setIsEditing, onLogout, stats
}) => {
    const navigate = useNavigate();

    return (
        <section className="position-relative overflow-hidden" style={{ backgroundColor: '#0c0a09', color: 'white' }}>

            {/* 🔹 Background Pattern (ลายจุดแบบในดีไซน์) */}
            <div className="position-absolute w-100 h-100" style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
                backgroundSize: "40px 40px", top: 0, left: 0, zIndex: 1
            }}></div>

            {/* =========================================
          1. TOP NAVIGATION BAR (ถ่างซ้าย-ขวาสุด)
      ========================================= */}
            <div className="position-relative z-3 w-100 px-4 px-lg-5 pt-4 pt-lg-5 d-flex justify-content-between align-items-center">

                {/* 👈 Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-link text-white text-decoration-none d-flex align-items-center gap-3 p-0 transition-all opacity-75 hover-opacity-100"
                >
                    <div
                        className="rounded-circle d-flex align-items-center justify-content-center border"
                        style={{
                            width: '40px', height: '40px',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(8px)'
                        }}
                    >
                        <ChevronLeft size={20} />
                    </div>
                    <span className="d-none d-lg-block fw-medium text-white" style={{ fontSize: '0.95rem' }}>
                        กลับหน้าแรก
                    </span>
                </button>

                {/* 👉 Desktop Nav Links */}
                <div className="d-none d-lg-flex align-items-center gap-4">
                    <Link to="/" className="text-white text-decoration-none d-flex align-items-center gap-2 transition-all opacity-75 hover-opacity-100" style={{ fontSize: '0.9rem' }}>
                        <Home size={18} /> Home
                    </Link>
                    <Link to="/search" className="text-white text-decoration-none d-flex align-items-center gap-2 transition-all opacity-75 hover-opacity-100" style={{ fontSize: '0.9rem' }}>
                        <Search size={18} /> Search
                    </Link>
                    <Link to="/ai" className="text-white text-decoration-none d-flex align-items-center gap-2 transition-all opacity-75 hover-opacity-100" style={{ fontSize: '0.9rem' }}>
                        <Bot size={18} /> AI
                    </Link>

                    {/* Divider */}
                    <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.15)' }}></div>

                    {/* Profile Active Badge */}
                    <div
                        className="rounded-pill px-4 py-2 text-white fw-medium d-flex align-items-center justify-content-center"
                        style={{
                            fontSize: '0.9rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.15)'
                        }}
                    >
                        Profile
                    </div>
                </div>

                {/* 📱 Mobile Edit Button */}
                <div className="d-lg-none">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="btn text-white rounded-circle d-flex align-items-center justify-content-center border"
                        style={{
                            width: '40px', height: '40px',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderColor: 'rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        {isEditing ? <Check size={18} /> : <Edit2 size={18} />}
                    </button>
                </div>
            </div>

            {/* =========================================
          2. PROFILE INFO (ล็อกความกว้างตรงกลาง)
      ========================================= */}
            <div className="position-relative z-3 mx-auto px-4 px-lg-5 pt-4 pb-5 pt-lg-5 pb-lg-5 mb-lg-3" style={{ maxWidth: '1024px' }}>
                <div className="d-flex flex-column flex-lg-row align-items-center align-items-lg-end gap-4 gap-lg-5">

                    {/* Avatar */}
                    <div className="position-relative flex-shrink-0">
                        <img
                            src={profile.imageUrl}
                            alt={profile.name}
                            referrerPolicy="no-referrer"
                            className="rounded-circle object-fit-cover shadow-lg"
                            style={{ width: '144px', height: '144px', border: '4px solid rgba(255,255,255,0.1)' }}
                        />
                        <button className="btn btn-light rounded-circle position-absolute d-flex align-items-center justify-content-center p-0 shadow-sm" style={{ bottom: '4px', right: '4px', width: '36px', height: '36px' }}>
                            <Camera size={18} className="text-dark" />
                        </button>
                    </div>

                    {/* Info & Stats */}
                    <div className="flex-grow-1 text-center text-lg-start w-100">

                        {/* Name & Badge */}
                        {/* Name & Badge */}
                        <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3 mb-2">
                            <h1 className="fw-bold m-0 tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>{profile.name}</h1>
                            
                            {/* เช็กว่าเป็นอีเมลของ มข. หรือไม่ */}
                            {(profile.email?.endsWith('@kkumail.com') || profile.email?.endsWith('@kku.ac.th')) ? (
                                <span className="badge rounded-pill d-flex align-items-center gap-1 fw-bold" style={{ backgroundColor: '#10b981', fontSize: '0.75rem', padding: '0.35rem 0.6rem' }}>
                                    <BadgeCheck size={14} /> KKU
                                </span>
                            ) : (
                                <span className="badge rounded-pill d-flex align-items-center gap-1 fw-bold" style={{ backgroundColor: '#6b7280', fontSize: '0.75rem', padding: '0.35rem 0.6rem' }}>
                                    <User size={14} /> USER
                                </span>
                            )}
                        </div>
                        <p className="text-white-50 mb-0" style={{ fontSize: '1rem' }}>{profile.email}</p>

                        {/* Stats (จัดช่องไฟให้ห่างกำลังดี) */}
                        <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-4 gap-lg-5 mt-4 mt-lg-5 w-100">
                            <div className="text-center px-1">
                                <h3 className="fw-bold m-0 mb-1" style={{ fontSize: '1.75rem' }}>{stats.reviews}</h3>
                                <small className="text-white-50 fw-medium d-block text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '2px' }}>Reviews</small>
                            </div>
                            <div style={{ width: '1px', height: '35px', backgroundColor: 'rgba(255,255,255,0.15)' }}></div>
                            <div className="text-center px-1">
                                <h3 className="fw-bold m-0 mb-1" style={{ fontSize: '1.75rem' }}>{stats.favorites}</h3>
                                <small className="text-white-50 fw-medium d-block text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '2px' }}>Favorites</small>
                            </div>
                            <div style={{ width: '1px', height: '35px', backgroundColor: 'rgba(255,255,255,0.15)' }}></div>
                            <div className="text-center px-1">
                                <h3 className="fw-bold m-0 mb-1" style={{ fontSize: '1.75rem' }}>{stats.helpful}</h3>
                                <small className="text-white-50 fw-medium d-block text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '2px' }}>Helpful</small>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons (Desktop Only) */}
                    <div className="d-none d-lg-flex gap-3 flex-shrink-0 pb-1">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="btn text-white rounded-pill px-4 py-2 fw-medium d-flex align-items-center gap-2 transition-all hover-opacity-75"
                            style={{ border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'transparent' }}
                        >
                            {isEditing ? <Check size={16} /> : <Edit2 size={16} />} {isEditing ? "บันทึก" : "แก้ไข"}
                        </button>
                        <button
                            onClick={onLogout}
                            className="btn rounded-pill px-4 py-2 fw-medium d-flex align-items-center gap-2 transition-all hover-opacity-75"
                            style={{ border: '1px solid rgba(248, 113, 113, 0.3)', color: '#fca5a5', backgroundColor: 'transparent' }}
                        >
                            <LogOut size={16} /> ออกจากระบบ
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};