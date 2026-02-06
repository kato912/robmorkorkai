// review box

import React, { useState } from "react";
import { Star, X, BadgeCheck, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; 

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number, comment: string) => void;
    shopName: string;
    shopImage: string;
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
            onSubmit(rating, comment);
            setRating(0);
            setComment("");
        }
    };

    const userImage = user?.image || "https://via.placeholder.com/50";
    const userName = user?.name || "ผู้ใช้งาน";
    const isVerified = user?.isVerifiedStudent || false;

    return (
        <div 
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
            style={{ zIndex: 1060, backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-4 shadow-lg w-100 overflow-hidden" 
                style={{ maxWidth: '450px' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                    <h5 className="fw-bold m-0">เขียนรีวิว</h5>
                    <button onClick={onClose} className="btn btn-light rounded-circle p-2 d-flex align-items-center">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4">
                    {/* Shop Info */}
                    <div className="d-flex align-items-center gap-3 mb-4">
                        <img src={shopImage} alt={shopName} className="rounded-3 object-fit-cover" style={{ width: 60, height: 60 }} />
                        <div>
                            <div className="fw-bold">{shopName}</div>
                            <small className="text-muted">ให้คะแนนประสบการณ์ของคุณ</small>
                        </div>
                    </div>

                    {/* Star Rating */}
                    <div className="d-flex justify-content-center gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="btn p-1 border-0"
                                type="button"
                            >
                                <Star
                                    size={32}
                                    fill={star <= (hoverRating || rating) ? "#ffc107" : "none"} 
                                    className={`transition-colors ${star <= (hoverRating || rating)
                                            ? "text-warning"
                                            : "text-secondary opacity-25"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>

                    {/* Comment Box */}
                    <div className="mb-4">
                        <label className="form-label small fw-bold text-secondary">ความคิดเห็น</label>
                        <textarea
                            className="form-control bg-light border-0 rounded-3 p-3"
                            rows={4}
                            placeholder="รสชาติเป็นยังไง? บรรยากาศดีไหม? เล่าให้เพื่อนๆ ฟังหน่อย..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            style={{ resize: 'none' }}
                        />
                    </div>

                    <div className={`d-flex align-items-center gap-3 mb-4 p-2 rounded-3 border ${isVerified ? 'bg-success bg-opacity-10 border-success border-opacity-25' : 'bg-light border-light'}`}>
                        <img 
                            src={userImage} 
                            alt={userName} 
                            referrerPolicy="no-referrer"
                            className="rounded-circle border border-white shadow-sm"
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
                        <div className="flex-grow-1 lh-1">
                            <div className="small text-muted mb-1">รีวิวในนาม:</div>
                            <div className={`fw-bold ${isVerified ? 'text-success' : 'text-dark'}`}>
                                {userName}
                            </div>
                        </div>
                        {isVerified ? (
                            <div className="d-flex align-items-center gap-1 text-success small fw-bold">
                                <BadgeCheck size={16} /> Verified
                            </div>
                        ) : (
                            <div className="d-flex align-items-center gap-1 text-secondary small">
                                <User size={16} /> General
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={rating === 0 || !comment.trim()}
                        className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-sm"
                    >
                        ส่งรีวิว
                    </button>
                </div>
            </div>
        </div>
    );
};