/**
 * ShopHero Component
 * 
 * Displays a full-height, immersive hero section for the shop detail page.
 * Features:
 * - Background image with gradient overlay for visual hierarchy
 * - Top navigation (back button, desktop nav links, mobile action buttons)
 * - Shop name, description, and category badges
 * - Rating display with star icons and review count
 * - Location zone and operating hours
 * - Favorite toggle and share buttons
 * 
 * Props:
 * - shop: Shop object containing cover image, name, description, category, zone, openHours
 * - averageRating: Calculated average shop rating (displayed as number)
 * - reviewsCount: Total number of reviews for the shop
 * - isLoggedIn: User authentication status (controls nav display and buttons)
 * - user: Authenticated user object (contains profile image for nav)
 * - isFavorited: Whether the shop is in user's favorites
 * - onToggleFavorite: Callback to toggle favorite status
 */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Home, Search, Bot, Heart, Share2, Star, MapPin, Clock } from "lucide-react";
import type { Shop } from "../../types/shop";
import "./css/ShopHero.css";

interface ShopHeroProps {
    shop: Shop;
    averageRating: string | number;
    reviewsCount: number;
    isLoggedIn: boolean;
    user: any;
    isFavorited: boolean;
    onToggleFavorite: () => void;
}

export const ShopHero: React.FC<ShopHeroProps> = ({
    shop, averageRating, reviewsCount, isLoggedIn, user, isFavorited, onToggleFavorite
}) => {
    const navigate = useNavigate();

    return (
        // Hero container with absolute positioning for overlays (image, gradient, nav, content)
        <section className="shop-hero-section position-relative overflow-hidden w-100 bg-dark">
            {/* Background image - uses cover image if available, falls back to main image, then default */}
            <img src={shop.coverImage || shop.image || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"} alt={shop.name} className="w-100 h-100 hero-image" />
            {/* Dark gradient overlay to ensure text readability over image */}
            <div className="position-absolute top-0 start-0 w-100 h-100 hero-gradient"></div>

            {/* Top Navigation */}
            <div className="position-absolute top-0 start-0 w-100 pt-4 px-4 px-lg-5 d-flex justify-content-between align-items-center hero-nav-container">
                <button onClick={() => navigate(-1)} className="btn btn-link text-white text-decoration-none d-flex align-items-center gap-3 p-0 opacity-75 hover-opacity-100 transition-all" title="Go back" aria-label="Go back">
                    <div className="rounded-circle p-2 d-flex align-items-center justify-content-center back-button">
                        <ChevronLeft size={20} />
                    </div>
                    <span className="d-none d-lg-block small fw-medium text-white tracking-wide">กลับหน้าแรก</span>
                </button>

                {/* Desktop Nav */}
                <nav className="d-none d-lg-flex align-items-center gap-4">
                    <Link to="/" className="text-decoration-none d-flex align-items-center gap-2 small fw-medium nav-link-hover px-4 py-2 rounded-pill"><Home size={18} /> Home</Link>
                    <Link to="/search" className="text-decoration-none d-flex align-items-center gap-2 small fw-medium nav-link-hover px-4 py-2 rounded-pill"><Search size={18} /> Search</Link>
                    <Link to="/ai" className="text-decoration-none d-flex align-items-center gap-2 small fw-medium nav-link-hover px-4 py-2 rounded-pill"><Bot size={18} /> AI</Link>
                    <div className="nav-divider"></div>
                    {isLoggedIn ? (
                        <Link to="/profile">
                            <img src={user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100"} className="rounded-circle border border-2 border-white opacity-90 hover-opacity-100 transition-all object-fit-cover" width="36" height="36" alt="Profile" />
                        </Link>
                    ) : (
                        <Link to="/login" className="btn btn-light rounded-pill px-4 btn-sm fw-bold">เข้าสู่ระบบ</Link>
                    )}
                </nav>

                {/* Mobile Action Buttons - Favorite and Share (hidden on desktop) */}
                <div className="d-lg-none d-flex gap-2">
                    <button onClick={onToggleFavorite} className="btn rounded-circle p-2 d-flex align-items-center justify-content-center text-white hero-mobile-btn" title={isFavorited ? "Remove from favorites" : "Add to favorites"} aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}>
                        <Heart size={20} className={isFavorited ? "fill-danger text-danger" : ""} />
                    </button>
                    <button className="btn rounded-circle p-2 d-flex align-items-center justify-content-center text-white hero-mobile-btn" title="Share" aria-label="Share"><Share2 size={20} /></button>
                </div>
            </div>

            {/* Hero Content Section - Positioned at bottom with absolute positioning */}
            <div className="position-absolute bottom-0 start-0 w-100 px-4 px-lg-5 pb-5 hero-content-bottom">
                {/* Category and Status Badges */}
                <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                    <span className="badge rounded-pill hero-badge">{shop.category}</span>
                    {/* Status badge - shows "Open" status (could be made dynamic) */}
                    <span className="badge rounded-pill hero-badge-green">เปิดอยู่</span>
                </div>
                {/* Shop Name - Main headline with responsive sizing */}
                <h1 className="fw-bolder mb-3 tracking-tight hero-title">{shop.name}</h1>
                {/* Shop Description - Falls back to default message if not provided */}
                <p className="text-white opacity-75 mb-4 lh-base fw-light hero-description">
                    {shop.description || "ไม่มีคำอธิบายร้านค้า แต่คุณสามารถดูรีวิวจากนักศึกษา มข. คนอื่นๆได้"}
                </p>
                {/* Shop Info Display - Rating, Zone, Hours with responsive visibility */}
                <div className="d-flex flex-wrap align-items-center gap-3 gap-lg-4 text-white-50 small fw-medium hero-info-container">
                    {/* Rating Summary - Always visible */}
                    <div className="d-flex align-items-center gap-2 text-white">
                        <Star size={18} className="fill-warning text-warning" />
                        <span className="fw-bold fs-5">{averageRating}</span>
                        <span className="review-count-text">({reviewsCount} รีวิว)</span>
                    </div>
                    {/* Divider - Hidden on mobile for space */}
                    <div className="d-none d-sm-block hero-info-divider"></div>
                    {/* Zone/Location Info */}
                    <div className="d-flex align-items-center gap-2 text-white opacity-75"><MapPin size={18} /> <span>{shop.zone}</span></div>
                    {/* Divider - Hidden on mobile for space */}
                    <div className="d-none d-sm-block hero-info-divider"></div>
                    {/* Operating Hours - Hidden on small screens */}
                    <div className="d-none d-sm-flex align-items-center gap-2 text-white opacity-75"><Clock size={18} /> <span>{shop.openHours}</span></div>
                </div>
            </div>
        </section>
    );
};