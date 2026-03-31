import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Star, MessageSquare, Heart, Share2 } from "lucide-react";
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
    return (
        <div className="d-flex flex-column gap-4 w-100 h-100 justify-content-center">
            
            <h6 className="fw-bold text-uppercase tracking-wider mb-2" style={{ fontSize: '1rem', letterSpacing: '2px', color: '#c9943a' }}>ข้อมูลร้านและการติดต่อ</h6>
            
            {/* ข้อมูลร้าน Card */}
            <div className="card rounded-4 p-1 shadow-sm border-0 bg-transparent">
                <div className="d-flex flex-column gap-4">
                    
                    {/* ที่ตั้ง */}
                    <div className="d-flex gap-3 align-items-center">
                        <div className="rounded-circle p-3 flex-shrink-0 d-flex align-items-center justify-content-center shadow-sm" style={{ backgroundColor: '#2d2320', width: '56px', height: '56px', border: '1px solid #3d302a' }}>
                            <MapPin size={24} style={{ color: '#e8b94a' }} />
                        </div>
                        <div>
                            <p className="fw-bold m-0 mb-1" style={{ color: '#f5ebe4', fontSize: '1rem' }}>ที่ตั้ง</p>
                            <p className="m-0" style={{ fontSize: '0.95rem', color: '#9a8a7e' }}>{shop.address ? `${shop.address}` : "ไม่มีข้อมูล"}</p>
                        </div>
                    </div>

                    {/* เวลาเปิด-ปิด */}
                    <div className="d-flex gap-3 align-items-center">
                        <div className="rounded-circle p-3 flex-shrink-0 d-flex align-items-center justify-content-center shadow-sm" style={{ backgroundColor: '#2d2320', width: '56px', height: '56px', border: '1px solid #3d302a' }}>
                            <Clock size={24} style={{ color: '#e8b94a' }} />
                        </div>
                        <div>
                            <p className="fw-bold m-0 mb-1" style={{ color: '#f5ebe4', fontSize: '1rem' }}>เวลาทำการ</p>
                            <div className="d-flex align-items-center gap-2">
                                <p className="m-0" style={{ fontSize: '0.95rem', color: '#9a8a7e' }}>{shop.openHours}</p>
                                <span className="badge rounded-pill px-2 py-1" style={{ fontSize: '0.7rem', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                    เปิดอยู่
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* คะแนนรีวิว */}
                    <div className="d-flex gap-3 align-items-center">
                        <div className="rounded-circle p-3 flex-shrink-0 d-flex align-items-center justify-content-center shadow-sm" style={{ backgroundColor: '#2d2320', width: '56px', height: '56px', border: '1px solid #3d302a' }}>
                            <Star size={24} style={{ color: '#e8b94a' }} />
                        </div>
                        <div>
                            <p className="fw-bold m-0 mb-1" style={{ color: '#f5ebe4', fontSize: '1rem' }}>คะแนนรีวิว</p>
                            <p className="m-0" style={{ fontSize: '0.95rem', color: '#9a8a7e' }}>{averageRating} / 5 <span style={{fontSize: '0.85rem'}}>({reviewsCount} รีวิว)</span></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 👇 ส่วนของปุ่ม Action (จัดให้อยู่ในแถวเดียวกัน) */}
            <div className="mt-2">
                {isLoggedIn ? (
                    <div className="d-flex gap-2 w-100 flex-wrap flex-sm-nowrap">
                        <button onClick={onOpenReviewModal} className="btn flex-grow-1 rounded-pill py-3 fw-bold d-flex justify-content-center align-items-center gap-2 hover-scale shadow-sm border-0" style={{ backgroundColor: '#A73B24', color: '#fff5f0', fontSize: '0.9rem' }}>
                            <MessageSquare size={18} /> รีวิว
                        </button>
                        
                        <button 
                            onClick={onToggleFavorite} 
                            className="btn flex-grow-1 rounded-pill py-3 fw-bold d-flex justify-content-center align-items-center gap-2 transition-all hover-scale shadow-sm"
                            style={{ 
                                backgroundColor: isFavorited ? 'rgba(167, 59, 36, 0.15)' : '#2d2320', 
                                color: isFavorited ? '#A73B24' : '#e8b94a', 
                                border: isFavorited ? '1px solid #A73B24' : '1px solid #3d302a',
                                fontSize: '0.9rem'
                            }}
                        >
                            <Heart size={18} className={isFavorited ? "fill-danger" : ""} style={{ color: isFavorited ? '#A73B24' : '#e8b94a' }} /> 
                            {isFavorited ? "บันทึกแล้ว" : "บันทึก"}
                        </button>

                        <button className="btn rounded-pill px-4 hover-scale shadow-sm flex-shrink-0" title="แชร์ร้านนี้" style={{ backgroundColor: '#2d2320', color: '#e8b94a', border: '1px solid #3d302a' }}>
                            <Share2 size={18} />
                        </button>
                    </div>
                ) : (
                    <div className="card rounded-4 p-4 text-center shadow-sm" style={{ backgroundColor: '#231c18', border: '1px dashed rgba(201, 148, 58, 0.4)' }}>
                        <p className="mb-4" style={{ color: '#9a8a7e', fontSize: '0.95rem' }}>เข้าสู่ระบบเพื่อรีวิวร้านค้าและบันทึกร้านโปรด</p>
                        <Link to="/login" className="btn w-100 rounded-pill py-3 fw-bold hover-scale shadow-sm" style={{ backgroundColor: '#e8b94a', color: '#1a1412' }}>
                            เข้าสู่ระบบด้วย Google
                        </Link>
                    </div>
                )}
            </div>
            
        </div>
    );
};