import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Bot, MapPin, X } from "lucide-react";
import { ShopCard } from "./ShopCard";
import { CategoryFilter } from "./CategoryFilter";
import { TopNavbar } from "../layout/TopNavbar";
import { AIBanner } from "./AIBanner";
import type { HomeViewProps } from "../pages/HomePage"
import HeroImage from "../../assets/foe.jpeg"

const HomeDesktopView: React.FC<HomeViewProps> = ({
    selectedZone, setSelectedZone,
    selectedCategory, setSelectedCategory,
    filteredShops, zone, categorie,
}) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate('/search', { state: { startQuery: searchQuery } });
        }
    };

    return (
        <div className="min-vh-100 pb-5">
            <TopNavbar
                activePage="home"
                showSearchBar={true}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
            />

            <main className="container pt-4">

                {/* Hero Section */}
                <div className="position-relative rounded-4 overflow-hidden mb-5 shadow-sm" style={{ height: '320px' }}>
                    <img src={HeroImage} alt="KKU Campus" className="w-100 h-100 object-fit-cover" />
                    <div className="position-absolute inset-0 w-100 h-100" style={{ background: 'linear-gradient(to right, rgba(26,18,16,0.95) 0%, rgba(26,18,16,0.6) 50%, transparent 100%)' }}></div>
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center px-5">
                        <div style={{ maxWidth: '550px' }}>
                            <small className="fw-bold text-uppercase" style={{ color: '#D4AF37', letterSpacing: '2px' }}>KKU Campus Guide</small>
                            <h1 className="fw-bolder text-white mt-2 mb-3" style={{ fontSize: '3rem', lineHeight: '1.2' }}>ค้นหาร้านดีๆ<br />รอบรั้ว มข.</h1>
                            <p className="text-white-50 fs-5 mb-4">รวมร้านอาหาร คาเฟ่ ที่อ่านหนังสือ ยอดนิยมใกล้มหาวิทยาลัยขอนแก่น</p>
                            <div className="d-flex gap-3">
                                <button onClick={() => document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="btn text-white rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 border-0"
                                    style={{ backgroundColor: '#8B0000' }}>
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

                    {/* Sidebar Left: AI & Zones */}
                    <div className="col-lg-3">
                        <div className="sticky-top" style={{ top: '90px', zIndex: 10 }}>


                            <AIBanner />

                            {/* Zone Filter */}
                            <div>
                                <h6 className="text-uppercase fw-bold mb-3" style={{color: "#c9943a", fontSize: '0.9rem', letterSpacing: '1px' }}>โซน</h6>
                                <div className="d-flex flex-column gap-2">
                                   {/* ... (โค้ด Zone Filter เหมือนเดิม) ... */}
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
                        {/* ... (โค้ดหมวดหมู่และแสดงร้านค้าด้านขวาเหมือนเดิมทั้งหมดครับ) ... */}
                        <div className="mb-4">
                            <CategoryFilter categories={categorie} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                        </div>
                        {/* Section Header */}
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
                                    <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
                                        <Search size={48} className="text-muted opacity-25 mx-auto mb-3" />
                                        <h5 className="fw-bold text-dark">ไม่พบร้านที่ค้นหา</h5>
                                        <p className="text-secondary mb-4">ลองค้นหาด้วยคำอื่น หรือเปลี่ยนโซน/หมวดหมู่ดูนะครับ</p>
                                        <button className="btn text-white rounded-pill px-4 fw-bold" style={{ backgroundColor: '#8B0000' }} onClick={() => { setSelectedZone(null); setSelectedCategory(null); setSearchQuery(""); }}>ล้างการค้นหาทั้งหมด</button>
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