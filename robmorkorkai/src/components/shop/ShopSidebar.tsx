import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Star, MessageSquare, Heart, Share2, ArrowUpRight } from "lucide-react";
import type { Shop } from "../../types/shop";

interface ShopSidebarProps {
    shop: Shop;
    averageRating: string | number;
    reviewsCount: number;
    isLoggedIn: boolean;
    isFavorited: boolean;
    setIsFavorited: (val: boolean) => void;
    onOpenReviewModal: () => void;
}

export const ShopSidebar: React.FC<ShopSidebarProps> = ({
    shop, averageRating, reviewsCount, isLoggedIn, isFavorited, setIsFavorited, onOpenReviewModal
}) => {
    return (
        <aside className="col-12 col-lg-4 d-none d-lg-block">
            <div className="position-sticky d-flex flex-column gap-4" style={{ top: '30px' }}>
                <div className="card border-light-subtle rounded-4 p-4 shadow-sm">
                    <h6 className="text-muted fw-bold text-uppercase tracking-wider mb-4" style={{ fontSize: '0.75rem', letterSpacing: '2px' }}>ข้อมูลร้าน</h6>
                    <div className="d-flex flex-column gap-4">
                        <div className="d-flex gap-3"><div className="bg-light rounded-3 p-3 flex-shrink-0"><MapPin size={18} className="text-dark" /></div><div><p className="fw-bold text-dark m-0 small mb-1">ที่ตั้ง</p><p className="text-secondary m-0" style={{ fontSize: '0.85rem' }}>โซน{shop.zone}, ขอนแก่น</p></div></div>
                        <div className="d-flex gap-3"><div className="bg-light rounded-3 p-3 flex-shrink-0"><Clock size={18} className="text-dark" /></div><div><p className="fw-bold text-dark m-0 small mb-1">เวลาเปิด-ปิด</p><p className="text-secondary m-0 mb-1" style={{ fontSize: '0.85rem' }}>{shop.openHours}</p><span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2 py-1" style={{ fontSize: '0.65rem' }}>เปิดอยู่</span></div></div>
                        <div className="d-flex gap-3"><div className="bg-light rounded-3 p-3 flex-shrink-0"><Star size={18} className="text-dark" /></div><div><p className="fw-bold text-dark m-0 small mb-1">คะแนนรีวิว</p><p className="text-secondary m-0" style={{ fontSize: '0.85rem' }}>{averageRating} / 5 ({reviewsCount} รีวิว)</p></div></div>
                    </div>
                </div>

                {isLoggedIn ? (
                    <div className="d-flex flex-column gap-2">
                        <button onClick={onOpenReviewModal} className="btn btn-dark rounded-pill py-3 fw-medium d-flex justify-content-center align-items-center gap-2"><MessageSquare size={18} /> เขียนรีวิว</button>
                        <div className="d-flex gap-2">
                            <button onClick={() => setIsFavorited(!isFavorited)} className={`btn flex-grow-1 rounded-pill py-3 fw-medium d-flex justify-content-center align-items-center gap-2 transition-all ${isFavorited ? 'btn-danger bg-opacity-10 text-danger border-danger' : 'btn-outline-secondary'}`}><Heart size={18} className={isFavorited ? "fill-danger" : ""} /> {isFavorited ? "บันทึกแล้ว" : "บันทึก"}</button>
                            <button className="btn btn-outline-secondary rounded-pill px-4"><Share2 size={18} /></button>
                        </div>
                    </div>
                ) : (
                    <div className="card border-light-subtle rounded-4 p-4 text-center">
                        <p className="text-muted small mb-4">เข้าสู่ระบบเพื่อรีวิวร้านค้าและบันทึกร้านโปรด</p>
                        <Link to="/login" className="btn btn-dark w-100 rounded-pill py-3 fw-medium">เข้าสู่ระบบด้วย Google</Link>
                    </div>
                )}

                <div className="card border-light-subtle rounded-4 overflow-hidden">
                    <div className="bg-light d-flex flex-column align-items-center justify-content-center text-muted" style={{ height: '160px' }}><MapPin size={32} className="opacity-25 mb-2" /><span className="small fw-medium">แผนที่</span></div>
                    <div className="p-3">
                        <p className="fw-bold text-dark m-0 small">โซน{shop.zone}</p>
                        <a href={shop.googleMap || "#"} target="_blank" rel="noreferrer" className="btn btn-outline-secondary btn-sm w-100 rounded-pill mt-3 d-flex justify-content-center align-items-center gap-1"><MapPin size={12} /> เปิดแผนที่ <ArrowUpRight size={12} /></a>
                    </div>
                </div>
            </div>
        </aside>
    );
};