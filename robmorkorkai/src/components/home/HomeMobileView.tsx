import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { AIBanner } from "./AIBanner";
import { ShopCard } from "./ShopCard";
import { ZoneFilter } from "./ZoneFilter";
import { CategoryFilter } from "./CategoryFilter";
import { BottomNav } from "../layout/BottomNav";
import type { HomeViewProps } from '../pages/HomePage'
import { useAuth } from "../../context/AuthContext";
import HeroImage from "../../assets/foe.jpeg"
import '../../assets/css/Botnavbar.css'

const HomeMobileView: React.FC<HomeViewProps> = ({
    selectedZone, setSelectedZone,
    selectedCategory, setSelectedCategory,
    filteredShops, zone, categorie
}) => {
    const navigate = useNavigate();
    const { isLoggedIn, user } = useAuth(); 
    const [searchText, setSearchText] = useState("");
    const profileImage = user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100";

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchText.trim() !== "") {
            navigate('/search', { state: { startQuery: searchText } });
        }
    };

    return (
        <>
            <div className="min-vh-100" style={{ paddingBottom: '90px', backgroundColor: '#1a1412' }}> {/* สีพื้นหลังหลัก */}
                
                {/* Header */}
                <div className="px-4 pb-4 pt-5" style={{ background: '#231c18', borderBottom: '1px solid rgba(201, 148, 58, 0.2)' }}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center gap-3">
                            <div className="rounded-3 p-2" style={{ background: '#A73B24' }}>
                                <MapPin size={18} style={{ color: '#f5ebe4' }}  />
                            </div>
                            <div>
                                <h6 className="fw-bold m-0" style={{ letterSpacing: '-0.5px', color: '#f5ebe4' }}>robmorkorkai</h6>
                                <small className="d-block" style={{ fontSize: '0.65rem', color: '#e8b94a' }}>Khon Kaen University</small>
                            </div>
                        </div>

                        {isLoggedIn ? (
                            <Link to="/profile">
                                <img src={profileImage} alt="Profile" className="rounded-circle object-fit-cover custom-mobile-profile" style={{ width: '36px', height: '36px' }} />
                            </Link>
                        ) : (
                            <Link to="/login" className="btn btn-sm rounded-pill px-4 fw-medium custom-mobile-login">เข้าสู่ระบบ</Link>
                        )}
                    </div>

                    <div className="position-relative">
                        <Search className="position-absolute top-50 translate-middle-y ms-3" size={18} style={{ color:'#c9943a'}}/>
                        <input
                            /* 👇 ใส่คลาส custom-mobile-search และ shadow-none */
                            className="form-control custom-mobile-search rounded-pill ps-5 border-0 shadow-none"
                            placeholder="ค้นหาร้านอาหาร, คาเฟ่..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleSearch}
                            style={{
                                height: '48px',
                                fontSize: '0.95rem',
                                backgroundColor: '#3d302a',
                                color: '#f5ebe4',
                            }}
                        />
                    </div>
                </div>

                {/* Hero Section */}
                <div className="px-3 mt-3">
                    <div className="position-relative rounded-4 overflow-hidden mb-4 shadow-sm" style={{ height: '160px' }}>
                        <img src={HeroImage} alt="KKU Campus" className="w-100 h-100 object-fit-cover" />
                        <div className="position-absolute inset-0 w-100 h-100" style={{ background: 'linear-gradient(to top, rgba(26,18,16,0.9), transparent)' }}></div>
                        <div className="position-absolute bottom-0 start-0 w-100 p-3">
                            <h5 className="fw-bold text-white mb-1">ค้นหาร้านดีๆ รอบรั้ว มข.</h5>
                            <p className="m-0" style={{ fontSize: '0.75rem', color: '#e8b94a' }}>รวมร้านอาหาร คาเฟ่ ที่อ่านหนังสือยอดนิยม</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-3">
                    <div className="mb-4">
                        <AIBanner />
                    </div>

                    <div className="mb-4">
                        <h6 className="text-uppercase fw-bold mb-3" style={{ fontSize: '0.75rem', letterSpacing: '1px', color: '#c9943a' }}>โซน</h6>
                        <ZoneFilter zones={zone} selectedZone={selectedZone} setSelectedZone={setSelectedZone} isMobile />
                    </div>

                    <div className="mb-4">
                        <h6 className="text-uppercase fw-bold mb-3" style={{ fontSize: '0.75rem', letterSpacing: '1px', color: '#c9943a' }}>หมวดหมู่</h6>
                        <CategoryFilter categories={categorie} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    </div>

                    <div className="mb-2">
                        <div className="d-flex align-items-end justify-content-between mb-3">
                            <div>
                                <h5 className="fw-bold m-0" style={{ color: '#f5ebe4' }}>{searchText ? `ผลการค้นหา` : "ร้านยอดนิยม"}</h5>
                                <p className="small m-0 mt-1" style={{ color: '#9a8a7e' }}>{filteredShops.length} ร้านที่แนะนำ</p>
                            </div>
                        </div>
                        <div className="d-flex flex-column gap-3">
                            {filteredShops.map((shop) => (
                                <ShopCard key={shop.id} shop={shop} />
                            ))}
                            
                            {/* State: Not Found (แก้สีพื้นหลังและตัวหนังสือแล้ว) */}
                            {filteredShops.length === 0 && (
                                <div className="text-center py-5 rounded-4 border shadow-sm" style={{ background: '#231c18', borderColor: '#3d302a' }}>
                                    <Search size={32} className="opacity-25 mb-2" style={{ color: '#f5ebe4' }} />
                                    <p className="small m-0" style={{ color: '#9a8a7e' }}>ไม่พบร้านที่คุณค้นหา</p>
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