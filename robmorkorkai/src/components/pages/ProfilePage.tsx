import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { ProfileHeader } from "../profile/ProfileHeader";
import { ProfileInfoCard } from "../profile/ProfileInfoCard";
import { MyStoreList } from "../profile/MyStoreList";
import { BottomNav } from "../layout/BottomNav";
import { useAuth } from "../../context/AuthContext";

export interface ProfileData {
    name: string;
    email: string;
    phone: string;
    studentId: string;
    imageUrl: string;
}

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const [profile, setProfile] = useState<ProfileData>({
        name: "สมชาย ใจดี",
        email: "somchai@kkumail.com",
        phone: "081-234-5678",
        studentId: "643021001-2",
        imageUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200"
    });

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

            {/* --- Desktop Header --- */}
            <header className="d-none d-lg-block bg-primary sticky-top text-white shadow-sm mb-4" style={{ zIndex: 1020 }}>
                <div className="container py-3 d-flex align-items-center justify-content-between">
                    <Link to="/" className="d-flex align-items-center gap-2 text-white text-decoration-none transition opacity-75 hover-opacity-100">
                        <MapPin size={24} />
                        <span className="h4 fw-bold m-0">robmorkorkai</span>
                    </Link>

                    <nav className="d-flex align-items-center gap-4">
                        <Link to="/" className="text-white text-decoration-none opacity-75 hover-opacity-100 fw-medium">Home</Link>
                        <Link to="/ai" className="text-white text-decoration-none opacity-75 hover-opacity-100 fw-medium">AI Helper</Link>
                        <div className="border-start border-white border-opacity-25 ps-4">
                            <img
                                src={profile.imageUrl}
                                alt="Profile"
                                className="rounded-circle border border-2 border-white shadow-sm"
                                style={{ width: '38px', height: '38px', objectFit: 'cover' }}
                            />
                        </div>
                    </nav>
                </div>
            </header>

            {/* Mobile Header */}
            <div className="d-lg-none">
                <ProfileHeader />
            </div>

            <div className="container">
                <div className="row g-4 justify-content-center">
                    {/* Profile Section */}
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

                    {/* Stores & Stats Section */}
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