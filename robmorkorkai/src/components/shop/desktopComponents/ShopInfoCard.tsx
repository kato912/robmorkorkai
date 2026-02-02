import React from "react";
import { Share2, Heart, Star, MapPin, Clock, PenLine } from "lucide-react";
import type { Shop } from "../../../data/mockDatat";

interface ShopInfoCardProps {
    shop: Shop;
    totalFilteredCount: number;
    onOpenReviewModal: () => void;
}

export const ShopInfoCard: React.FC<ShopInfoCardProps> = ({ shop, totalFilteredCount, onOpenReviewModal }) => {
    const circleBtnStyle: React.CSSProperties = {
        width: '42px',
        height: '42px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        borderWidth: '2px' 
    };
    
    return (
        <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
            {/* Header: Name & Actions */}
            <div className="d-flex justify-content-between align-items-start mb-3">
                <h1 className="fw-bold mb-0">{shop.name}</h1>
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary rounded-circle p-2" style={circleBtnStyle}><Share2 size={20} /></button>
                    <button className="btn btn-outline-danger rounded-circle p-2" style={circleBtnStyle}><Heart size={20} /></button>
                </div>
            </div>

            {/* Rating & Category */}
            <div className="d-flex align-items-center gap-2 mb-4">
                <div className="badge bg-warning text-dark px-2 py-1 fs-6">
                    <Star size={16} className="mb-1 me-1"/>{shop.rating}
                </div>
                <span className="text-secondary">({totalFilteredCount} รีวิว)</span>
                <span className="mx-2 text-light-gray">|</span>
                <span className="text-primary fw-bold">{shop.category}</span>
            </div>

            <p className="text-secondary mb-4">{shop.description}</p>

            {/* Zone & Time Info */}
            <div className="row mb-4 g-3">
                <div className="col-6">
                    <div className="p-3 bg-light rounded-3 h-100">
                        <div className="text-muted small mb-1"><MapPin size={16}/> โซน</div>
                        <div className="fw-bold">{shop.zone}</div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="p-3 bg-light rounded-3 h-100">
                        <div className="text-muted small mb-1"><Clock size={16}/> เวลาเปิด</div>
                        <div className="fw-bold text-success">{shop.openHours}</div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="d-grid gap-2">
                <a href={shop.googleMap} target="_blank" rel="noreferrer" className="btn btn-outline-dark py-2 rounded-3">
                    ดูแผนที่ Google Maps
                </a>
                <button onClick={onOpenReviewModal} className="btn btn-primary py-3 rounded-3 fw-bold shadow-sm">
                    <PenLine size={18} className="me-2" /> เขียนรีวิวร้านนี้
                </button>
            </div>
        </div>
    );
};