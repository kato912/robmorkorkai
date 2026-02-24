import React, { useState } from "react";
import { Star, X, BadgeCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; 

interface ReviewModalProps {
    isOpen: boolean; onClose: () => void; onSubmit: (rating: number, comment: string) => void;
    shopName: string; shopImage: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
    isOpen, onClose, onSubmit, shopName, shopImage
}) => {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (rating > 0 && comment.trim()) {
            onSubmit(rating, comment); setRating(0); setComment("");
        }
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-end align-items-lg-center justify-content-center p-0 p-lg-3 animate-fade-in" style={{ zIndex: 1060, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
            
            <div className="bg-white w-100 overflow-hidden shadow-lg" style={{ maxWidth: '500px', borderRadius: '24px 24px 0 0' }} onClick={(e) => e.stopPropagation()}>
                
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center p-4 border-bottom border-light-subtle">
                    <h5 className="fw-bolder text-dark m-0">เขียนรีวิว</h5>
                    <button onClick={onClose} className="btn btn-light rounded-circle p-2 d-flex align-items-center"><X size={20} className="text-muted" /></button>
                </div>

                {/* Content */}
                <div className="p-4 p-lg-5">
                    
                    <div className="d-flex align-items-center gap-4 mb-4 pb-4 border-bottom border-light-subtle">
                        <img src={shopImage} alt={shopName} className="rounded-4 object-fit-cover shadow-sm" style={{ width: 64, height: 64 }} />
                        <div>
                            <div className="fw-bold text-dark mb-1" style={{ fontSize: '1.1rem' }}>{shopName}</div>
                            <small className="text-muted">ให้คะแนนประสบการณ์ของคุณ</small>
                        </div>
                    </div>

                    <div className="text-center mb-4 pb-2">
                        <div className="d-flex justify-content-center gap-2 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button key={star} onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} className="btn p-0 border-0 transition-all" type="button">
                                    <Star size={48} fill={star <= (hoverRating || rating) ? "#fbbf24" : "none"} className={star <= (hoverRating || rating) ? "text-warning" : "text-black-50 opacity-25"} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="fw-bold text-dark mb-3 small">เขียนรีวิวของคุณ</p>
                        <textarea
                            className="form-control bg-light border-0 rounded-4 p-4 shadow-none"
                            rows={4}
                            placeholder="บอกเล่าประสบการณ์ของคุณที่ร้านนี้..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            style={{ resize: 'none', fontSize: '0.95rem' }}
                        />
                    </div>

                    <div className="d-flex align-items-center gap-3 mb-5 p-3 rounded-4 bg-light">
                        <BadgeCheck size={24} className="text-dark" />
                        <div className="small">
                            <span className="text-muted">โพสต์ในนาม </span>
                            <span className="fw-bold text-dark">{user?.email || "ผู้ใช้งานทั่วไป"}</span>
                        </div>
                    </div>

                    <button onClick={handleSubmit} disabled={rating === 0 || !comment.trim()} className="btn btn-dark w-100 rounded-pill py-3 fw-bold shadow-sm mb-3">
                        ส่งรีวิว
                    </button>
                </div>
            </div>
        </div>
    );
};