/**
 * ShopSidebar Component
 * 
 * Sidebar displaying shop contact information and action buttons.
 * Typically positioned on the right side of the location section.
 * Features:
 * - Shop Address with map icon
 * - Operating Hours with status badge
 * - Rating Summary (average rating and review count)
 * - Action Buttons Section:
 *   - For logged-in users: Review, Favorite/Save, Share buttons
 *   - For guests: Login prompt with Google authentication
 * - Responsive layout for mobile and desktop
 * 
 * Props:
 * - shop: Shop object containing address, openHours
 * - averageRating: Shop's average rating (string or number)
 * - reviewsCount: Total number of reviews
 * - isLoggedIn: User authentication status
 * - isFavorited: Whether shop is currently favorited by user
 * - onToggleFavorite: Callback to toggle favorite status
 * - onOpenReviewModal: Callback to open review submission modal
 * 
 * Conditional Rendering:
 * - If isLoggedIn = true: Shows Review, Favorite, Share buttons
 * - If isLoggedIn = false: Shows login prompt with Google button
 * 
 * CSS Classes Used:
 * - shop-sidebar: Main sidebar container
 * - shop-info-card: Card container for contact info
 * - shop-info-item: Individual info row (address, hours, rating)
 * - shop-action-button: Button styling for contact actions
 * - shop-address: Address display styling
 * - shop-hours: Operating hours display styling
 * - shop-rating: Rating summary styling
 */
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Star, MessageSquare, Heart, Share2 } from "lucide-react";
import type { Shop } from "../../types/shop";
import "./css/ShopSidebar.css";

