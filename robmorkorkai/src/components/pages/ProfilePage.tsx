import React, { useState, useEffect } from "react";

// Import Components ย่อย
import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { ProfileInfoCard } from "../../components/profile/ProfileInfoCard";
import { MyStoreList } from "../../components/profile/MyStoreList";
import { BottomNav } from "../../components/layout/BottomNav"; 
import { TopNavbar } from "../../components/layout/TopNavbar";

//data
import { useAuth } from "../../context/AuthContext";

export interface ProfileData {
    name: string;
    email: string;
    phone: string;
    studentId: string;
    imageUrl: string;
    role: string;
    isVerifiedStudent: boolean;
}

const ProfilePage: React.FC = () => {
    const { user, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Initial State
    const [profile, setProfile] = useState<ProfileData>({
        name: user?.name || "ผู้ใช้งาน",
        email: user?.email || "",
        phone: "ยังไม่ระบุเบอร์โทร",
        studentId: "-",
        imageUrl: user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200",
        role: user?.role || "USER",
        isVerifiedStudent: user?.isVerifiedStudent || false
    });

    // Sync Data with Auth Context
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

    // Mock Data Store
    const myStores = [
        {
            id: "1",
            name: "Coffee Corner KKU",
            status: "verified",
            image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=100",
        },
    ];

    const handleLogout = () => {
        setIsLoggingOut(true);
        logout();
    };

    return (
        <div className="min-vh-100 pb-5" style={{ backgroundColor: "#f8f9fa" }}>
            <style>
                {`
                    * { -webkit-tap-highlight-color: transparent !important; }
                    .hover-shadow:hover { transform: translateY(-2px); box-shadow: 0 .5rem 1rem rgba(0,0,0,.08)!important; }
                    .transition { transition: all 0.2s ease-in-out; }
                `}
            </style>

            
            <div className="d-none d-lg-block">
                <TopNavbar activePage="profile" />
            </div>

            <div className="d-lg-none">
                <ProfileHeader  />
            </div>

            <div className="container">
                <div className="row g-4 justify-content-center">
                    
                    {/* --- Profile Info Section (Component) --- */}
                    <div className="col-lg-4 pt-4">
                        <div style={{
                            opacity: isLoggingOut ? 0.6 : 1,
                            pointerEvents: isLoggingOut ? 'none' : 'auto',
                            transition: 'all 0.3s ease'
                        }}>
                            <ProfileInfoCard
                                profile={profile}
                                setProfile={setProfile}
                                isEditing={isEditing}
                                setIsEditing={setIsEditing}
                                onLogout={handleLogout}
                            />
                        </div>
                    </div>

                    {/* --- Stores & Stats Section (Component) --- */}
                    <div className="col-lg-7 pt-lg-4">
                        <MyStoreList stores={myStores} />
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Nav */}
            <div className="d-lg-none">
                <BottomNav activePage="profile" />
            </div>
        </div>
    );
};

export default ProfilePage;