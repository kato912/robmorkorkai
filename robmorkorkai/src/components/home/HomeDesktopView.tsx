import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Bot, Sparkles, ArrowRight, MapPin, X } from "lucide-react";
import { ShopCard } from "./ShopCard";
import { CategoryFilter } from "./CategoryFilter";
import { TopNavbar } from "../layout/TopNavbar";
import type { HomeViewProps } from "../pages/HomePage"

const HomeDesktopView: React.FC<HomeViewProps> = ({
    selectedZone, 
    setSelectedZone,
    selectedCategory, 
    setSelectedCategory,
    filteredShops, 
    zone, // รับมาเป็น zone ตามโค้ดของคุณ
    categorie, // รับมาเป็น categorie ตามโค้ดของคุณ
}) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate('/search', { state: { startQuery: searchQuery } });
        }
    };

    return (
        <div className="bg-light min-vh-100 pb-5">

            {/* Navbar */}
            <TopNavbar 
                activePage="home" 
                showSearchBar={true} 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
            />

            <main className="container pt-4">

                {/* 🌟 1. Hero Section (แบนเนอร์ด้านบนสุด) */}
                <div className="position-relative rounded-4 overflow-hidden mb-5 shadow-sm" style={{ height: '320px' }}>
                    <img
                        src="https://scontent-bkk1-1.xx.fbcdn.net/v/t39.30808-6/510951362_24226257740301184_548725313018084601_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=b895b5&_nc_ohc=zxmR_0jHS-UQ7kNvwFnd18R&_nc_oc=AdkqGXUKWf9QafJJVNmRU5K4Ul06RheqdARDnpyjakEbmPAIyy1o_uHHX1rDHbwXFBM&_nc_zt=23&_nc_ht=scontent-bkk1-1.xx&_nc_gid=bYcfytKP6TknkNjVcLhzAA&oh=00_Afuu4kfHx9Pszt6IDVtcR7lPlt720NI9gW9NaBWbDlt27w&oe=699E45B7" // 👈 เปลี่ยนเป็น URL รูปจริงของคุณ หรือใช้รูปจากเว็บเช่น https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80
                        alt="KKU Campus"
                        className="w-100 h-100 object-fit-cover"
                    />
                    {/* Gradient Overlay สีดำไล่ระดับ */}
                    <div className="position-absolute inset-0 w-100 h-100" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }}></div>
                    
                    {/* Hero Content */}
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center px-5">
                        <div style={{ maxWidth: '550px' }}>
                            <h1 className="fw-bolder text-white mb-3" style={{ fontSize: '2.75rem', lineHeight: '1.2' }}>
                                ค้นหาร้านดีๆ<br/>รอบรั้ว มข.
                            </h1>
                            <p className="text-white-50 fs-5 mb-4">
                                รวมร้านอาหาร คาเฟ่ ที่อ่านหนังสือ ยอดนิยมใกล้มหาวิทยาลัยขอนแก่น
                            </p>
                            <div className="d-flex gap-3">
                                <button onClick={() => document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-light rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2">
                                    <Search size={18} /> ค้นหาร้าน
                                </button>
                                <Link to="/ai" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 text-decoration-none">
                                    <Bot size={18} /> ถาม AI
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-5" id="main-content">

                    {/* 👈 2. Sidebar Left: AI & Zones */}
                    <div className="col-lg-3">
                        <div className="sticky-top" style={{ top: '90px', zIndex: 10 }}>
                            
                            {/* AI Helper Card (ดีไซน์ใหม่) */}
                            <Link to="/ai" className="text-decoration-none">
                                <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ transition: 'all 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.classList.add('shadow')} onMouseOut={(e) => e.currentTarget.classList.remove('shadow')}>
                                    <div className="card-body p-4">
                                        <div className="d-flex align-items-center gap-3 mb-3">
                                            <div className="bg-dark rounded-3 p-2 d-flex align-items-center justify-content-center">
                                                <Bot size={24} className="text-white" />
                                            </div>
                                            <div>
                                                <div className="d-flex align-items-center gap-1 mb-1">
                                                    <Sparkles size={12} className="text-warning" />
                                                    <small className="text-warning fw-bolder text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>New</small>
                                                </div>
                                                <h6 className="fw-bold m-0 text-dark">AI Assistant</h6>
                                            </div>
                                        </div>
                                        <p className="text-secondary small mb-3 lh-base">ไม่รู้จะกินอะไร? ให้ AI ช่วยแนะนำร้านที่ใช่สำหรับคุณ</p>
                                        <div className="text-dark fw-bold small d-flex align-items-center gap-1">
                                            ลองเลย <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Zone Filter (ดีไซน์ List แนวตั้งตามแบบใหม่) */}
                            <div>
                                <h6 className="text-muted text-uppercase fw-bold mb-3" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>โซน</h6>
                                <div className="d-flex flex-column gap-2">
                                    <button
                                        onClick={() => setSelectedZone(null)}
                                        className={`btn text-start rounded-4 px-4 py-3 fw-medium transition-all ${
                                            selectedZone === null
                                                ? "bg-dark text-white shadow-sm"
                                                : "bg-white text-dark border-0 hover-bg-light"
                                        }`}
                                    >
                                        ทั้งหมด
                                    </button>
                                    
                                    {/* เช็คว่ามีข้อมูล zone เข้ามาไหม ก่อนจะ map */}
                                    {zone && zone.map((z: any) => (
                                        <button
                                            key={z.id}
                                            onClick={() => setSelectedZone(selectedZone === z.id ? null : z.id)}
                                            className={`btn text-start rounded-4 px-4 py-3 fw-medium transition-all d-flex align-items-center gap-2 ${
                                                selectedZone === z.id
                                                    ? "bg-dark text-white shadow-sm"
                                                    : "bg-white text-dark border-0 hover-bg-light"
                                            }`}
                                        >
                                            <MapPin size={16} className={selectedZone === z.id ? "text-white" : "text-secondary"} />
                                            {z.label.replace('📍', '').trim()} {/* ลบ Emoji เดิมออกถ้ามี เพื่อใช้ Icon แทน */}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* 👉 3. Right Content: Main Area */}
                    <div className="col-lg-9">

                        {/* ✅ Category Filter (ใช้ Component เดิมที่คุณมี) */}
                        <div className="mb-4">
                            <CategoryFilter 
                                categories={categorie} 
                                selectedCategory={selectedCategory} 
                                setSelectedCategory={setSelectedCategory} 
                            />
                        </div>

                        {/* ✅ Section Header */}
                        <div className="d-flex align-items-end justify-content-between mb-4 mt-2">
                            <div>
                                <h4 className="fw-bold text-dark m-0">
                                    {searchQuery ? `ผลการค้นหา "${searchQuery}"` : "ร้านยอดนิยม"}
                                </h4>
                                <p className="text-secondary small m-0 mt-1">
                                    {searchQuery ? `${filteredShops.length} ผลลัพธ์` : `${filteredShops.length} ร้านที่แนะนำ`}
                                </p>
                            </div>
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="btn btn-sm text-secondary d-flex align-items-center gap-1 hover-dark p-0">
                                    <X size={16} /> ล้าง
                                </button>
                            )}
                        </div>

                        {/* ✅ Shop Grid */}
                        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                            {filteredShops.map((shop) => (
                                <div className="col" key={shop.id}>
                                    <ShopCard shop={shop} />
                                </div>
                            ))}

                            {/* State: Not Found */}
                            {filteredShops.length === 0 && (
                                <div className="col-12">
                                    <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
                                        <Search size={48} className="text-muted opacity-25 mx-auto mb-3" />
                                        <h5 className="fw-bold text-dark">ไม่พบร้านที่ค้นหา</h5>
                                        <p className="text-secondary mb-4">ลองค้นหาด้วยคำอื่น หรือเปลี่ยนโซน/หมวดหมู่ดูนะครับ</p>
                                        <button 
                                            className="btn btn-dark rounded-pill px-4"
                                            onClick={() => {
                                                setSelectedZone(null);
                                                setSelectedCategory(null);
                                                setSearchQuery("");
                                            }}
                                        >
                                            ล้างการค้นหาทั้งหมด
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomeDesktopView;