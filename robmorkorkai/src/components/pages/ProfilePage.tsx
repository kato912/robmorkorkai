/**
 * ProfilePage Component
 *
 * Main profile page displays user information, edit form, and user activity.
 * Features:
 * - Profile header with avatar, name, and statistics
 * - Edit form for user information (name, phone)
 * - Reviews list - all reviews written by the user
 * - Favorites list - all favorite shops saved by user
 * - Edit/Save functionality with API integration
 * - Logout confirmation dialog
 * - Responsive design for mobile and desktop
 *
 * State:
 * - isEditing: Whether user is in edit mode
 * - myReviews: Array of user's reviews from API
 * - favoriteShops: Array of user's favorite shops from API
 * - profile: Current user profile data (name, email, phone, image)
 *
 * API Endpoints:
 * - GET /api/user/favorites - Fetch user's favorite shops
 * - GET /api/user/reviews - Fetch user's reviews
 * - PATCH /api/user/update - Update user profile information
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AlertUtils } from "../../utils/alertUtils";
import api from "../../services/api";

// Components
import { ProfileHeader } from "../profile/ProfileHeader";
import { ProfileEditForm } from "../profile/ProfileInfoCard";
import { MyStoreList } from "../profile/MyStoreList";
import { BottomNav } from "../../components/layout/BottomNav";
import "./css/ProfilePage.css";

const API_BASE = import.meta.env.VITE_API_URL;

export interface ProfileData {
    name: string;
    email: string;
    imageUrl: string;
    role: string;
    phone?: string;
    isVerifiedStudent: boolean;
}

/**
 * Format relative time for review display
 * Converts absolute timestamp to human-readable format (e.g., "2 hours ago")
 * 
 * @param date - Timestamp to format
 * @returns Formatted relative time string in Thai
 */
const formatRelativeTime = (date: string | Date): string => {
    const now = new Date();
    const reviewDate = new Date(date);
    const diffMs = now.getTime() - reviewDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "เมื่อสักครู่";
    if (diffMins < 60) return `${diffMins} นาทีที่แล้ว`;
    if (diffHours < 24) return `${diffHours} ชั่วโมงที่แล้ว`;
    if (diffDays < 30) return `${diffDays} วันที่แล้ว`;
    
    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks < 4) return `${diffWeeks} สัปดาห์ที่แล้ว`;
    
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} เดือนที่แล้ว`;
};

const ProfilePage: React.FC = () => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [myReviews, setMyReviews] = useState<any[]>([]);
    const [favoriteShops, setFavoriteShops] = useState<any[]>([]);

    /**
     * Format user image URL to be CORS-safe
     * Adds cache busting parameter for retries
     */
    const formatImageUrl = (url: string | undefined | null): string => {
        if (!url) return "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80";
        // Add cache busting parameter to force reload
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}t=${Date.now()}`;
    };

    /**
     * Ensure shop image URL is valid and use proxy endpoint to avoid rate limiting
     */
    const getShopImageUrl = (coverImage?: string, image?: string): string => {
        const fallbackUrl = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80';
        const url = coverImage || image;
        if (!url || url.trim() === '') {
            return fallbackUrl;
        }
        // Use proxy endpoint to avoid rate limiting and CORS issues
        return `${API_BASE}/api/images/proxy?url=${encodeURIComponent(url)}`;
    };

    const [profile, setProfile] = useState<ProfileData>({
        name: user?.name || "สมชาย ใจดี",
        email: user?.email || "somchai@kkumail.com",
        imageUrl: formatImageUrl(user?.image),
        role: user?.role || "USER",
        phone: "081-234-5678",
        isVerifiedStudent: user?.isVerifiedStudent || true
    });

    /**
     * Fetch user's favorite shops from API on component mount
     * Maps API response to match MyStoreList component format
     */
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/user/favorites`, {
                    credentials: "include"
                });
                if (!response.ok) throw new Error("Failed to fetch favorites");
                const data = await response.json();
                // Transform API data to component format
                const formatted = data.map((shop: any) => {
                    const imageUrl = getShopImageUrl(shop.coverImage, shop.image);
                    return {
                        id: shop.id,
                        shopName: shop.name,
                        image: imageUrl,
                        rating: shop.ratingAvg || 0,
                        category: shop.type || shop.category,
                        zone: shop.zone,
                        reviews: shop.reviewCount || 0
                    };
                });
                setFavoriteShops(formatted);
            } catch (error) {
                setFavoriteShops([]);
            }
        };

        fetchFavorites();
    }, []);

    /**
     * Fetch user's reviews from API on component mount
     * Maps API response to match MyStoreList component format
     */
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await api.get("/api/user/reviews");
                const data = response.data;
                // Transform API data to component format with relative time formatting
                const formatted = data.map((review: any) => {
                    const imageUrl = getShopImageUrl(review.coverImage, review.image);
                    return {
                        id: review.id,
                        shopName: review.name,
                        shopImage: imageUrl,
                        rating: review.userReview.rating,
                        comment: review.userReview.comment,
                        date: formatRelativeTime(review.userReview.createdAt)
                    };
                });
                setMyReviews(formatted);
            } catch (error) {
                console.error("Error fetching reviews:", error);
                setMyReviews([]);
            }
        };

        fetchReviews();
    }, []);

    /**
     * Sync profile state with authenticated user data
     * Updates whenever user context changes
     */
    useEffect(() => {
        if (user) {
            setProfile(prev => ({
                ...prev,
                name: user.name || prev.name,
                email: user.email || prev.email,
                imageUrl: formatImageUrl(user.image) || prev.imageUrl
            }));
        }
    }, [user]);

    /**
     * Handle logout with confirmation dialog
     * Shows alert before destroying user session
     */
    const handleLogout = () => {
        AlertUtils.confirm("คุณต้องการออกจากระบบใช่หรือไม่?", "", "ยืนยัน", "ยกเลิก").then((c) => {
            if (c) {
                logout();
                navigate("/");
            }
        });
    };

    /**
     * Handle profile save on edit form submission
     * Sends updated name to API and updates local state
     */
    const handleSave = async () => {
        if (!isEditing) {
            setIsEditing(true);
            return;
        }
        try {
            AlertUtils.loading("กำลังบันทึกข้อมูล...");
            const response = await api.patch('/api/user/update', { name: profile.name });
            AlertUtils.success("บันทึกข้อมูลสำเร็จ!");
            updateUser(response.data);
            setIsEditing(false);
        } catch (error) {
            AlertUtils.error("บันทึกข้อมูลไม่สำเร็จ!", "กรุณาลองใหม่อีกครั้ง");
        }
    };

    return (
        <div className="profile-page-container">
            {/* Profile Header Section */}
            <ProfileHeader
                profile={profile}
                isEditing={isEditing}
                setIsEditing={(val) => { if (isEditing) handleSave(); else setIsEditing(val); }}
                onLogout={handleLogout}
                stats={{
                    reviews: myReviews.length,
                    favorites: favoriteShops.length
                }}
            />

            {/* Main Content Area */}
            <main className="profile-page-main">
                {/* Edit Form - Shows only when in edit mode */}
                {isEditing && <ProfileEditForm profile={profile} setProfile={setProfile} />}

                {/* Reviews and Favorites Tabs */}
                <MyStoreList reviews={myReviews} favorites={favoriteShops} />
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="d-lg-none">
                <BottomNav activePage="profile" />
            </div>
        </div>
    );
};

export default ProfilePage;