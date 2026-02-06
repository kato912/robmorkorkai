import React from "react";
import { BadgeCheck, ChevronDown, ChevronUp } from "lucide-react";
import { UserAvatar } from "../../common/userAvatar"; 
import { renderStars } from "../../../utils/renderStars"; 
import type { Review } from "../../../types/shop"; 

interface ShopMobileReviewListProps {
    reviews: Review[]; 
    verifiedOnly: boolean;
    setVerifiedOnly: (val: boolean) => void;
    hasMore: boolean;
    handleShowMore: (showAll?: boolean, collapse?: boolean) => void;
    totalFilteredCount: number;
}

export const ShopMobileReviewList: React.FC<ShopMobileReviewListProps> = ({
    reviews,
    verifiedOnly,
    setVerifiedOnly,
    hasMore,
    handleShowMore,
    totalFilteredCount
}) => {
    
    const isExpanded = reviews.length > 3;


    return (
        <div>
            {/* Filter Toggle - โค้ดส่วนนี้เหมือนเดิม */}
            <div className="d-flex align-items-center justify-content-between mb-4 bg-white border shadow-sm p-3 rounded-4">
                <div className="d-flex align-items-center gap-2">
                    <div className="bg-success bg-opacity-10 text-success p-2 rounded-circle">
                        <BadgeCheck size={18} />
                    </div>
                    <div>
                        <div className="fw-bold text-dark small">Verified Only</div>
                        <div className="text-muted" style={{ fontSize: '10px' }}>เฉพาะ @kkumail.com</div>
                    </div>
                </div>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input cursor-pointer"
                        type="checkbox"
                        checked={verifiedOnly}
                        onChange={(e) => setVerifiedOnly(e.target.checked)}
                        style={{ transform: 'scale(1.3)' }}
                    />
                </div>
            </div>

            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="fw-bold m-0 d-flex align-items-center gap-2">💬 รีวิวล่าสุด</h5>
                {hasMore && (
                    <button onClick={() => handleShowMore(true)} className="btn btn-link text-decoration-none p-0 small text-primary fw-bold">
                        ดูทั้งหมด ({totalFilteredCount})
                    </button>
                )}
            </div>

            {/* List */}
            <div className="d-flex flex-column gap-3 mb-3">
                {reviews.map((review) => (
                    <div key={review.id} className="card border-0 shadow-sm p-3 rounded-4 bg-light">
                        <div className="d-flex gap-3">
                            <UserAvatar image={review.userImage} size={45} />

                            <div className="flex-grow-1">
                                <div className="d-flex align-items-center justify-content-between mb-1">
                                    <div className="d-flex align-items-center gap-1">
                                        <span className="fw-bold text-dark small">
                                            {review.userName || review.email?.split('@')[0] || "ผู้ใช้งาน"}
                                        </span>
                                        {review.verified && <BadgeCheck size={12} className="text-success" />}
                                    </div>
                                    <div className="d-flex">{renderStars(review.rating)}</div>
                                </div>
                                <p className="text-secondary m-0 small lh-sm">"{review.comment}"</p>
                                {review.verified && (
                                    <div className="mt-2">
                                        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill" style={{ fontSize: '9px' }}>
                                            Verified Student
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Buttons */}
            <div className="d-flex gap-2">
                {hasMore && (
                    <button onClick={() => handleShowMore()} className="btn btn-outline-primary flex-grow-1 rounded-pill py-2 small fw-bold">
                        <ChevronDown size={14} className="me-1" /> แสดงเพิ่ม
                    </button>
                )}
                {isExpanded && (
                    <button onClick={() => handleShowMore(false, true)} className="btn btn-outline-secondary flex-grow-1 rounded-pill py-2 small fw-bold">
                        <ChevronUp size={14} className="me-1" /> ย่อเก็บ
                    </button>
                )}
            </div>
        </div>
    );
};