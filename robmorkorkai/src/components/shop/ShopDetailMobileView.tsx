import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, MapPin, Clock, Star, BadgeCheck, User, PenLine, Navigation, Share2 } from "lucide-react";
import { BottomNav } from "../layout/BottomNav";
import type { ShopDetailProps } from "../pages/ShopDetailPage";

const ShopDetailMobileView: React.FC<ShopDetailProps> = ({ 
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
                size={14} 
                className={`${i < rating ? "text-warning fill-warning" : "text-muted"}`} 
            />
        ));
    };

    return (
        <div className="bg-white min-vh-100 pb-5">

            {/* --- 1. Header Image & Icons --- */}
            <div className="position-relative">
                <img 
                    src={shop.image} 
                    alt={shop.name} 
                    className="w-100 object-fit-cover" 
                    style={{ height: '260px' }} 
                />

                {/* Top Bar Icons */}
                <div className="position-absolute top-0 start-0 end-0 p-3 d-flex justify-content-between align-items-center">
                    <Link
                        to="/"
                        className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm text-dark border-0"
                        style={{ width: 40, height: 40, textDecoration: 'none' }}
                    >
                        <ChevronLeft size={24} />
                    </Link>

                    <div className="d-flex gap-2">
                        <button 
                            className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm text-dark border-0" 
                            style={{ width: 40, height: 40 }}
                        >
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Container หลัก --- */}
            <div className="container py-0 px-3" style={{ marginTop: '-20px', marginBottom: '80px' }}>

                {/* --- 2. Main Shop Card (การ์ดชื่อร้านที่ลอยขึ้นมา) --- */}
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4 position-relative">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                            <h2 className="fw-bold text-dark m-0 mb-1" style={{ fontSize: '1.5rem' }}>{shop.name}</h2>
                            <p className="text-secondary small m-0">{shop.category}</p>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                            <div className="d-flex align-items-center gap-1 text-warning fw-bold">
                                <Star size={16} className="fill-warning" />
                                <span>{shop.rating}</span>
                            </div>
                            <small className="text-muted" style={{ fontSize: '0.75rem' }}>({shop.reviewCount} รีวิว)</small>
                        </div>
                    </div>

                    <hr className="text-muted opacity-10 my-3" />

                    {/* ข้อมูลพื้นฐานร้าน */}
                    <div className="d-flex flex-column gap-3">
                        <div className="d-flex align-items-start gap-3">
                            <MapPin className="text-primary mt-1 flex-shrink-0" size={20} />
                            <div>
                                <span className="fw-bold text-dark d-block">โซน{shop.zone}</span>
                                <small className="text-secondary">ใกล้ประตูทางออก ฝั่งกังสดาล</small>
                            </div>
                        </div>
                        <div className="d-flex align-items-start gap-3">
                            <Clock className="text-success mt-1 flex-shrink-0" size={20} />
                            <div>
                                <span className="fw-bold text-success d-block">เปิด {shop.openTime}</span>
                            </div>
                        </div>
                    </div>

                    {/* ปุ่มนำทาง (Google Maps) */}
                    <a 
                        href={shop.googleMap} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn btn-outline-primary w-100 rounded-pill mt-4 fw-bold d-flex align-items-center justify-content-center gap-2 py-2"
                    >
                        <Navigation size={18} /> นำทาง (Google Maps)
                    </a>
                </div>

                {/* --- 3. About Section (คำอธิบายร้าน) --- */}
                <div className="mb-4 px-1">
                    <h5 className="fw-bold text-dark mb-2">เกี่ยวกับร้าน</h5>
                    <p className="text-secondary small lh-base">
                        {shop.description || "ร้านนี้บรรยากาศดี เหมาะสำหรับการนั่งทำงานและอ่านหนังสือ มีปลั๊กไฟบริการทั่วถึง Wi-Fi แรง กาแฟรสชาติดีและราคาเป็นมิตรสำหรับนักศึกษา"}
                    </p>
                </div>

                {/* --- 4. Reviews Section --- */}
                <div className="px-1">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h5 className="fw-bold m-0 d-flex align-items-center gap-2">💬 รีวิวล่าสุด</h5>
                        <button className="btn btn-link text-decoration-none p-0 small text-primary">ดูทั้งหมด</button>
                    </div>

                    {/* Filter Toggle */}
                    <div className="card border-0 bg-primary bg-opacity-10 mb-4 rounded-4 shadow-none">
                        <div className="card-body py-3 d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-2">
                                <div className="bg-primary text-white rounded p-1 d-flex"><BadgeCheck size={16} /></div>
                                <div className="fw-bold small text-primary">Verified KKU Mail</div>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input" 
                                    type="checkbox" 
                                    role="switch"
                                    checked={verifiedOnly} 
                                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Review List */}
                    <div className="d-flex flex-column gap-3 mb-4">
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <div key={review.id} className="card border-0 shadow-sm p-3 rounded-4 bg-light">
                                    <div className="d-flex gap-3">
                                        <div className="bg-white rounded-circle p-2 shadow-sm d-flex align-items-center justify-content-center text-secondary" style={{ width: 40, height: 40 }}>
                                            <User size={20} />
                                        </div>
                                        <div className="w-100">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <span className="fw-bold small text-dark text-truncate" style={{ maxWidth: '120px' }}>
                                                    {review.email.split('@')[0]}
                                                </span>
                                                <span className="text-muted" style={{ fontSize: '10px' }}>2 วันที่แล้ว</span>
                                            </div>
                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                <div className="d-flex gap-0 text-warning">{renderStars(review.rating)}</div>
                                                {review.verified && <BadgeCheck size={12} className="text-success" />}
                                            </div>
                                            <p className="text-secondary small m-0 lh-sm">"{review.comment}"</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-4 text-muted">ไม่พบรีวิวที่ต้องการ</div>
                        )}
                    </div>

                    {/* Write Review Button */}
                    <button className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 mb-4">
                        <PenLine size={18} /> เขียนรีวิว
                    </button>
                </div>

            </div>

            {/* Bottom Navigation */}
            <BottomNav activePage="home" isLoggedIn={isLoggedIn} />
        </div>
    );
};

export default ShopDetailMobileView;