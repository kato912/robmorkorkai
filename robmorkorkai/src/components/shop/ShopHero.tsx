import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Home, Search, Bot, Heart, Share2, Star, MapPin, Clock } from "lucide-react";
import type { Shop } from "../../types/shop";

interface ShopHeroProps {
    shop: Shop;
    averageRating: string | number;
    reviewsCount: number;
    isLoggedIn: boolean;
    user: any;
    isFavorited: boolean;
    setIsFavorited: (val: boolean) => void;
}

export const ShopHero: React.FC<ShopHeroProps> = ({
    shop, averageRating, reviewsCount, isLoggedIn, user, isFavorited, setIsFavorited
}) => {
    const navigate = useNavigate();

    return (
        <section className="position-relative overflow-hidden w-100 bg-dark" style={{ height: '75vh', minHeight: '550px' }}>
            <img src={shop.coverImage || shop.image || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"} alt={shop.name} className="w-100 h-100 object-fit-cover" style={{ opacity: 0.9 }} />
            <div className="position-absolute top-0 start-0 w-100 h-100 hero-gradient"></div>

            {/* Top Navigation */}
            <div className="position-absolute top-0 start-0 w-100 pt-4 px-4 px-lg-5 d-flex justify-content-between align-items-center" style={{ zIndex: 1020 }}>
                <button onClick={() => navigate(-1)} className="btn btn-link text-white text-decoration-none d-flex align-items-center gap-3 p-0 opacity-75 hover-opacity-100 transition-all" title="Go back" aria-label="Go back">
                    <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)' }}>
                        <ChevronLeft size={20} />
                    </div>
                    <span className="d-none d-lg-block small fw-medium text-white tracking-wide">กลับหน้าแรก</span>
                </button>

                {/* Desktop Nav */}
                <nav className="d-none d-lg-flex align-items-center gap-4">
                    <Link to="/" className="text-decoration-none d-flex align-items-center gap-2 small fw-medium transition-colors nav-link-hover px-4 py-2 rounded-pill" style={{ color: '#fff5f0'}}><Home size={18} /> Home</Link>
                    <Link to="/search" className="text-decoration-none d-flex align-items-center gap-2 small fw-medium transition-colors nav-link-hover px-4 py-2 rounded-pill" style={{ color: '#fff5f0'}}><Search size={18} /> Search</Link>
                    <Link to="/ai" className="text-decoration-none d-flex align-items-center gap-2 small fw-medium transition-colors nav-link-hover px-4 py-2 rounded-pill" style={{ color: '#fff5f0'}}><Bot size={18} /> AI</Link>
                    <div style={{ width: '1px', height: '24px', backgroundColor: '#fff5f0' }}></div>
                    {isLoggedIn ? (
                        <Link to="/profile">
                            <img src={user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100"} className="rounded-circle border border-2 border-white opacity-90 hover-opacity-100 transition-all object-fit-cover" width="36" height="36" alt="Profile" />
                        </Link>
                    ) : (
                        <Link to="/login" className="btn btn-light rounded-pill px-4 btn-sm fw-bold">เข้าสู่ระบบ</Link>
                    )}
                </nav>

                {/* Mobile Actions */}
                <div className="d-lg-none d-flex gap-2">
                    <button onClick={() => setIsFavorited(!isFavorited)} className="btn rounded-circle p-2 d-flex align-items-center justify-content-center text-white" style={{ backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)' }} title={isFavorited ? "Remove from favorites" : "Add to favorites"} aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}>
                        <Heart size={20} className={isFavorited ? "fill-danger text-danger" : ""} />
                    </button>
                    <button className="btn rounded-circle p-2 d-flex align-items-center justify-content-center text-white" style={{ backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)' }} title="Share" aria-label="Share"><Share2 size={20} /></button>
                </div>
            </div>

            {/* Hero Content - Bottom */}
            <div className="position-absolute bottom-0 start-0 w-100 px-4 px-lg-5 pb-5" style={{ zIndex: 1010 }}>
                <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                    <span className="badge rounded-pill hero-badge">{shop.category}</span>
                    <span className="badge rounded-pill hero-badge-green">เปิดอยู่</span>
                </div>
                <h1 className="fw-bolder text-white mb-3 tracking-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '1.1' }}>{shop.name}</h1>
                <p className="text-white opacity-75 mb-4 lh-base fw-light" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', maxWidth: '650px' }}>
                    {shop.description || "ไม่มีคำอธิบายร้านค้า แต่คุณสามารถดูรีวิวจากนักศึกษา มข. คนอื่นๆได้"}
                </p>
                <div className="d-flex flex-wrap align-items-center gap-3 gap-lg-4 text-white-50 small fw-medium" style={{ fontSize: '1rem' }}>
                    <div className="d-flex align-items-center gap-2 text-white">
                        <Star size={18} className="fill-warning text-warning" />
                        <span className="fw-bold fs-5">{averageRating}</span>
                        <span className="opacity-75" style={{ fontSize: '0.9rem' }}>({reviewsCount} รีวิว)</span>
                    </div>
                    <div className="d-none d-sm-block" style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.3)' }}></div>
                    <div className="d-flex align-items-center gap-2 text-white opacity-75"><MapPin size={18} /> <span>{shop.zone}</span></div>
                    <div className="d-none d-sm-block" style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.3)' }}></div>
                    <div className="d-none d-sm-flex align-items-center gap-2 text-white opacity-75"><Clock size={18} /> <span>{shop.openHours}</span></div>
                </div>
            </div>
        </section>
    );
};