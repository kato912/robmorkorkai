import React from "react";
import { PenLine } from "lucide-react";

interface ShopMobileBottomBarProps {
    onOpenReviewModal: () => void;
}

export const ShopMobileBottomBar: React.FC<ShopMobileBottomBarProps> = ({ onOpenReviewModal }) => {
    return (
        <div className="fixed-bottom p-3 border-top shadow-lg"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                zIndex: 1050,
                paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))'
            }}
        >
            <button 
                onClick={onOpenReviewModal} 
                className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
            >
                <PenLine size={18} /> เขียนรีวิวร้านนี้
            </button>
        </div>
    );
};