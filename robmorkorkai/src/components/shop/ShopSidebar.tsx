import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Star, MessageSquare, Heart, Share2, ArrowUpRight, TicketPlus } from "lucide-react";
import type { Shop } from "../../types/shop";

interface ShopSidebarProps {
    shop: Shop;
    averageRating: string | number;
    reviewsCount: number;
    isLoggedIn: boolean;
    isFavorited: boolean;
    onToggleFavorite: () => void;
    onOpenReviewModal: () => void;
}

export const ShopSidebar: React.FC<ShopSidebarProps> = ({
    shop, averageRating, reviewsCount, isLoggedIn, isFavorited, onToggleFavorite, onOpenReviewModal
}) => {
    const handleOpenGoogleMaps = () => {
        if (shop.latitude && shop.longitude) {
            const mapUrl = `https://www.google.com/maps?q=${shop.latitude},${shop.longitude}`;
            window.open(mapUrl, "_blank");
        } else {
            alert("ขออภัย ยังไม่มีลิงก์แผนที่สำหรับร้านนี้ครับ");
        }
    };

    return (
        <aside className="col-12 col-lg-4 d-none d-lg-block">
            <div className="position-sticky d-flex flex-column gap-4" style={{ top: '30px' }}>
                
                {/* ข้อมูลร้าน Card */}
                <div className="card rounded-4 p-4 shadow-sm" style={{ backgroundColor: '#231c18', border: '1px solid #3d302a' }}>
                    <h6 className="fw-bold text-uppercase tracking-wider mb-4" style={{ fontSize: '0.75rem', letterSpacing: '2px', color: '#c9943a' }}>ข้อมูลร้าน</h6>
                    <div className="d-flex flex-column gap-4">
                        
                        {/* ที่ตั้ง */}
                        <div className="d-flex gap-3">
                            <div className="rounded-3 p-3 flex-shrink-0 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#2d2320', width: '48px', height: '48px' }}>
                                <MapPin size={20} style={{ color: '#e8b94a' }} />
                            </div>
                            <div>
                                <p className="fw-bold m-0 small mb-1" style={{ color: '#f5ebe4' }}>ที่ตั้ง</p>
                                <p className="m-0" style={{ fontSize: '0.85rem', color: '#9a8a7e' }}>โซน{shop.zone}, ขอนแก่น</p>
                            </div>
                        </div>

                        {/* เวลาเปิด-ปิด */}
                        <div className="d-flex gap-3">
                            <div className="rounded-3 p-3 flex-shrink-0 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#2d2320', width: '48px', height: '48px' }}>
                                <Clock size={20} style={{ color: '#e8b94a' }} />
                            </div>
                            <div>
                                <p className="fw-bold m-0 small mb-1" style={{ color: '#f5ebe4' }}>เวลาเปิด-ปิด</p>
                                <p className="m-0 mb-1" style={{ fontSize: '0.85rem', color: '#9a8a7e' }}>{shop.openHours}</p>
                                <span className="badge rounded-pill px-2 py-1" style={{ fontSize: '0.65rem', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                    เปิดอยู่
                                </span>
                            </div>
                        </div>

                        {/* คะแนนรีวิว */}
                        <div className="d-flex gap-3">
                            <div className="rounded-3 p-3 flex-shrink-0 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#2d2320', width: '48px', height: '48px' }}>
                                <Star size={20} style={{ color: '#e8b94a' }} />
                            </div>
                            <div>
                                <p className="fw-bold m-0 small mb-1" style={{ color: '#f5ebe4' }}>คะแนนรีวิว</p>
                                <p className="m-0" style={{ fontSize: '0.85rem', color: '#9a8a7e' }}>{averageRating} / 5 ({reviewsCount} รีวิว)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {isLoggedIn ? (
                    <div className="d-flex flex-column gap-2">
                        <button onClick={onOpenReviewModal} className="btn rounded-pill py-3 fw-medium d-flex justify-content-center align-items-center gap-2 hover-scale shadow-sm border-0" style={{ backgroundColor: '#A73B24', color: '#fff5f0' }}>
                            <MessageSquare size={18} /> เขียนรีวิว
                        </button>
                        <div className="d-flex gap-2">
                            <button 
                                onClick={onToggleFavorite} 
                                className="btn flex-grow-1 rounded-pill py-3 fw-medium d-flex justify-content-center align-items-center gap-2 transition-all hover-scale"
                                style={{ 
                                    backgroundColor: isFavorited ? 'rgba(167, 59, 36, 0.15)' : '#2d2320', 
                                    color: isFavorited ? '#A73B24' : '#e8b94a', 
                                    border: isFavorited ? '1px solid #A73B24' : '1px dashed rgba(201, 148, 58, 0.4)'
                                }}
                            >
                                <Heart size={18} className={isFavorited ? "fill-danger" : ""} style={{ color: isFavorited ? '#A73B24' : '#e8b94a' }} /> 
                                {isFavorited ? "บันทึกแล้ว" : "บันทึก"}
                            </button>
                            <button className="btn rounded-pill px-4 hover-scale" title="share" style={{ backgroundColor: '#2d2320', color: '#e8b94a', border: '1px dashed rgba(201, 148, 58, 0.4)' }}>
                                <Share2 size={18} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="card rounded-4 p-4 text-center shadow-sm" style={{ backgroundColor: '#231c18', border: '1px dashed rgba(201, 148, 58, 0.4)' }}>
                        <p className="small mb-4" style={{ color: '#9a8a7e' }}>เข้าสู่ระบบเพื่อรีวิวร้านค้าและบันทึกร้านโปรด</p>
                        <Link to="/login" className="btn w-100 rounded-pill py-3 fw-bold hover-scale" style={{ backgroundColor: '#e8b94a', color: '#1a1412' }}>
                            เข้าสู่ระบบด้วย Google
                        </Link>
                    </div>
                )}

                {/* แผนที่ */}
                <div className="card rounded-4 overflow-hidden shadow-sm" style={{ backgroundColor: '#231c18', border: '1px solid #3d302a' }}>
                    
                    {shop.latitude && shop.longitude ? (
                        <iframe
                            title="Shop Location"
                            width="100%"
                            height="160"
                            style={{ border: 0, filter: 'contrast(1.2) opacity(0.8)' }}
                            loading="lazy"
                            allowFullScreen
                            src={`https://maps.google.com/maps?q=${shop.latitude},${shop.longitude}&hl=th&z=15&output=embed`}
                        ></iframe>
                    ) : (
                        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '160px', backgroundColor: '#2d2320', color: '#8a7b72' }}>
                            <MapPin size={32} className="opacity-50 mb-2" style={{ color: '#c9943a' }} />
                            <span className="small fw-medium">ไม่มีข้อมูลพิกัด</span>
                        </div>
                    )}

                    <div className="p-3">
                        <p className="fw-bold m-0 small" style={{ color: '#f5ebe4' }}>Zone {shop.zone}</p>
                        <button onClick={handleOpenGoogleMaps} className="btn btn-sm w-100 rounded-pill mt-3 d-flex justify-content-center align-items-center gap-1 hover-scale border-0" style={{ backgroundColor: '#A73B24', color: '#fff5f0' }}>
                            <MapPin size={12} /> เปิดแผนที่ <ArrowUpRight size={12} />
                        </button>
                    </div>
                </div>

            </div>
        </aside>
    );
};