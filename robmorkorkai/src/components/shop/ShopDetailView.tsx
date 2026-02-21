import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ChevronLeft, MapPin, Clock, Star, Home, Bot, User, BadgeCheck,
    Search, Heart, Share2, Wifi, Car, Wind, BookOpen, Coffee,
    MessageSquare, ThumbsUp, ArrowUpRight, Navigation, Phone
} from "lucide-react";
import { BottomNav } from "../layout/BottomNav";

interface Props {
    shop: any; reviews: any[]; verifiedOnly: boolean; setVerifiedOnly: (val: boolean) => void;
    hasMore: boolean; handleShowMore: () => void; totalFilteredCount: number;
    onOpenReviewModal: () => void; isLoggedIn: boolean;
}

const shopAmenities = [
    { icon: Wifi, label: "Free WiFi", desc: "ความเร็วสูง" },
    { icon: Car, label: "ที่จอดรถ", desc: "20+ คัน" },
    { icon: Wind, label: "แอร์", desc: "ทั้งร้าน" },
    { icon: BookOpen, label: "มุมอ่านหนังสือ", desc: "เงียบสงบ" },
    { icon: Coffee, label: "เครื่องดื่ม", desc: "40+ เมนู" },
];

const ShopDetailView: React.FC<Props> = ({
    shop, reviews, verifiedOnly, setVerifiedOnly, hasMore, handleShowMore, totalFilteredCount, onOpenReviewModal, isLoggedIn
}) => {
    const navigate = useNavigate();
    const [isFavorited, setIsFavorited] = useState(false);
    const averageRating = shop.rating || 4.8;

    const renderStars = (rating: number, size = 16) => (
        Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={size} className={i < Math.floor(rating) ? "fill-warning text-warning" : "text-secondary opacity-25"} />
        ))
    );

    return (
        <div className="min-vh-100 bg-white" style={{ paddingBottom: '80px' }}>

            <style>{`
        .glass-btn { background: rgba(255,255,255,0.1); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2); color: white; }
        .glass-btn:hover { background: rgba(255,255,255,0.2); }
        .hero-gradient { background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.4) 100%); }
        .rating-bar-fill { background-color: #111827; height: 100%; border-radius: 99px; transition: width 0.5s ease; }
        .sticky-sidebar { position: sticky; top: 24px; }
      `}</style>

            {/* ======================= HERO SECTION ======================= */}
            <section className="position-relative overflow-hidden" style={{ height: '70vh', minHeight: '500px' }}>
                <img src={shop.image} alt={shop.name} className="w-100 h-100 object-fit-cover" />
                <div className="position-absolute inset-0 hero-gradient"></div>

                {/* Top Nav (Overlay) */}
                <div className="position-absolute top-0 start-0 w-100 z-3 pt-4 px-3 px-lg-5 d-flex justify-content-between align-items-center">
                    <button onClick={() => navigate(-1)} className="btn btn-link text-white text-decoration-none d-flex align-items-center gap-2 p-0 opacity-75 hover-opacity-100">
                        <div className="rounded-circle p-2 d-flex align-items-center justify-content-center glass-btn"><ChevronLeft size={20} /></div>
                        <span className="d-none d-lg-block small fw-medium text-white">กลับหน้าแรก</span>
                    </button>

                    {/* Desktop Nav */}
                    <nav className="d-none d-lg-flex align-items-center gap-2">
                        <Link to="/" className="btn btn-link text-white-50 hover-text-white text-decoration-none d-flex align-items-center gap-2 small"><Home size={16} /> Home</Link>
                        <Link to="/search" className="btn btn-link text-white-50 hover-text-white text-decoration-none d-flex align-items-center gap-2 small"><Search size={16} /> Search</Link>
                        <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.2)' }} className="mx-2"></div>
                        {isLoggedIn ? (
                            <Link to="/profile"><img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100" className="rounded-circle border border-2 border-white" width="36" height="36" alt="Profile" /></Link>
                        ) : (
                            <Link to="/login" className="btn btn-light rounded-pill px-4 btn-sm fw-bold">เข้าสู่ระบบ</Link>
                        )}
                    </nav>

                    {/* Mobile Actions */}
                    <div className="d-lg-none d-flex gap-2">
                        <button onClick={() => setIsFavorited(!isFavorited)} className="btn rounded-circle p-2 glass-btn d-flex align-items-center justify-content-center">
                            <Heart size={20} className={isFavorited ? "fill-danger text-danger border-0" : ""} />
                        </button>
                        <button className="btn rounded-circle p-2 glass-btn d-flex align-items-center justify-content-center"><Share2 size={20} /></button>
                    </div>
                </div>

                {/* Hero Content (Bottom) */}
                <div className="position-absolute bottom-0 start-0 w-100 z-3 px-4 px-lg-5 pb-4 pb-lg-5">
                    <div style={{ maxWidth: '900px' }}>

                        <div className="d-flex flex-wrap items-center gap-2 mb-3">
                            <span className="badge rounded-pill d-flex align-items-center gap-1 fw-bold glass-btn" style={{ padding: '6px 12px' }}>
                                <BadgeCheck size={14} /> Verified
                            </span>
                            <span className="badge rounded-pill fw-medium glass-btn" style={{ padding: '6px 12px' }}>{shop.category}</span>
                            <span className="badge rounded-pill fw-bold" style={{ backgroundColor: 'rgba(16, 185, 129, 0.9)', padding: '6px 12px' }}>เปิดอยู่</span>
                        </div>

                        <h1 className="fw-bolder text-white mb-3 tracking-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: '1.1' }}>
                            {shop.name}
                        </h1>

                        <p className="text-white-50 mb-4 lh-lg" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', maxWidth: '600px' }}>
                            {shop.description || "พื้นที่สำหรับคนรักหนังสือและกาแฟ บรรยากาศอบอุ่น เงียบสงบ เหมาะแก่การอ่านหนังสือ ทำงาน และพักผ่อน ใกล้ประตูหน้า มข."}
                        </p>

                        <div className="d-flex flex-wrap align-items-center gap-3 gap-lg-4 text-white-50 small fw-medium">
                            <div className="d-flex align-items-center gap-2 text-white">
                                <Star size={18} className="fill-warning text-warning" />
                                <span className="fs-5 fw-bold">{averageRating}</span>
                                <span className="text-white-50 fw-normal">({totalFilteredCount} รีวิว)</span>
                            </div>
                            <div className="d-none d-sm-block" style={{ width: '1px', height: '16px', backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
                            <div className="d-flex align-items-center gap-2"><MapPin size={16} /> โซน{shop.zone}</div>
                            <div className="d-none d-sm-block" style={{ width: '1px', height: '16px', backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
                            <div className="d-none d-sm-flex align-items-center gap-2"><Clock size={16} /> {shop.openHours || "10:00 - 00:00 น."}</div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ======================= IMAGE STRIP (Desktop) ======================= */}
            <section className="d-none d-lg-block border-bottom border-light-subtle">
                <div className="container py-4" style={{ maxWidth: '1140px' }}>
                    <div className="d-flex gap-3">
                        {[shop.image, shop.image, shop.image].map((img, idx) => (
                            <div key={idx} className="flex-grow-1 rounded-4 overflow-hidden" style={{ height: '120px', opacity: idx === 0 ? 1 : 0.6 }}>
                                <img src={img} className="w-100 h-100 object-fit-cover hover-scale" alt={`gallery-${idx}`} />
                            </div>
                        ))}
                        <button className="btn btn-light rounded-4 d-flex flex-column align-items-center justify-content-center text-muted border" style={{ width: '120px' }}>
                            <span className="fw-bold small mb-1">ดูทั้งหมด</span>
                            <ArrowUpRight size={18} />
                        </button>
                    </div>
                </div>
            </section>

            {/* ======================= MAIN CONTENT ======================= */}
            <main className="container py-4 py-lg-5" style={{ maxWidth: '1140px' }}>
                <div className="row g-5">

                    {/* 👈 LEFT COLUMN */}
                    <div className="col-12 col-lg-8">

                        {/* สิ่งอำนวยความสะดวก */}
                        <section className="pb-5 border-bottom border-light-subtle">
                            <h6 className="text-muted fw-bold text-uppercase tracking-wider mb-4" style={{ fontSize: '0.75rem', letterSpacing: '2px' }}>สิ่งอำนวยความสะดวก</h6>
                            <div className="row g-3">
                                {shopAmenities.map((amenity, idx) => {
                                    const Icon = amenity.icon;
                                    return (
                                        <div className="col-6 col-sm-4" key={idx}>
                                            <div className="d-flex align-items-center gap-3 p-3 rounded-4 bg-light border border-light-subtle transition-all hover-shadow">
                                                <div className="bg-white rounded-3 p-2 shadow-sm"><Icon size={20} className="text-dark" /></div>
                                                <div>
                                                    <p className="m-0 fw-bold text-dark" style={{ fontSize: '0.85rem' }}>{amenity.label}</p>
                                                    <small className="text-muted" style={{ fontSize: '0.7rem' }}>{amenity.desc}</small>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* เกี่ยวกับร้าน */}
                        <section className="py-5 border-bottom border-light-subtle">
                            <h6 className="text-muted fw-bold text-uppercase tracking-wider mb-4" style={{ fontSize: '0.75rem', letterSpacing: '2px' }}>เกี่ยวกับร้าน</h6>
                            <p className="text-dark lh-lg m-0" style={{ fontSize: '1rem' }}>
                                {shop.description || `${shop.name} เป็นคาเฟ่สไตล์ห้องสมุดที่ตั้งอยู่ในโซนกังสดาล ใกล้ประตูหน้ามหาวิทยาลัยขอนแก่น บรรยากาศเงียบสงบ เหมาะสำหรับการอ่านหนังสือ ทำงาน และพักผ่อน มีเครื่องดื่มกว่า 40 เมนูให้เลือก พร้อม WiFi ความเร็วสูง ปลั๊กไฟทุกโต๊ะ และที่จอดรถ`}
                            </p>
                        </section>

                        {/* รีวิว */}
                        <section className="py-5">
                            <div className="d-flex align-items-end justify-content-between mb-5">
                                <div>
                                    <h6 className="text-muted fw-bold text-uppercase tracking-wider mb-3" style={{ fontSize: '0.75rem', letterSpacing: '2px' }}>รีวิวและความเห็น</h6>
                                    <div className="d-flex align-items-baseline gap-3">
                                        <span className="fw-bolder text-dark tracking-tight" style={{ fontSize: '4rem', lineHeight: '1' }}>{averageRating}</span>
                                        <div>
                                            <div className="d-flex gap-1">{renderStars(averageRating, 18)}</div>
                                            <p className="text-muted m-0 mt-2 small fw-medium">จาก {totalFilteredCount} รีวิว</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-lg-none">
                                    <button onClick={onOpenReviewModal} className="btn btn-dark rounded-pill px-4 py-2 fw-bold">เขียนรีวิว</button>
                                </div>
                            </div>

                            {/* Filter */}
                            <div className="d-flex align-items-center justify-content-between p-3 p-md-4 rounded-4 border border-light-subtle mb-4 bg-light">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-white p-2 rounded-circle shadow-sm"><BadgeCheck size={20} className="text-dark" /></div>
                                    <div>
                                        <p className="fw-bold text-dark m-0 small">เฉพาะ Verified KKU</p>
                                        <small className="text-muted" style={{ fontSize: '0.7rem' }}>รีวิวจากนักศึกษา มข. เท่านั้น</small>
                                    </div>
                                </div>
                                <div className="form-check form-switch m-0">
                                    <input className="form-check-input" type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} style={{ width: '40px', height: '20px', cursor: 'pointer' }} />
                                </div>
                            </div>

                            {/* Review List */}
                            <div className="d-flex flex-column gap-0">
                                {reviews.map((review, index) => (
                                    <div key={review.id} className={`py-4 ${index < reviews.length - 1 ? "border-bottom border-light-subtle" : ""}`}>
                                        <div className="d-flex gap-3 gap-md-4 align-items-start">
                                            <div className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0 shadow-sm" style={{ width: '45px', height: '45px' }}>
                                                {review.userName?.charAt(0) || "U"}
                                            </div>
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="fw-bold text-dark">{review.userName || review.email}</span>
                                                        {review.verified && <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2 py-1 d-flex align-items-center gap-1" style={{ fontSize: '0.65rem' }}><BadgeCheck size={12} /> KKU</span>}
                                                    </div>
                                                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>{review.date}</span>
                                                </div>
                                                <div className="d-flex gap-1 mb-3">{renderStars(review.rating, 14)}</div>
                                                <p className="text-secondary lh-base mb-3" style={{ fontSize: '0.95rem' }}>{review.comment}</p>
                                                <div className="d-flex gap-4">
                                                    <button className="btn btn-link p-0 text-muted text-decoration-none small d-flex align-items-center gap-2 hover-text-dark"><ThumbsUp size={14} /> เป็นประโยชน์</button>
                                                    <button className="btn btn-link p-0 text-muted text-decoration-none small hover-text-dark">ตอบกลับ</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {hasMore && (
                                <div className="text-center mt-4">
                                    <button onClick={handleShowMore} className="btn btn-outline-dark rounded-pill px-5 py-2 fw-bold">โหลดรีวิวเพิ่มเติม</button>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* 👉 RIGHT COLUMN (SIDEBAR - Desktop Only) */}
                    <aside className="col-12 col-lg-4 d-none d-lg-block">
                        <div className="sticky-sidebar d-flex flex-column gap-4">

                            {/* Quick Info Box */}
                            <div className="card border border-light-subtle rounded-4 p-4 p-lg-5 shadow-sm bg-white">
                                <h6 className="text-muted fw-bold text-uppercase tracking-wider mb-4" style={{ fontSize: '0.75rem', letterSpacing: '2px' }}>ข้อมูลร้าน</h6>
                                <div className="d-flex flex-column gap-4">
                                    <div className="d-flex gap-3">
                                        <div className="bg-light rounded-3 p-3 flex-shrink-0"><MapPin size={20} className="text-dark" /></div>
                                        <div>
                                            <p className="fw-bold text-dark m-0 small mb-1">ที่ตั้ง</p>
                                            <p className="text-secondary m-0" style={{ fontSize: '0.85rem' }}>โซน{shop.zone}, ขอนแก่น</p>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-3">
                                        <div className="bg-light rounded-3 p-3 flex-shrink-0"><Clock size={20} className="text-dark" /></div>
                                        <div>
                                            <p className="fw-bold text-dark m-0 small mb-1">เวลาเปิด-ปิด</p>
                                            <p className="text-secondary m-0" style={{ fontSize: '0.85rem' }}>{shop.openHours || "10:00 - 00:00 น."}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-3">
                                        <div className="bg-light rounded-3 p-3 flex-shrink-0"><Phone size={20} className="text-dark" /></div>
                                        <div>
                                            <p className="fw-bold text-dark m-0 small mb-1">ติดต่อ</p>
                                            <p className="text-secondary m-0" style={{ fontSize: '0.85rem' }}>{shop.phone || "081-234-5678"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions Box */}
                            <div className="d-flex flex-column gap-2">
                                <button onClick={onOpenReviewModal} className="btn btn-dark rounded-pill py-3 fw-bold d-flex justify-content-center align-items-center gap-2 shadow-sm">
                                    <MessageSquare size={18} /> เขียนรีวิว
                                </button>
                                <div className="d-flex gap-2">
                                    <button onClick={() => setIsFavorited(!isFavorited)} className={`btn w-100 rounded-pill py-3 fw-bold d-flex justify-content-center align-items-center gap-2 transition-all ${isFavorited ? 'btn-danger bg-opacity-10 text-danger border-danger' : 'btn-outline-dark'}`}>
                                        <Heart size={18} className={isFavorited ? "fill-danger" : ""} /> {isFavorited ? "บันทึกแล้ว" : "บันทึกร้าน"}
                                    </button>
                                    <button className="btn btn-outline-dark rounded-pill px-4"><Share2 size={18} /></button>
                                </div>
                            </div>

                        </div>
                    </aside>

                </div>
            </main>

            {/* Mobile Bottom Nav */}
            <div className="d-lg-none">
                <BottomNav activePage="home" />
            </div>
        </div>
    );
};

export default ShopDetailView;