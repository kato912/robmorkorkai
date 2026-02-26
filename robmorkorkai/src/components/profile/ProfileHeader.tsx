import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Edit2, LogOut, Check, BadgeCheck, Home, Search, Bot, User } from "lucide-react";
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
        <section className="position-relative overflow-hidden" style={{ 
            backgroundColor: '#231c18', 
            background: 'radial-gradient(circle at center, #3d302a 0%, #231c18 50%, #1a1412 100%)', /* ปรับความสว่างตรงกลางให้เนียนขึ้น */
            borderBottom: '1px solid #3d302a', 
            color: '#f5ebe4' 
        }}>
            
            {/* Background Pattern */}
            <div className="position-absolute w-100 h-100" style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, rgba(201,148,58,0.1) 1px, transparent 0)",
                backgroundSize: "40px 40px", top: 0, left: 0, zIndex: 1
            }}></div>

            {/* Top Navigation */}
            <div className="position-relative z-3 w-100 px-4 px-lg-5 pt-4 pt-lg-5 d-flex justify-content-between align-items-center">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-link text-decoration-none d-flex align-items-center gap-3 p-0 transition-all opacity-75 hover-opacity-100"
                    style={{ color: '#f5ebe4' }}
                >
                    <div
                        className="rounded-circle d-flex align-items-center justify-content-center border"
                        style={{
                            width: '40px', height: '40px',
                            backgroundColor: 'rgba(201, 148, 58, 0.05)',
                            borderColor: 'rgba(201, 148, 58, 0.2)',
                            backdropFilter: 'blur(8px)',
                            color: '#e8b94a'
                        }}
                    >
                        <ChevronLeft size={20} />
                    </div>
                    <span className="d-none d-lg-block fw-medium" style={{ fontSize: '0.95rem' }}>
                        กลับหน้าแรก
                    </span>
                </button>

                <div className="d-none d-lg-flex align-items-center gap-4">
                    <Link to="/" className="text-decoration-none d-flex align-items-center gap-2 transition-all opacity-75 hover-opacity-100" style={{ fontSize: '0.9rem', color: '#f5ebe4' }}>
                        <Home size={18} /> Home
                    </Link>
                    <Link to="/search" className="text-decoration-none d-flex align-items-center gap-2 transition-all opacity-75 hover-opacity-100" style={{ fontSize: '0.9rem', color: '#f5ebe4' }}>
                        <Search size={18} /> Search
                    </Link>
                    <Link to="/ai" className="text-decoration-none d-flex align-items-center gap-2 transition-all opacity-75 hover-opacity-100" style={{ fontSize: '0.9rem', color: '#f5ebe4' }}>
                        <Bot size={18} /> AI
                    </Link>
                    <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(201,148,58,0.2)' }}></div>
                    <div
                        className="rounded-pill px-4 py-2 fw-medium d-flex align-items-center justify-content-center"
                        style={{
                            fontSize: '0.9rem',
                            backgroundColor: 'rgba(201, 148, 58, 0.1)',
                            border: '1px solid rgba(201, 148, 58, 0.2)',
                            color: '#e8b94a'
                        }}
                    >
                        Profile
                    </div>
                </div>

                {/* Mobile Top Buttons */}
                <div className="d-lg-none d-flex gap-2">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="btn rounded-circle d-flex align-items-center justify-content-center border"
                        style={{ width: '40px', height: '40px', backgroundColor: 'rgba(201, 148, 58, 0.05)', borderColor: 'rgba(201, 148, 58, 0.2)', color: '#e8b94a' }}
                    >
                        {isEditing ? <Check size={18} /> : <Edit2 size={18} />}
                    </button>
                    <button
                        onClick={onLogout}
                        className="btn rounded-circle d-flex align-items-center justify-content-center border"
                        style={{ width: '40px', height: '40px', backgroundColor: 'rgba(167, 59, 36, 0.05)', borderColor: 'rgba(167, 59, 36, 0.2)', color: '#A73B24' }}
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>

            {/* Profile Content Container */}
            <div className="position-relative z-3 mx-auto px-4 px-lg-5 pt-4 pb-5 pt-lg-5 pb-lg-5 mb-lg-3" style={{ maxWidth: '1024px' }}>
                
                <div className="d-flex flex-column flex-lg-row align-items-center gap-4 gap-lg-5">
                    
                    {/* Avatar (ซ้าย) */}
                    <div className="position-relative flex-shrink-0">
                        <img
                            src={profile.imageUrl}
                            alt={profile.name}
                            referrerPolicy="no-referrer"
                            className="rounded-circle object-fit-cover shadow-lg"
                            style={{ width: '144px', height: '144px', border: '4px solid #3d302a' }}
                        />
                    </div>

                    {/* Content Area (ขวา) */}
                    <div className="flex-grow-1 w-100">
                        
                        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center align-items-lg-center mb-4">
                            
                            {/* Name & Email */}
                            <div className="text-center text-lg-start mb-3 mb-lg-0">
                                <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3 mb-2">
                                    <h1 className="fw-bold m-0 tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', color: '#f5ebe4' }}>{profile.name}</h1>
                                    {(profile.email?.endsWith('@kkumail.com') || profile.email?.endsWith('@kku.ac.th')) ? (
                                        <span className="badge rounded-pill d-flex align-items-center gap-1 fw-bold" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', fontSize: '0.75rem', padding: '0.35rem 0.6rem' }}>
                                            <BadgeCheck size={14} /> KKU
                                        </span>
                                    ) : (
                                        <span className="badge rounded-pill d-flex align-items-center gap-1 fw-bold" style={{ backgroundColor: '#2d2320', color: '#9a8a7e', border: '1px solid #3d302a', fontSize: '0.75rem', padding: '0.35rem 0.6rem' }}>
                                            <User size={14} /> USER
                                        </span>
                                    )}
                                </div>
                                <p className="mb-0" style={{ fontSize: '1rem', color: '#9a8a7e' }}>{profile.email}</p>
                            </div>

                            {/* Action Buttons (Desktop Only) */}
                            <div className="d-none d-lg-flex gap-3 mt-2">
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="btn rounded-pill px-4 py-2 fw-medium d-flex align-items-center gap-2 transition-all hover-opacity-75"
                                    style={{ backgroundColor: '#2d2320', color: '#e8b94a', border: '1px solid #3d302a', fontSize: '0.9rem' }}
                                >
                                    {isEditing ? <Check size={16} /> : <Edit2 size={16} />} {isEditing ? "บันทึก" : "แก้ไข"}
                                </button>
                                <button
                                    onClick={onLogout}
                                    className="btn rounded-pill px-4 py-2 fw-medium d-flex align-items-center gap-2 transition-all hover-opacity-75"
                                    style={{ backgroundColor: 'transparent', color: '#A73B24', border: '1px solid rgba(167, 59, 36, 0.4)', fontSize: '0.9rem' }}
                                >
                                    <LogOut size={16} /> ออกจากระบบ
                                </button>
                            </div>
                        </div>

                        {/* Bottom Row (Stats) */}
                        <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-4 gap-lg-5 w-100">
                            <div className="text-center px-1">
                                <h3 className="fw-bold m-0 mb-1" style={{ fontSize: '1.75rem', color: '#e8b94a' }}>{stats.reviews}</h3>
                                <small className="fw-medium d-block text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '2px', color: '#8a7b72' }}>Reviews</small>
                            </div>
                            <div style={{ width: '1px', height: '35px', backgroundColor: 'rgba(201,148,58,0.2)' }}></div>
                            <div className="text-center px-1">
                                <h3 className="fw-bold m-0 mb-1" style={{ fontSize: '1.75rem', color: '#e8b94a' }}>{stats.favorites}</h3>
                                <small className="fw-medium d-block text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '2px', color: '#8a7b72' }}>Favorites</small>
                            </div>
                            <div style={{ width: '1px', height: '35px', backgroundColor: 'rgba(201,148,58,0.2)' }}></div>
                            <div className="text-center px-1">
                                <h3 className="fw-bold m-0 mb-1" style={{ fontSize: '1.75rem', color: '#e8b94a' }}>{stats.helpful}</h3>
                                <small className="fw-medium d-block text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '2px', color: '#8a7b72' }}>Helpful</small>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};