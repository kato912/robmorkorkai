import React from "react";
import { User, Star, BadgeCheck } from "lucide-react";

interface ShopReviewSectionProps {
    reviews: any[];
    verifiedOnly: boolean;
    setVerifiedOnly: (val: boolean) => void;
    hasMore: boolean;
    handleShowMore: (showAll?: boolean, collapse?: boolean) => void;
}

export const ShopReviewSection: React.FC<ShopReviewSectionProps> = ({ 
    reviews, verifiedOnly, setVerifiedOnly, hasMore, handleShowMore 
}) => {
    return (
        <div>
            {/* Header & Filter Toggle */}
            <div className="d-flex align-items-center justify-content-between mb-3 mt-5">
                <h4 className="fw-bold m-0">รีวิวจากนักศึกษา</h4>
                <div className="form-check form-switch d-flex align-items-center gap-2">
                    <input 
                        className="form-check-input cursor-pointer" 
                        type="checkbox" 
                        id="desktopVerifiedSwitch"
                        checked={verifiedOnly}
                        onChange={(e) => setVerifiedOnly(e.target.checked)}
                    />
                    <label className="form-check-label user-select-none" htmlFor="desktopVerifiedSwitch">
                        เฉพาะ <span className="text-primary fw-bold">Verified User</span>
                    </label>
                </div>
            </div>

            {/* Review List */}
            <div className="d-flex flex-column gap-3">
                {reviews.map((review) => (
                    <div key={review.id} className="card border-0 shadow-sm rounded-4 p-4">
                        <div className="d-flex justify-content-between mb-2">
                            <div className="d-flex gap-3">
                                <div className="bg-light rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                                    <User size={24} className="text-secondary" />
                                </div>
                                <div>
                                    <div className="fw-bold">{review.email}</div>
                                    <div className="d-flex align-items-center gap-2 text-sm">
                                        <div className="d-flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} className={i < review.rating ? "text-warning fill-warning" : "text-light-gray"} />
                                            ))}
                                        </div>
                                        <span className="text-muted small">• {new Date(review.date).toLocaleDateString('th-TH')}</span>
                                    </div>
                                </div>
                            </div>
                            {review.verified && (
                                <div className="text-success d-flex align-items-center gap-1 bg-success bg-opacity-10 px-2 py-1 rounded-pill h-100" style={{ fontSize: '12px' }}>
                                    <BadgeCheck size={14} /> Verified Student
                                </div>
                            )}
                        </div>
                        <p className="text-secondary mb-0 ps-lg-5 ms-lg-4">{review.comment}</p>
                    </div>
                ))}
            </div>

            {/* Pagination / Buttons */}
            <div className="mt-4 text-center">
                {hasMore ? (
                    <button onClick={() => handleShowMore()} className="btn btn-outline-secondary rounded-pill px-4">
                        โหลดรีวิวเพิ่มเติม
                    </button>
                ) : reviews.length > 3 && (
                    <button onClick={() => handleShowMore(false, true)} className="btn btn-link text-secondary">
                        ซ่อนรีวิว
                    </button>
                )}
            </div>
        </div>
    );
};