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

export interface ProfileData {
    name: string; email: string; imageUrl: string; role: string; phone?: string; isVerifiedStudent: boolean;
}

// ฟังก์ชัน format วันที่เป็น relative time
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
    const [isLoadingReviews, setIsLoadingReviews] = useState(false);
    const [isLoadingFavorites, setIsLoadingFavorites] = useState(false);

    const [profile, setProfile] = useState<ProfileData>({
        name: user?.name || "สมชาย ใจดี",
        email: user?.email || "somchai@kkumail.com",
        imageUrl: user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300",
        role: user?.role || "USER",
        phone: "081-234-5678",
        isVerifiedStudent: user?.isVerifiedStudent || true
    });

    // ดึง Favorites จาก API
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                setIsLoadingFavorites(true);
                const response = await fetch("http://localhost:3000/api/user/favorites", {
                    credentials: "include"
                });
                if (!response.ok) throw new Error("Failed to fetch favorites");
                const data = await response.json();
                // Map API response ให้ตรงกับ format ของ MyStoreList
                const formatted = data.map((shop: any) => ({
                    id: shop.id,
                    name: shop.name,
                    image: shop.coverImage || shop.image,
                    rating: shop.ratingAvg || 0,
                    category: shop.type || shop.category,
                    zone: shop.zone,
                    reviews: shop.reviewCount || 0
                }));
                setFavoriteShops(formatted);
            } catch (error) {
                console.error("Error fetching favorites:", error);
                setFavoriteShops([]);
            } finally {
                setIsLoadingFavorites(false);
            }
        };

        fetchFavorites();
    }, []);

    // ดึง Reviews จาก API
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setIsLoadingReviews(true);
                const response = await api.get("/api/user/reviews");
                const data = response.data;
                // Map API response ให้ตรงกับ format ของ MyStoreList
                const formatted = data.map((review: any) => ({
                    id: review.id,
                    shopName: review.name,
                    shopImage: review.coverImage || review.image,
                    rating: review.userReview.rating,
                    comment: review.userReview.comment,
                    date: formatRelativeTime(review.userReview.createdAt),
                    helpful: 0 // ยังไม่มี helpful count ในระบบ
                }));
                setMyReviews(formatted);
            } catch (error) {
                console.error("Error fetching reviews:", error);
                setMyReviews([]);
            } finally {
                setIsLoadingReviews(false);
            }
        };

        fetchReviews();
    }, []);

    useEffect(() => {
        if (user) {
            setProfile(prev => ({ ...prev, name: user.name || prev.name, email: user.email || prev.email, imageUrl: user.image || prev.imageUrl }));
        }
    }, [user]);

    const handleLogout = () => {
        AlertUtils.confirm("คุณต้องการออกจากระบบใช่หรือไม่?", "", "ยืนยัน", "ยกเลิก").then((c) => {
            if (c) { logout(); navigate("/login"); }
        });
    };

    const handleSave = async () => {
        if (!isEditing) { setIsEditing(true); return; }
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
        <div className="min-vh-100" style={{ backgroundColor: '#1a1412', fontFamily: 'Inter, sans-serif' }}>
            <ProfileHeader
                profile={profile}
                isEditing={isEditing}
                setIsEditing={(val) => { if (isEditing) handleSave(); else setIsEditing(val); }}
                onLogout={handleLogout}
                stats={{ reviews: myReviews.length, favorites: favoriteShops.length, helpful: 35 }}
            />
            <main className="container" style={{ maxWidth: '900px', paddingBottom: '90px' }}>
                {isEditing && <ProfileEditForm profile={profile} setProfile={setProfile} />}
                <MyStoreList reviews={myReviews} favorites={favoriteShops} />
            </main>
            <div className="d-lg-none">
                <BottomNav activePage="profile" />
            </div>
        </div>
    );
};

export default ProfilePage;