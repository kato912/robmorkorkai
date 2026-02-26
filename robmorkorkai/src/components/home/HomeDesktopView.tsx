import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Bot, MapPin, X } from "lucide-react";
import { ShopCard } from "./ShopCard";
import { CategoryFilter } from "./CategoryFilter";
import { TopNavbar } from "../layout/TopNavbar";
import { AIBanner } from "./AIBanner";
import { RandomShopButton } from "./RandomShopButton";
import { useTypingEffect } from "../../hooks/useTypingEffect";
import type { HomeViewProps } from "../pages/HomePage"
import HeroImage from "../../assets/hero-campus-life.jpg"

const TYPING_PHRASES = [
    "หาชาบูเด็ดๆ หลังมอ...", 
    "คาเฟ่อ่านหนังสือกังสดาล...", 
    "ร้านนั่งชิลฟีลดีๆ...", 
    "ไม่รู้จะกินอะไรดี?..."
];

const HomeDesktopView: React.FC<HomeViewProps> = ({
    selectedZone, setSelectedZone,
    selectedCategory, setSelectedCategory,
    filteredShops, zone, categorie,
}) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    
    const placeholderText = useTypingEffect(TYPING_PHRASES);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate('/search', { state: { startQuery: searchQuery } });
        }
    };

    return (
        <div className="min-vh-100 pb-5" style={{ backgroundColor: '#1a1412' }}>
            <style>
                {`
                    @keyframes fadeUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-up {
                        animation: fadeUp 0.6s ease-out forwards;
                    }
                    .hover-scale { transition: transform 0.2s; }
                    .hover-scale:hover { transform: scale(1.05); }
                `}
            </style>

            <TopNavbar
                activePage="home"
                showSearchBar={true}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                placeholderText={placeholderText} 
            />

            <div className="animate-fade-up">
                <main className="container pt-4">

                    <div className="position-relative rounded-4 overflow-hidden mb-5 shadow-sm" style={{ height: '320px' }}>
                        
                        {/* Layer 1*/}
                        <img 
                            src={HeroImage} 
                            alt="KKU Campus" 
                            className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover" 
                        />
                        
                        {/* Layer 2 */}
                        <div 
                            className="position-absolute top-0 start-0 w-100 h-100" 
                            style={{ background: 'linear-gradient(to right, rgba(26,18,16,0.9) 0%, rgba(26,18,16,0.6) 50%, transparent 100%)' }}
                        ></div>
                        
                        {/* Layer 3 */}
                        <div 
                            className="position-absolute top-0 start-0 w-100 h-100" 
                            style={{ background: 'linear-gradient(to right, rgba(167, 59, 36, 0.3) 0%, transparent 50%)' }}
                        ></div>
                        
                        {/* Layer 4 */}
                        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center px-5" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '650px' }}>
                                
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div style={{ width: '40px', height: '1.5px', backgroundColor: '#c9943a' }}></div>
                                    <small className="fw-bold text-uppercase m-0" style={{ color: '#c9943a', letterSpacing: '2px' }}>KKU Campus Guide</small>
                                </div>
                                
                                <h1 className="fw-bolder text-white mb-3" style={{ fontSize: '3rem', letterSpacing: '-1px' }}>
                                    ค้นหาร้านดีๆ รอบรั้ว มข.
                                </h1>
                                
                                <p className="fs-5 mb-4" style={{ color: '#e8ebe4' }}>
                                    รวมร้านอาหาร คาเฟ่ ที่อ่านหนังสือ ยอดนิยมใกล้มหาวิทยาลัยขอนแก่น
                                </p>
                                
                                <div className="d-flex gap-3">
                                    <button onClick={() => document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="btn rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 border-0 hover-scale shadow-sm"
                                        style={{ backgroundColor: '#A73B24', color: '#fff5f0' }}>
                                        <Search size={18} /> ค้นหาร้าน
                                    </button>
                                    
                                    <Link to="/ai" 
                                        className="btn rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 text-decoration-none hover-scale"
                                        style={{ backgroundColor: 'rgba(61, 48, 42, 0.4)', border: '1px solid #c9943a', color: '#e8b94a', backdropFilter: 'blur(4px)' }}>
                                        <Bot size={18} /> ถาม AI
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 👆 จบ Hero Section */}

                    <div className="row g-5" id="main-content">
                        {/* Sidebar Left: AI & Zones */}
                        <div className="col-lg-3">
                            <div className="sticky-top" style={{ top: '90px', zIndex: 10 }}>
                                <AIBanner />
                                <div>
                                    <h6 className="text-uppercase fw-bold mb-3" style={{color: "#c9943a", fontSize: '0.9rem', letterSpacing: '1px' }}>โซน</h6>
                                    <div className="d-flex flex-column gap-2">
                                        <button onClick={() => setSelectedZone(null)} className="btn text-start rounded-4 px-4 py-3 fw-bold transition-all border-0" style={selectedZone === null ? { backgroundColor: '#A73B24', color: 'white' } : { backgroundColor: '#2d2320', color: '#fff5f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '#3d302a' }}>ทั้งหมด</button>
                                        {zone && zone.map((z: any) => (
                                            <button key={z.id} onClick={() => setSelectedZone(selectedZone === z.id ? null : z.id)} className="btn text-start rounded-4 px-4 py-3 fw-medium transition-all d-flex align-items-center justify-content-between border-0" style={selectedZone === z.id ? { backgroundColor: '#A73B24', color: '#fff5f0', fontWeight: 'bold' } : { backgroundColor: '#3d302a', color: '#f5ebe4', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                                <div className="d-flex align-items-center gap-3">
                                                    <MapPin size={18} style={{ color: selectedZone === z.id ? '#fff5f0' : '#f5ebe4' }} />
                                                    {z.label.replace('📍', '').trim()}
                                                </div>
                                                <span style={{ fontSize: '12px', fontWeight: 'bold', color: selectedZone === z.id ? '#fff5f0' : '#f5ebe4' }}>{z.count || '0'}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Content: Main Area */}
                        <div className="col-lg-9">
                            <div className="mb-4">
                                <CategoryFilter categories={categorie} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                            </div>
                            <div className="d-flex align-items-end justify-content-between mb-4 mt-2">
                                <div>
                                    <h4 className="fw-bold m-0" style={{ color: '#f5ebe4' }}>{searchQuery ? `ผลการค้นหา "${searchQuery}"` : "ร้านยอดนิยม"}</h4>
                                    <p className="text-secondary small m-0 mt-1">{searchQuery ? `${filteredShops.length} ผลลัพธ์` : `${filteredShops.length} ร้านที่แนะนำ`}</p>
                                </div>
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery("")} className="btn btn-sm text-secondary d-flex align-items-center gap-1 hover-dark p-0"><X size={16} /> ล้าง</button>
                                )}
                            </div>
                            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                                {filteredShops.map((shop) => (<div className="col" key={shop.id}><ShopCard shop={shop} /></div>))}
                                {filteredShops.length === 0 && (
                                    <div className="col-12">
                                        <div className="card border-0 shadow-sm rounded-4 p-5 text-center" style={{ background:'#231c18'}}>
                                            <Search size={48} className="opacity-25 mx-auto mb-3" style={{ color:'#f5ebe4' }}/>
                                            <h5 className="fw-bold" style={{ color:'#f5ebe4'}}>ไม่พบร้านที่ค้นหา</h5>
                                            <p className="text-secondary mb-4" style={{ color:'#9a8a7e' }}>ลองค้นหาด้วยคำอื่น หรือเปลี่ยนโซน/หมวดหมู่ดูนะครับ</p>
                                            <button className="btn rounded-pill px-4 fw-bold" style={{ backgroundColor: '#8B0000', color:'#e8b94a' }} onClick={() => { setSelectedZone(null); setSelectedCategory(null); setSearchQuery(""); }}>ล้างการค้นหาทั้งหมด</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <RandomShopButton shops={filteredShops} />
        </div>
    );
};

export default HomeDesktopView;