interface ShopSidebarProps {
    shop: Shop;
    averageRating: string | number;
    reviewsCount: number;
    isLoggedIn: boolean;
    isFavorited: boolean;
    onToggleFavorite: () => void;
    onOpenReviewModal: () => void;
    onShare: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ShopSidebar: React.FC<ShopSidebarProps> = ({
    shop, averageRating, reviewsCount, isLoggedIn, isFavorited, onToggleFavorite, onOpenReviewModal, onShare
}) => {
    return (
        // Sidebar container - Flexbox column layout for vertical stacking
        <div className="d-flex flex-column gap-4 w-100 h-100 justify-content-center">
            
            {/* Sidebar Title - "Shop Information and Contact" section header */}
            <h6 className="fw-bold text-uppercase tracking-wider mb-2" style={{ fontSize: '1rem', letterSpacing: '2px', color: '#c9943a' }}>ข้อมูลร้านและการติดต่อ</h6>
            
            {/* Shop Info Card - Container for address, hours, and rating info */}
            <div className="card rounded-4 p-1 shadow-sm border-0 bg-transparent">
                {/* Info Items Container - Flexbox for vertical stacking */}
                <div className="d-flex flex-column gap-4">
                    
                    {/* Address Info - Location and address display */}
                    <div className="d-flex gap-3 align-items-center">
                        {/* Map Icon - Visual indicator for address section */}
                        <div className="rounded-circle p-3 flex-shrink-0 d-flex align-items-center justify-content-center shadow-sm" style={{ backgroundColor: '#2d2320', width: '56px', height: '56px', border: '1px solid #3d302a' }}>
                            <MapPin size={24} style={{ color: '#e8b94a' }} />
                        </div>
                        {/* Address Details */}
                        <div>
                            <p className="fw-bold m-0 mb-1" style={{ color: '#f5ebe4', fontSize: '1rem' }}>ที่ตั้ง</p>
                            <p className="m-0" style={{ fontSize: '0.95rem', color: '#9a8a7e' }}>{shop.address ? `${shop.address}` : "ไม่มีข้อมูล"}</p>
                        </div>
                    </div>

                    {/* Operating Hours Info - Hours and status badge */}
                    <div className="d-flex gap-3 align-items-center">
                        {/* Clock Icon - Visual indicator for hours section */}
                        <div className="rounded-circle p-3 flex-shrink-0 d-flex align-items-center justify-content-center shadow-sm" style={{ backgroundColor: '#2d2320', width: '56px', height: '56px', border: '1px solid #3d302a' }}>
                            <Clock size={24} style={{ color: '#e8b94a' }} />
                        </div>
                        {/* Hours Details with Status Badge */}
                        <div>
                            <p className="fw-bold m-0 mb-1" style={{ color: '#f5ebe4', fontSize: '1rem' }}>เวลาทำการ</p>
                            <div className="d-flex align-items-center gap-2">
                                {/* Operating Hours Time */}
                                <p className="m-0" style={{ fontSize: '0.95rem', color: '#9a8a7e' }}>{shop.openHours}</p>
                                {/* Status Badge - Shows "Open" status (could be made dynamic with actual status check) */}
                                <span className="badge rounded-pill px-2 py-1" style={{ fontSize: '0.7rem', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                    เปิดอยู่
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Rating Summary - Average rating and review count */}
                    <div className="d-flex gap-3 align-items-center">
                        {/* Star Icon - Visual indicator for rating section */}
                        <div className="rounded-circle p-3 flex-shrink-0 d-flex align-items-center justify-content-center shadow-sm" style={{ backgroundColor: '#2d2320', width: '56px', height: '56px', border: '1px solid #3d302a' }}>
                            <Star size={24} style={{ color: '#e8b94a' }} />
                        </div>
                        {/* Rating Details */}
                        <div>
                            <p className="fw-bold m-0 mb-1" style={{ color: '#f5ebe4', fontSize: '1rem' }}>คะแนนรีวิว</p>
                            <p className="m-0" style={{ fontSize: '0.95rem', color: '#9a8a7e' }}>{averageRating} / 5 <span style={{fontSize: '0.85rem'}}>({reviewsCount} รีวิว)</span></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons Section - Review, Favorite, Share or Login prompt */}
            <div className="mt-2">
                {/* Conditional rendering based on login status */}
                {isLoggedIn ? (
                    // Logged-in User Action Buttons
                    <div className="d-flex gap-2 w-100 flex-wrap flex-sm-nowrap">
                        {/* Review Button - Opens review submission modal */}
                        <button onClick={onOpenReviewModal} className="btn flex-grow-1 rounded-pill py-3 fw-bold d-flex justify-content-center align-items-center gap-2 hover-scale shadow-sm border-0" style={{ backgroundColor: '#A73B24', color: '#fff5f0', fontSize: '0.9rem' }}>
                            <MessageSquare size={18} /> รีวิว
                        </button>
                        
                        {/* Favorite/Save Button - Toggles favorite status with visual feedback */}
                        <button 
                            onClick={onToggleFavorite} 
                            className="btn flex-grow-1 rounded-pill py-3 fw-bold d-flex justify-content-center align-items-center gap-2 transition-all hover-scale shadow-sm"
                            style={{ 
                                backgroundColor: isFavorited ? 'rgba(167, 59, 36, 0.15)' : '#2d2320', 
                                color: isFavorited ? '#A73B24' : '#e8b94a', 
                                border: isFavorited ? '1px solid #A73B24' : '1px solid #3d302a',
                                fontSize: '0.9rem'
                            }}
                        >
                            <Heart size={18} className={isFavorited ? "fill-danger" : ""} style={{ color: isFavorited ? '#A73B24' : '#e8b94a' }} /> 
                            {isFavorited ? "บันทึกแล้ว" : "บันทึก"}
                        </button>

                        {/* Share Button - Opens share functionality */}
                        <button onClick={onShare} className="btn rounded-pill px-4 hover-scale shadow-sm flex-shrink-0" title="แชร์ร้านนี้" style={{ backgroundColor: '#2d2320', color: '#e8b94a', border: '1px solid #3d302a' }}>
                            <Share2 size={18} />
                        </button>
                    </div>
                ) : (
                    // Guest User Section - Login prompt with Google authentication
                    <div className="card rounded-4 p-4 text-center shadow-sm" style={{ backgroundColor: '#231c18', border: '1px dashed rgba(201, 148, 58, 0.4)' }}>
                        {/* Informational Message */}
                        <p className="mb-4" style={{ color: '#9a8a7e', fontSize: '0.95rem' }}>เข้าสู่ระบบเพื่อรีวิวร้านค้าและบันทึกร้านโปรด</p>
                        {/* Google Login Button */}
                        <Link to="/login" className="btn w-100 rounded-pill py-3 fw-bold hover-scale shadow-sm" style={{ backgroundColor: '#e8b94a', color: '#1a1412' }}>
                            เข้าสู่ระบบด้วย Google
                        </Link>
                    </div>
                )}
            </div>
            
        </div>
    );
};