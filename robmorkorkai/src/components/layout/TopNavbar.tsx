import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Search, Home, Bot } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

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
    const { isLoggedIn , user} = useAuth(); 
    const profileImage = user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100";
    
    return (
        <nav className="bg-white sticky-top border-bottom" style={{ zIndex: 1020 }}>
            <div className="container py-3 d-flex align-items-center justify-content-between">
                
                {/* Logo */}
                <Link to="/" className="d-flex align-items-center gap-2 text-dark text-decoration-none">
                    <div className="bg-dark rounded-3 p-2 d-flex align-items-center justify-content-center">
                        <MapPin size={20} className="text-white" />
                    </div>
                    <div>
                        <h5 className="fw-bold text-dark m-0" style={{ letterSpacing: '-0.5px' }}>robmorkorkai</h5>
                        <small className="text-muted d-block" style={{ fontSize: '0.65rem' }}>Khon Kaen University</small>
                    </div>
                </Link>

                {/* Search Bar */}
                {showSearchBar && (
                    <div className="d-none d-md-block position-relative flex-grow-1 mx-5" style={{ maxWidth: '400px' }}>
                        <Search className="position-absolute top-50 translate-middle-y ms-3 text-muted" size={16} />
                        <input 
                            className="form-control rounded-pill ps-5 border-0 bg-light" 
                            placeholder="ค้นหาร้านอาหาร, คาเฟ่, ที่อ่านหนังสือ..." 
                            value={searchQuery || ""} 
                            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && handleSearch) handleSearch();
                            }}
                            style={{ height: '42px', fontSize: '0.9rem' }}
                        />
                    </div>
                )}

                {/* Right Menu */}
                <div className="d-flex align-items-center gap-3">
                    <Link to="/" className={`btn btn-sm rounded-pill px-3 d-flex align-items-center gap-2 ${activePage === 'home' ? 'text-dark fw-bold bg-light' : 'text-secondary border-0 hover-bg-light'}`}>
                        <Home size={16} /> Home
                    </Link>
                    <Link to="/ai" className={`btn btn-sm rounded-pill px-3 d-flex align-items-center gap-2 ${activePage === 'ai' ? 'text-dark fw-bold bg-light' : 'text-secondary border-0 hover-bg-light'}`}>
                        <Bot size={16} /> AI Helper
                    </Link>
                    
                    <div className="vr mx-1 text-muted"></div>

                    {/* Profile Section */}
                    {isLoggedIn ? (
                        <Link to="/profile" className="d-flex align-items-center gap-2 text-decoration-none px-2 py-1 rounded-pill hover-bg-light transition-all">
                            <img src={profileImage} alt="Profile" className="rounded-circle object-fit-cover" style={{ width: '32px', height: '32px' }} />
                        </Link>
                    ) : (
                        <Link to="/login" className="btn btn-dark rounded-pill px-4 fw-medium" style={{ fontSize: '0.9rem' }}>
                            เข้าสู่ระบบ
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};