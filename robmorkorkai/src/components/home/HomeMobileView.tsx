import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { Search, MapPin, Menu, X } from "lucide-react";
import { AIBanner } from "./AIBanner";
import { ShopCard } from "./ShopCard";
import { ZoneFilter } from "./ZoneFilter";
import { CategoryFilter } from "./CategoryFilter";
import { BottomNav } from "../layout/BottomNav";
import type { HomeViewProps } from '../pages/HomePage'
import { useAuth } from "../../context/AuthContext"; 

const HomeMobileView: React.FC<HomeViewProps> = ({
    selectedZone, setSelectedZone,
    selectedCategory, setSelectedCategory,
    filteredShops, zone, categorie
}) => {
    const navigate = useNavigate();
    const { isLoggedIn, user } = useAuth(); 
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const profileImage = user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100";

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchText.trim() !== "") {
            navigate('/search', { state: { startQuery: searchText } });
        }
    };

    return (
        <>
            <style>{`* { -webkit-tap-highlight-color: transparent; }`}</style>

            <div className="bg-light min-vh-100" style={{ paddingBottom: '90px' }}>
                
                {/* 🌟 Header สีขาวสไตล์มินิมอล */}
                <div className="bg-white px-4 pb-4 pt-5 border-bottom">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-dark rounded-3 p-2">
                                <MapPin size={18} className="text-white" />
                            </div>
                            <div>
                                <h6 className="fw-bold text-dark m-0" style={{ letterSpacing: '-0.5px' }}>robmorkorkai</h6>
                                <small className="text-muted d-block" style={{ fontSize: '0.65rem' }}>Khon Kaen University</small>
                            </div>
                        </div>

                        {isLoggedIn ? (
                            <Link to="/profile">
                                <img src={profileImage} alt="Profile" className="rounded-circle object-fit-cover" style={{ width: '36px', height: '36px' }} />
                            </Link>
                        ) : (
                            <Link to="/login" className="btn btn-sm btn-dark rounded-pill px-4 fw-medium">เข้าสู่ระบบ</Link>
                        )}
                    </div>

                    <div className="position-relative">
                        <Search className="position-absolute top-50 translate-middle-y ms-3 text-muted" size={18} />
                        <input
                            className="form-control rounded-pill ps-5 border-0 bg-light"
                            placeholder="ค้นหาร้านอาหาร, คาเฟ่..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleSearch}
                            style={{ height: '48px', fontSize: '0.95rem' }}
                        />
                    </div>
                </div>

                {/* 🌟 Hero Section สำหรับ Mobile */}
                <div className="px-3 mt-3">
                    <div className="position-relative rounded-4 overflow-hidden mb-4" style={{ height: '160px' }}>
                        <img src="https://scontent-bkk1-1.xx.fbcdn.net/v/t39.30808-6/510951362_24226257740301184_548725313018084601_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=b895b5&_nc_ohc=zxmR_0jHS-UQ7kNvwFnd18R&_nc_oc=AdkqGXUKWf9QafJJVNmRU5K4Ul06RheqdARDnpyjakEbmPAIyy1o_uHHX1rDHbwXFBM&_nc_zt=23&_nc_ht=scontent-bkk1-1.xx&_nc_gid=bYcfytKP6TknkNjVcLhzAA&oh=00_Afuu4kfHx9Pszt6IDVtcR7lPlt720NI9gW9NaBWbDlt27w&oe=699E45B7" alt="KKU Campus" className="w-100 h-100 object-fit-cover" />
                        <div className="position-absolute inset-0 w-100 h-100" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                        <div className="position-absolute bottom-0 start-0 w-100 p-3">
                            <h5 className="fw-bold text-white mb-1">ค้นหาร้านดีๆ รอบรั้ว มข.</h5>
                            <p className="text-white-50 m-0" style={{ fontSize: '0.75rem' }}>รวมร้านอาหาร คาเฟ่ ที่อ่านหนังสือยอดนิยม</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-3">
                    <div className="mb-4">
                        <AIBanner />
                    </div>

                    <div className="mb-4">
                        <h6 className="text-muted text-uppercase fw-bold mb-3" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>โซน</h6>
                        <ZoneFilter zones={zone} selectedZone={selectedZone} setSelectedZone={setSelectedZone} isMobile />
                    </div>

                    <div className="mb-4">
                        <h6 className="text-muted text-uppercase fw-bold mb-3" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>หมวดหมู่</h6>
                        <CategoryFilter categories={categorie} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    </div>

                    <div className="mb-2">
                        <div className="d-flex align-items-end justify-content-between mb-3">
                            <div>
                                <h5 className="fw-bold text-dark m-0">{searchText ? `ผลการค้นหา` : "ร้านยอดนิยม"}</h5>
                                <p className="text-secondary small m-0 mt-1">{filteredShops.length} ร้านที่แนะนำ</p>
                            </div>
                        </div>
                        <div className="d-flex flex-column gap-3">
                            {filteredShops.map((shop) => (
                                <ShopCard key={shop.id} shop={shop} />
                            ))}
                            {filteredShops.length === 0 && (
                                <div className="text-center py-5 bg-white rounded-4 border shadow-sm">
                                    <Search size={32} className="text-muted opacity-25 mb-2" />
                                    <p className="text-muted small m-0">ไม่พบร้านที่คุณค้นหา</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <BottomNav activePage="home" />
        </>
    );
};

export default HomeMobileView;