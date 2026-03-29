import React, { useState } from "react";
import { Star, X, BadgeCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; 

interface ReviewModalProps {
    isOpen: boolean; 
    onClose: () => void; 
    onSubmit: (rating: number, comment: string) => Promise<void> | void;
    shopName: string; 
    shopImage: string;
    isSubmitting?: boolean;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
    isOpen, onClose, onSubmit, shopName, shopImage, isSubmitting = false
}) => {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!isSubmitting && rating > 0 && comment.trim()) {
            await onSubmit(rating, comment); 
            setRating(0); 
            setComment("");
        }
    };

    return (
        // 👇 พื้นหลังมืดเบลอๆ
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-end align-items-lg-center justify-content-center p-0 p-lg-3" style={{ zIndex: 1060, backgroundColor: 'rgba(10, 10, 10, 0.85)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
            
            <style>
                {`
                    /* แอนิเมชันสไลด์ขึ้นสำหรับมือถือ */
                    @keyframes slideUp {
                        from { transform: translateY(100%); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    .animate-slide-up {
                        animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
                    
                    /* จัดการขอบโค้ง: มือถือโค้งแค่บน คอมโค้งทุกมุม */
                    .review-modal-box { border-radius: 28px 28px 0 0; }
                    @media (min-width: 992px) { .review-modal-box { border-radius: 24px; } }
                    
                    /* Textarea สีดาร์กโหมด */
                    .custom-textarea { background-color: #1a1412 !important; color: #e8ebe4 !important; border: 1px solid #3d302a !important; }
                    .custom-textarea::placeholder { color: #8a7b72; }
                    .custom-textarea:focus { border-color: #c9943a !important; box-shadow: 0 0 0 2px rgba(201, 148, 58, 0.2) !important; }
                `}
            </style>

            <div className="w-100 overflow-hidden shadow-lg animate-slide-up review-modal-box" style={{ maxWidth: '500px', backgroundColor: '#231c18', border: '1px solid #3d302a' }} onClick={(e) => e.stopPropagation()}>
                
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center p-4" style={{ borderBottom: '1px solid rgba(201, 148, 58, 0.2)' }}>
                    <h5 className="fw-bolder m-0" style={{ color: '#c9943a' }}>เขียนรีวิว</h5>
                    <button title="ปิด" onClick={onClose} className="btn rounded-circle p-2 d-flex align-items-center hover-scale" style={{ backgroundColor: 'rgba(201, 148, 58, 0.1)', color: '#e8b94a' }}>
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 p-lg-5">
                    
                    {/* ข้อมูลร้าน */}
                    <div className="d-flex align-items-center gap-3 mb-4 pb-4" style={{ borderBottom: '1px solid #3d302a' }}>
                        <img src={shopImage} alt={shopName} className="rounded-4 object-fit-cover shadow-sm" style={{ width: 64, height: 64, border: '1px solid #3d302a' }} />
                        <div>
                            <div className="fw-bold mb-1" style={{ fontSize: '1.1rem', color: '#f5ebe4' }}>{shopName}</div>
                            <small style={{ color: '#9a8a7e' }}>ให้คะแนนประสบการณ์ของคุณ</small>
                        </div>
                    </div>

                    {/* ดาวรีวิว */}
                    <div className="text-center mb-4 pb-2">
                        <div className="d-flex justify-content-center gap-2 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button title={`ให้ ${star} ดาว`} key={star} onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} className="btn p-0 border-0 transition-all hover-scale" type="button">
                                    <Star 
                                        size={48} 
                                        fill={star <= (hoverRating || rating) ? "#e8b94a" : "transparent"} 
                                        style={{ color: star <= (hoverRating || rating) ? "#e8b94a" : "#8a7b72", opacity: star <= (hoverRating || rating) ? 1 : 0.3 }} 
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* กล่องข้อความ */}
                    <div className="mb-4">
                        <p className="fw-bold mb-3 small" style={{ color: '#e8ebe4' }}>เขียนรีวิวของคุณ</p>
                        <textarea
                            className="form-control custom-textarea rounded-4 p-4 shadow-none transition-all"
                            rows={4}
                            placeholder="บอกเล่าประสบการณ์ของคุณที่ร้านนี้..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            style={{ resize: 'none', fontSize: '0.95rem' }}
                        />
                    </div>

                    {/* โพสต์ในนาม */}
                    <div className="d-flex align-items-center gap-3 mb-5 p-3 rounded-4 shadow-sm" style={{ backgroundColor: '#2d2320', border: '1px dashed rgba(201, 148, 58, 0.3)' }}>
                        <BadgeCheck size={24} style={{ color: '#e8b94a' }} />
                        <div className="small">
                            <span style={{ color: '#9a8a7e' }}>โพสต์ในนาม </span>
                            <span className="fw-bold" style={{ color: '#f5ebe4' }}>{user?.email || "ผู้ใช้งานทั่วไป"}</span>
                        </div>
                    </div>

                    {/* ปุ่มส่งรีวิว */}
                    <button 
                        onClick={handleSubmit} 
                        disabled={isSubmitting || rating === 0 || !comment.trim()} 
                        className="btn w-100 rounded-pill py-3 fw-bold shadow-sm mb-3 transition-all hover-scale"
                        style={{ 
                            backgroundColor: (isSubmitting || rating === 0 || !comment.trim()) ? '#3d302a' : '#A73B24', 
                            color: (isSubmitting || rating === 0 || !comment.trim()) ? '#8a7b72' : '#fff5f0',
                            border: 'none'
                        }}
                    >
                        {isSubmitting ? "กำลังส่ง..." : "ส่งรีวิว"}
                    </button>
                </div>
            </div>
        </div>
    );
};