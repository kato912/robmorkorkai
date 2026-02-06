import React from "react";
import { BadgeCheck } from "lucide-react";
import { UserAvatar } from "../../common/userAvatar"; 
import { renderStars } from "../../../utils/renderStars";
import type { Review } from "../../../types/shop";

interface ShopReviewSectionProps {
    reviews: Review[]; 
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
                <h4 className="fw-bold m-0">รีวิวจากผู้ใช้งาน</h4>
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
                        <div className="d-flex gap-3">
                            <UserAvatar image={review.userImage} size={50} />

                            <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <div className="fw-bold text-dark">
                                            {review.userName || review.email || "ผู้ใช้งาน"}
                                        </div>
                                        <div className="d-flex align-items-center gap-2 text-sm mt-1">
                                            <div className="d-flex">{renderStars(review.rating)}</div>
                                            <span className="text-muted small">
                                                • {new Date(review.date).toLocaleDateString('th-TH')}
                                            </span>
                                        </div>
                                    </div>

                                    {review.verified && (
                                        <div className="text-success d-flex align-items-center gap-1 bg-success bg-opacity-10 px-3 py-1 rounded-pill" style={{ fontSize: '12px' }}>
                                            <BadgeCheck size={14} /> Verified Student
                                        </div>
                                    )}
                                </div>
                                <p className="text-secondary mb-0 mt-2">{review.comment}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Buttons */}
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