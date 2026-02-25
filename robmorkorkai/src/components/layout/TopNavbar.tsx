import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Search, Home, Bot } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import '../../assets/css/Topnavbar.css'

interface Props {
    activePage: string;
    showSearchBar?: boolean;
    searchQuery?: string;
    setSearchQuery?: (text: string) => void;
    handleSearch?: () => void;
}

export const TopNavbar: React.FC<Props> = ({
    activePage, showSearchBar = false, searchQuery, setSearchQuery, handleSearch
}) => {
    const { isLoggedIn, user } = useAuth();
    const profileImage = user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100";

    return (
        <nav className="sticky-top" style={{ zIndex: 1020, background: '#231c18', borderBottom: '1px solid rgba(201, 148, 58, 0.2)' }}>

            <div className="container py-3 d-flex align-items-center justify-content-between">

                {/* Logo */}
                <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
                    <div className="rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ background: '#A73B24' }}>
                        <MapPin size={20} style={{ color: '#f5ebe4' }} />
                    </div>
                    <div>
                        <h5 className="fw-bold m-0" style={{ letterSpacing: '-0.5px', color: '#f5ebe4' }}>robmorkorkai</h5>
                        <small className="d-block" style={{ fontSize: '0.65rem', color: '#e8b94a' }}>Khon Kaen University</small>
                    </div>
                </Link>

                {/* Search Bar */}
                {showSearchBar && (
                    <div className="d-none d-md-block position-relative flex-grow-1 mx-5" style={{ maxWidth: '400px' }}>
                        <Search className="position-absolute top-50 translate-middle-y ms-3" size={16} style={{ color: '#e8b94a' }} />
                        <input
                            className="form-control custom-search rounded-pill ps-5 border-0 shadow-none"
                            placeholder="ค้นหาร้านอาหาร, คาเฟ่, ที่อ่านหนังสือ..."
                            value={searchQuery || ""}
                            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && handleSearch) handleSearch();
                            }}
                            style={{
                                 height: '42px',
                                fontSize: '0.9rem',
                                backgroundColor: '#3d302a',
                                color: '#f5ebe4',
                            }}
                        />
                    </div>
                )}

                {/* Right Menu */}
                <div className="d-flex align-items-center gap-3">
                    <Link to="/" className={`btn btn-sm rounded-pill px-3 d-flex align-items-center gap-2 custom-nav-link ${activePage === 'home' ? 'active' : ''}`}>
                        <Home size={16} /> Home
                    </Link>
                    <Link to="/ai" className={`btn btn-sm rounded-pill px-3 d-flex align-items-center gap-2 custom-nav-link ${activePage === 'ai' ? 'active' : ''}`}>
                        <Bot size={16} /> AI Helper
                    </Link>

                    <div className="vr mx-1" style={{ backgroundColor: '#f5ebe4' }}></div>

                    {/* Profile Section */}
                    {isLoggedIn ? (
                        <Link to="/profile" className="d-flex align-items-center gap-2 text-decoration-none px-2 py-1 rounded-pill custom-nav-link transition-all">
                            <img src={profileImage} alt="Profile" className="rounded-circle object-fit-cover" style={{ width: '32px', height: '32px' }} />
                        </Link>
                    ) : (
                        /* 👇 เรียกใช้คลาส custom-login-btn ตรงนี้ */
                        <Link to="/login" className="btn rounded-pill px-4 fw-medium custom-login-btn" style={{ fontSize: '0.9rem' }}>
                            เข้าสู่ระบบ
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};