import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import Components ย่อย
import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { ProfileInfoCard } from "../../components/profile/ProfileInfoCard";
import { MyStoreList } from "../../components/profile/MyStoreList";
import { BottomNav } from "../../components/layout/BottomNav";
import { TopNavbar } from "../../components/layout/TopNavbar";
import { AlertUtils } from "../../utils/alertUtils";

//data
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api"; // <-- Add this line to import your api instance

// Interface ตัด phone ออก
export interface ProfileData {
    name: string;
    email: string;
    imageUrl: string;
    role: string;
    isVerifiedStudent: boolean;
}

const ProfilePage: React.FC = () => {
    const { user, logout, updateUser } = useAuth(); // ถ้ามี refreshUser ใน AuthContext ให้ดึงมาใช้ด้วยนะครับ
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    // Initial State (ตัด phone ออก)
    const [profile, setProfile] = useState<ProfileData>({
        name: user?.name || "ผู้ใช้งาน",
        email: user?.email || "",
        imageUrl: user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200",
        role: user?.role || "USER",
        isVerifiedStudent: user?.isVerifiedStudent || false
    });

    // Sync Data with Auth Context (ตัด phone ออก)
    useEffect(() => {
        if (user) {
            setProfile(prev => ({
                ...prev,
                name: user.name || prev.name,
                email: user.email || prev.email,
                imageUrl: user.image || prev.imageUrl,
                role: user.role || "USER",
                isVerifiedStudent: user.isVerifiedStudent || false,
            }));
        }
    }, [user]);

    const handleSave = async () => {
        try {
            AlertUtils.loading("กำลังบันทึกข้อมูล...");
            const response = await api.patch('/api/user/update', {
                name: profile.name,
            });

            console.log("Update success:", response.data);
            AlertUtils.success("บันทึกข้อมูลสำเร็จ!")
            
            updateUser(response.data);
            // 2. ปิดโหมดแก้ไข (หน้าจอจะโชว์ชื่อใหม่ที่เราพิมพ์ไปแล้ว)
            setIsEditing(false); 

        } catch (error: any) {
            AlertUtils.error("บันทึกข้อมูลไม่สำเร็จ!", "กรุณาลองใหม่อีกครั้ง");

            // 3. เช็คดูว่า Error เพราะอะไร
            if (error.response && error.response.status === 401) {
                AlertUtils.error("Session หมดอายุ", "กรุณาเข้าสู่ระบบใหม่");
                // ถ้า Backend บอกว่า 401 จริง แปลว่า Session หลุดตั้งแต่ตอนกดบันทึกแล้ว
                logout(); 
                navigate("/login");
            } else {
                AlertUtils.error("เกิดข้อผิดพลาด", "กรุณาลองใหม่อีกครั้ง");
            }
        }
    };

    const handleLogout = () => {
        AlertUtils.confirm("คุณต้องการออกจากระบบใช่หรือไม่?", "", "ยืนยัน", "ยกเลิก").then((confirmed) => {
            if (confirmed) {
                logout();
                navigate("/login");
            }
        });
    };

    // Mock Data Store (เหมือนเดิม)
    const myStores = [
        {
            id: "1",
            name: "Coffee Corner KKU",
            status: "verified",
            image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=100",
        },
    ];

    return (
        <div className="min-vh-100 pb-5" style={{ backgroundColor: "#f8f9fa" }}>

            <div className="d-none d-lg-block">
                <TopNavbar activePage="profile" />
            </div>

            <div className="d-lg-none">
                <ProfileHeader />
            </div>

            <div className="container">
                <div className="row g-4 justify-content-center">

                    {/* --- Profile Info Section --- */}
                    <div className="col-lg-4 pt-4">
                        <ProfileInfoCard
                            profile={profile}
                            setProfile={setProfile}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            onLogout={handleLogout}
                            onSave={handleSave} // ✅ ส่งฟังก์ชัน save ไปให้ Card
                        />
                    </div>

                    {/* --- Stores & Stats Section --- */}
                    <div className="col-lg-7 pt-lg-4">
                        <MyStoreList stores={myStores} />
                    </div>
                </div>
            </div>

            <div className="d-lg-none">
                <BottomNav activePage="profile" />
            </div>
        </div>
    );
};

export default ProfilePage;