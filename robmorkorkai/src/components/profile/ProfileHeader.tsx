/**
 * ProfileHeader Component
 *
 * Displays user profile information with avatar, name, email, and statistics.
 * Features:
 * - Radial gradient background with dot pattern overlay
 * - Responsive avatar display
 * - User name with KKU verification badge
 * - Statistics display (reviews, favorites, helpful count)
 * - Edit and logout buttons
 * - Sticky desktop navigation bar
 * - Mobile action buttons
 *
 * Props:
 * - profile: User profile data (name, email, image, role, phone)
 * - isEditing: Whether user is in edit mode
 * - setIsEditing: Callback to toggle edit mode
 * - onLogout: Callback for logout action
 * - stats: User statistics (reviews count, favorites count, helpful count)
 *
 * CSS Classes Used:
 * - profile-header-section: Main section container
 * - profile-header-nav: Navigation bar
 * - profile-avatar: User profile picture
 * - profile-name: User full name
 * - profile-stats: Statistics container
 * - profile-button: Action buttons (edit, logout)
 */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Edit2, LogOut, Check, BadgeCheck, Home, Search, Bot, User } from "lucide-react";
import type { ProfileData } from "../pages/ProfilePage";
import "./css/ProfileHeader.css";

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
        <section className="profile-header-section">
            {/* Background Pattern - Subtle dot grid overlay */}
            <div className="profile-header-pattern"></div>

            {/* Top Navigation Bar - Back button and desktop nav */}
            <div className="profile-header-nav">
                {/* Back Button - Navigate to previous page */}
                <button onClick={() => navigate(-1)} className="profile-back-button">
                    <div className="profile-back-icon">
                        <ChevronLeft size={20} />
                    </div>
                    <span className="profile-back-text">กลับหน้าแรก</span>
                </button>

                {/* Desktop Navigation Links - Only visible on lg+ screens */}
                <div className="profile-desktop-nav">
                    <Link to="/" className="profile-nav-link">
                        <Home size={18} /> Home
                    </Link>
                    <Link to="/search" className="profile-nav-link">
                        <Search size={18} /> Search
                    </Link>
                    <Link to="/ai" className="profile-nav-link">
                        <Bot size={18} /> AI
                    </Link>
                    <div className="profile-nav-divider"></div>
                    <div className="profile-badge">Profile</div>
                </div>

                {/* Mobile Action Buttons - Edit and logout (small screens only) */}
                <div className="profile-mobile-actions">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="profile-icon-button profile-icon-button-edit"
                    >
                        {isEditing ? <Check size={18} /> : <Edit2 size={18} />}
                    </button>
                    <button onClick={onLogout} className="profile-icon-button profile-icon-button-logout">
                        <LogOut size={18} />
                    </button>
                </div>
            </div>

            {/* Profile Content Container */}
            <div className="profile-header-content">
                <div className="profile-layout">
                    {/* Avatar Section - Left side profile picture */}
                    <div className="profile-avatar-container">
                        <img
                            src={profile.imageUrl}
                            alt={profile.name}
                            referrerPolicy="no-referrer"
                            className="profile-avatar"
                        />
                    </div>

                    {/* Main Content Area - Right side with name and stats */}
                    <div className="profile-main-content">
                        {/* Header Top Row - Name section and action buttons */}
                        <div className="profile-header-top">
                            {/* Name and Badge Section */}
                            <div className="profile-name-section">
                                <div className="profile-name-badge">
                                    <h1 className="profile-name">{profile.name}</h1>
                                    {/* KKU Verification Badge or User Badge */}
                                    {(profile.email?.endsWith('@kkumail.com') || profile.email?.endsWith('@kku.ac.th')) ? (
                                        <span className="profile-kku-badge">
                                            <BadgeCheck size={14} /> KKU
                                        </span>
                                    ) : (
                                        <span className="profile-user-badge">
                                            <User size={14} /> USER
                                        </span>
                                    )}
                                </div>
                                <p className="profile-email">{profile.email}</p>
                            </div>

                            {/* Action Buttons - Edit and logout (desktop only) */}
                            <div className="profile-action-buttons">
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="profile-button profile-button-edit"
                                >
                                    {isEditing ? <Check size={16} /> : <Edit2 size={16} />}
                                    {isEditing ? "บันทึก" : "แก้ไข"}
                                </button>
                                <button onClick={onLogout} className="profile-button profile-button-logout">
                                    <LogOut size={16} /> ออกจากระบบ
                                </button>
                            </div>
                        </div>

                        {/* Stats Section - Reviews, favorites, helpful count */}
                        <div className="profile-stats">
                            <div className="profile-stat-item">
                                <h3 className="profile-stat-number">{stats.reviews}</h3>
                                <small className="profile-stat-label">Reviews</small>
                            </div>
                            <div className="profile-stat-divider"></div>
                            <div className="profile-stat-item">
                                <h3 className="profile-stat-number">{stats.favorites}</h3>
                                <small className="profile-stat-label">Favorites</small>
                            </div>
                            <div className="profile-stat-divider"></div>
                            <div className="profile-stat-item">
                                <h3 className="profile-stat-number">{stats.helpful}</h3>
                                <small className="profile-stat-label">Helpful</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};