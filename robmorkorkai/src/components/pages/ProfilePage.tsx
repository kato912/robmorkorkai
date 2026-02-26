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

// --- Mock Data ---
const myReviews = [
    { id: "1", shopName: "Library Cafe KKU", shopImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300&q=80", rating: 5, comment: "บรรยากาศดีมาก WiFi แรง เหมาะกับการนั่งทำงาน ปลั๊กไฟทุกโต๊ะ กาแฟอร่อยด้วย แนะนำ Dirty Latte", date: "2 วันก่อน", helpful: 12 },
    { id: "2", shopName: "กังสดาล Coffee", shopImage: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=300&q=80", rating: 4, comment: "กาแฟอร่อย ราคานักศึกษา ชอบมาก บรรยากาศดี มีมุมนั่งทำงานแยกเงียบสงบ", date: "1 สัปดาห์ก่อน", helpful: 8 },
];

const favoriteShops = [
    { id: "1", name: "Library Cafe KKU", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300&q=80", rating: 4.8, category: "คาเฟ่", zone: "กังสดาล", reviews: 128 },
    { id: "2", name: "กังสดาล Coffee", image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=300&q=80", rating: 4.6, category: "คาเฟ่", zone: "กังสดาล", reviews: 89 },
];

const ProfilePage: React.FC = () => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    const [profile, setProfile] = useState<ProfileData>({
        name: user?.name || "สมชาย ใจดี",
        email: user?.email || "somchai@kkumail.com",
        imageUrl: user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300",
        role: user?.role || "USER",
        phone: "081-234-5678",
        isVerifiedStudent: user?.isVerifiedStudent || true
    });

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