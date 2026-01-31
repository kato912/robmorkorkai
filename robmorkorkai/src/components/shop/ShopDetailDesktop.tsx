import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Star, BadgeCheck, User, PenLine, ArrowLeft, Share2, ExternalLink } from "lucide-react";
import { TopNavbar } from "../layout/TopNavbar";
import type { ShopDetailProps } from "../pages/ShopDetailPage";

const ShopDetailDesktopView: React.FC<ShopDetailProps> = ({ 
    shop, 
    reviews, 
    verifiedOnly, 
    setVerifiedOnly, 
    isLoggedIn 
}) => {

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star 
                key={i} 
                size={16} 
                className={`${i < rating ? "text-warning fill-warning" : "text-muted opacity-50"}`} 
            />
        ));
    };

    return (
        <div className="bg-light min-vh-100 pb-5">
            {/* Header / Navbar */}
            <TopNavbar activePage="home" isLoggedIn={isLoggedIn} showSearchBar={true} />

            <div className="container py-4">
                
                {/* 1. Navigation & Actions */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/" className="text-decoration-none text-secondary d-flex align-items-center gap-2 hover-primary transition">
                        <ArrowLeft size={18} />
                        <span className="fw-medium">กลับหน้าหลัก</span>
                    </Link>
                    <button className="btn btn-white btn-sm rounded-pill shadow-sm d-flex align-items-center gap-2 px-3 border-0">
                        <Share2 size={16} /> แชร์ร้านนี้
                    </button>
                </div>

                {/* 2. Hero Image Banner */}
                <div className="position-relative mb-4 overflow-hidden rounded-4 shadow-sm" style={{ height: '400px' }}>
                    <img 
                        src={shop.image} 
                        alt={shop.name} 
                        className="w-100 h-100 object-fit-cover transition transform hover-scale-105" 
                    />
                    <div className="position-absolute bottom-0 start-0 w-100 p-5 rounded-bottom-4"
                        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                        <span className="badge bg-primary px-3 py-2 rounded-pill mb-2">{shop.category}</span>
                        <h1 className="text-white fw-bold display-5 m-0">{shop.name}</h1>
                    </div>
                </div>

                <div className="row g-4">
                    {/* --- ฝั่งซ้าย: เนื้อหาหลัก (Main Content) --- */}
                    <div className="col-lg-8">
                        
                        {/* คำอธิบายร้าน */}
                        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                            <h4 className="fw-bold mb-3">เกี่ยวกับร้าน</h4>
                            <p className="text-secondary fs-5 lh-base mb-0">
                                {shop.description || "ร้านนี้บรรยากาศดี เหมาะสำหรับการนั่งทำงานและอ่านหนังสือ มีปลั๊กไฟบริการทั่วถึง Wi-Fi แรง กาแฟรสชาติดีและราคาเป็นมิตรสำหรับนักศึกษา มข."}
                            </p>
                        </div>

                        {/* รีวิวและความคิดเห็น */}
                        <div className="mt-5 mb-4 d-flex align-items-center justify-content-between">
                            <h4 className="fw-bold m-0">💬 รีวิวจากเพื่อนนักศึกษา</h4>
                            <div className="d-flex align-items-center gap-2">
                                <span className="h4 fw-bold m-0">{shop.rating}</span>
                                <div className="d-flex">{renderStars(Math.round(shop.rating))}</div>
                                <span className="text-muted small">({shop.reviewCount} รีวิว)</span>
                            </div>
                        </div>

                        {/* Filter & Review List */}
                        <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
                            <div className="d-flex align-items-center justify-content-between px-2">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-primary text-white rounded-circle p-2 shadow-sm"><BadgeCheck size={20} /></div>
                                    <div>
                                        <h6 className="fw-bold m-0">กรองเฉพาะ Verified KKU</h6>
                                        <small className="text-muted">แสดงเฉพาะรีวิวจากนักศึกษาที่ยืนยันตัวตนแล้ว</small>
                                    </div>
                                </div>
                                <div className="form-check form-switch form-switch-lg">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        checked={verifiedOnly} 
                                        onChange={(e) => setVerifiedOnly(e.target.checked)}
                                        style={{ width: '2.5em', height: '1.25em', cursor: 'pointer' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-column gap-3">
                            {reviews.map((review) => (
                                <div key={review.id} className="card border-0 shadow-sm p-4 rounded-4 transition hover-shadow">
                                    <div className="d-flex gap-3">
                                        <div className="bg-light rounded-circle p-3 d-flex align-items-center justify-content-center text-secondary" style={{ width: '60px', height: '60px' }}>
                                            <User size={28} />
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex align-items-center justify-content-between mb-2">
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className="fw-bold text-dark">{review.email.split('@')[0]}</span>
                                                    {review.verified && (
                                                        <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2 border border-success border-opacity-25">
                                                            <BadgeCheck size={12} className="me-1" /> Verified
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="d-flex gap-1">{renderStars(review.rating)}</div>
                                            </div>
                                            <p className="text-secondary m-0 fs-5 lh-base">"{review.comment}"</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 mt-4 fs-5 transition hover-scale-102">
                            <PenLine size={20} /> เขียนรีวิวร้านนี้
                        </button>
                    </div>

                    {/* --- ฝั่งขวา: ข้อมูลร้าน (Sidebar) --- */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm p-4 rounded-4 sticky-top" style={{ top: '100px' }}>
                            <h5 className="fw-bold text-dark mb-4">ข้อมูลเบื้องต้น</h5>
                            
                            <div className="d-flex flex-column gap-4">
                                <div className="d-flex gap-3">
                                    <div className="bg-primary bg-opacity-10 p-2 rounded-3 text-primary h-100"><MapPin size={22} /></div>
                                    <div>
                                        <div className="fw-bold text-dark">ที่ตั้งโซน</div>
                                        <div className="text-secondary small">โซน{shop.zone} (กังสดาล/หลังมอ)</div>
                                    </div>
                                </div>
                                <div className="d-flex gap-3">
                                    <div className="bg-success bg-opacity-10 p-2 rounded-3 text-success h-100"><Clock size={22} /></div>
                                    <div>
                                        <div className="fw-bold text-dark">เวลาเปิด-ปิด</div>
                                        <div className="text-secondary small">{shop.openTime}</div>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4 opacity-10" />

                            <a 
                                href={shop.googleMap} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="btn btn-dark w-100 rounded-pill py-3 fw-bold d-flex align-items-center justify-content-center gap-2 mb-3"
                            >
                                <MapPin size={18} /> Google Maps <ExternalLink size={14} />
                            </a>

                            <button className="btn btn-outline-primary w-100 rounded-pill py-3 fw-bold">
                                บันทึกร้านโปรด
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopDetailDesktopView;