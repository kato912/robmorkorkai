import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Search, LogIn } from "lucide-react";

interface Props {
    activePage: string;
    isLoggedIn: boolean;
    showSearchBar?: boolean;
}

export const TopNavbar: React.FC<Props> = ({ activePage, isLoggedIn, showSearchBar = false }) => {
    
    const profileImage = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100";

    return (
        // ✅ 1. เปลี่ยน bg-white เป็น bg-primary และเพิ่ม text-white
        <nav className="bg-primary sticky-top shadow-sm" style={{ zIndex: 1020 }}>
            <div className="container py-3 d-flex align-items-center justify-content-between">
                
                {/* Logo: สีขาว */}
                <Link to="/" className="d-flex align-items-center gap-2 text-white text-decoration-none">
                    <MapPin size={28} />
                    <span className="h4 fw-bold m-0">robmorkorkai</span>
                </Link>

                {/* Search Bar */}
                {showSearchBar && (
                    <div className="d-none d-md-block position-relative w-50 mx-4">
                        <Search className="position-absolute top-50 translate-middle-y ms-3 text-secondary" size={20} />
                        <input 
                            className="form-control rounded-pill ps-5 border-0 shadow-sm" 
                            placeholder="ค้นหาร้านอาหาร, คาเฟ่..." 
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }} // ปรับสีพื้นช่องค้นหาให้สว่าง
                        />
                    </div>
                )}

                {/* Right Menu */}
                <div className="d-flex align-items-center gap-4">
                    {/* Home Link */}
                    <Link 
                        to="/" 
                        className={`text-decoration-none ${activePage === 'home' ? 'text-white fw-bold' : 'text-white opacity-75 hover-opacity-100'}`}
                    >
                        Home
                    </Link>

                    {/* AI Helper Link */}
                    <Link 
                        to="/ai" 
                        className={`text-decoration-none ${activePage === 'ai' ? 'text-white fw-bold' : 'text-white opacity-75 hover-opacity-100'}`}
                    >
                        AI Helper
                    </Link>

                    {/* Profile Section */}
                    {isLoggedIn ? (
                        <Link to="/profile" className="d-flex align-items-center gap-2 text-decoration-none">
                            <div className="position-relative">
                                {/* ✅ รูปโปรไฟล์ ขอบสีขาว (border-white) เพื่อให้เด่นบนพื้นฟ้า */}
                                <img 
                                    src={profileImage}
                                    alt="Profile"
                                    className="rounded-circle border border-2 border-white"
                                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                />
                                <span className="position-absolute bottom-0 end-0 bg-success border border-2 border-white rounded-circle" style={{ width: 12, height: 12 }}></span>
                            </div>
                        </Link>
                    ) : (
                        <Link to="/login" className="btn btn-light rounded-pill px-4 d-flex align-items-center gap-2 text-primary fw-bold">
                            <LogIn size={18} /> เข้าสู่ระบบ
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};