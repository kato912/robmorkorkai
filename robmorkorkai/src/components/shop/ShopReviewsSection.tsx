import React from "react";
import { Star, MessageSquare, BadgeCheck, ChevronDown } from "lucide-react";
import { ReviewerAvatar } from "./ReviewerAvatar";
import "./css/ShopReviewsSection.css";

interface Review {
    rating: number;
    comment: string;
    userName?: string;
    userImage?: string;
    date?: string;
}

interface RatingDistribution {
    star: number;
    count: number;
    percentage: number;
}

interface ShopReviewsSectionProps {
    reviews: Review[];
    totalCount: number;
    averageRating: string;
    verifiedOnly: boolean;
    onSetVerifiedOnly: (value: boolean) => void;
    ratingDistribution: RatingDistribution[];
    hasMore?: boolean;
    onShowMore?: (showAll?: boolean, collapse?: boolean) => void;
}

/**
 * ShopReviewsSection Component
 * 
 * Displays comprehensive review information including ratings summary and individual reviews.
 * Features:
 * - Reviews header with total count and "Verified KKU" filter toggle
 * - Rating summary card showing:
 *   - Average rating (large text)
 *   - Star visualization
 *   - Total review count
 *   - Distribution bars for each star rating (1-5)
 * - Individual review cards with:
 *   - User avatar (with fallback to first initial)
 *   - User name and review date
 *   - Star rating
 *   - Comment text
 *   - Action buttons (like, reply)
 * - Empty state message when no reviews exist
 * - Load more/less functionality for review pagination
 * 
 * Props:
 * - reviews: Array of Review objects with rating, comment, user info
 * - totalCount: Total number of reviews for the shop
 * - averageRating: Calculated average rating (displayed prominently)
 * - verifiedOnly: Filter toggle state (shows only KKU student reviews)
 * - onSetVerifiedOnly: Callback to update filter state
 * - ratingDistribution: Array of RatingDistribution showing count/percentage per star level
 * 
 * CSS Classes Used:
 * - review-card: Individual review container styling
 * - rating-card: Summary rating box with distribution bars
 * - rating-stars: Star icon styling for average display
 * - reviews-list: Container for review cards
 * - reviews-filter-toggle: Verified KKU filter button styling
 */
export const ShopReviewsSection: React.FC<ShopReviewsSectionProps> = ({
    reviews,
    totalCount,
    averageRating,
    verifiedOnly,
    onSetVerifiedOnly,
    ratingDistribution,
    hasMore = false,
    onShowMore
}) => {
    return (
        // Reviews section with dark background and top border accent
        <section className="w-100 py-5" style={{ backgroundColor: '#1a1412', borderTop: '1px solid #3d302a' }}>
            <div className="container" style={{ maxWidth: '1140px' }}>
                {/* Reviews Header - Title and Verified KKU Filter Toggle */}
                <div className="d-flex justify-content-between align-items-center gap-2 gap-md-3 mb-5">
                    {/* Review Section Title - Shows total review count */}
                    <div className="d-flex align-items-center gap-2">
                        <MessageSquare size={20} style={{ color: '#c9943a', flexShrink: 0 }} />
                        <h6 className="fw-bold text-uppercase tracking-wider m-0" style={{ fontSize: '1rem', letterSpacing: '2px', color: '#c9943a' }}>
                            รีวิวจากลูกค้า ({totalCount || 0})
                        </h6>
                    </div>
                    {/* Verified KKU Filter Toggle - Click to filter reviews from verified KKU students only */}
                    <div 
                        className="d-flex align-items-center gap-2 px-2 py-2 px-md-4 py-md-3 rounded-3 shadow-sm"
                        onClick={() => onSetVerifiedOnly(!verifiedOnly)}
                        style={{ 
                            backgroundColor: verifiedOnly ? 'rgba(201, 148, 58, 0.1)' : '#231c18', 
                            border: verifiedOnly ? '2px solid #c9943a' : '1px solid #3d302a',
                            cursor: 'pointer', 
                            transition: 'all 0.3s ease',
                            flexShrink: 0
                        }}
                    >
                        <BadgeCheck size={16} className="d-md-none" style={{ color: '#e8b94a', flexShrink: 0 }} />
                        <BadgeCheck size={20} className="d-none d-md-block" style={{ color: '#e8b94a', flexShrink: 0 }} />
                        <div>
                            <p className="fw-semibold m-0" style={{ color: '#f5ebe4', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)' }}>Verified KKU</p>
                            <small className="d-none d-md-block" style={{ color: '#9a8a7e', fontSize: '0.75rem' }}>นักศึกษา มข.</small>
                        </div>
                        <div className="form-check form-switch ms-1 ms-md-3 mb-0">
                            <input 
                                className="form-check-input cursor-pointer" 
                                type="checkbox" 
                                checked={verifiedOnly} 
                                onChange={(e) => onSetVerifiedOnly(e.target.checked)}
                                style={{ width: '40px', height: '20px' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Rating Summary Card */}
                <div className="card rounded-4 p-4 p-lg-5 mb-5 border-0 shadow-sm" style={{ backgroundColor: '#231c18' }}>
                    <div className="row align-items-center">
                        {/* Average Rating */}
                        <div className="col-12 col-md-4 text-center mb-4 mb-md-0 position-relative">
                            <h2 className="display-3 fw-bold mb-0" style={{ color: '#f5ebe4' }}>{averageRating || "0.0"}</h2>
                            <div className="d-flex justify-content-center gap-1 my-2">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <Star 
                                        key={star} 
                                        size={22} 
                                        style={{ 
                                            color: star <= Number(averageRating) ? '#e8b94a' : '#3d302a', 
                                            fill: star <= Number(averageRating) ? '#e8b94a' : 'none' 
                                        }} 
                                    />
                                ))}
                            </div>
                            <p className="m-0" style={{ color: '#9a8a7e', fontSize: '0.95rem' }}>จากทั้งหมด {totalCount || 0} รีวิว</p>
                            <div className="d-none d-md-block position-absolute end-0 top-50 translate-middle-y" style={{ width: '1px', height: '70%', backgroundColor: '#3d302a' }}></div>
                        </div>

                        {/* Rating Distribution Bars */}
                        <div className="col-12 col-md-8 ps-md-5">
                            {ratingDistribution.map((item) => (
                                <div key={item.star} className="d-flex align-items-center mb-2 gap-3">
                                    <span className="fw-bold text-end" style={{ color: '#d7cec7', width: '15px' }}>{item.star}</span>
                                    <Star size={16} style={{ color: '#e8b94a', fill: '#e8b94a' }} />
                                    <div className="progress flex-grow-1" style={{ height: '8px', backgroundColor: '#3d302a', borderRadius: '10px' }}>
                                        <div 
                                            className="progress-bar" 
                                            role="progressbar" 
                                            style={{ width: `${item.percentage}%`, backgroundColor: '#e8b94a', borderRadius: '10px' }} 
                                            aria-valuenow={item.percentage} 
                                            aria-valuemin={0} 
                                            aria-valuemax={100}
                                        ></div>
                                    </div>
                                    <span className="small fw-medium text-end" style={{ width: '30px', color: '#9a8a7e' }}>{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="d-flex flex-column gap-3">
                    {reviews && reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="card rounded-4 p-4 border-0 shadow-sm" style={{ backgroundColor: '#231c18' }}>
                                <div className="d-flex align-items-start gap-3">
                                    <ReviewerAvatar userImage={review.userImage} userName={review.userName} />
                                    <div className="flex-grow-1">
                                        <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center mb-2 gap-1">
                                            <p className="fw-bold m-0" style={{ color: '#f5ebe4', fontSize: '1.05rem' }}>{review.userName || "ผู้ใช้งาน"}</p>
                                            <span style={{ color: '#9a8a7e', fontSize: '0.85rem' }}>{review.date || "เพิ่งรีวิว"}</span>
                                        </div>
                                        <div className="d-flex gap-1 mb-2">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <Star 
                                                    key={star} 
                                                    size={14} 
                                                    style={{ 
                                                        color: star <= review.rating ? '#e8b94a' : '#3d302a', 
                                                        fill: star <= review.rating ? '#e8b94a' : 'none' 
                                                    }} 
                                                />
                                            ))}
                                        </div>
                                        <p className="mb-0" style={{ color: '#d7cec7', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                            {review.comment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-5 rounded-4 border-0" style={{ backgroundColor: '#231c18' }}>
                            <MessageSquare size={48} className="mb-3 opacity-50 mx-auto" style={{ color: '#c9943a' }} />
                            <h6 className="fw-bold mb-2" style={{ color: '#f5ebe4' }}>ยังไม่มีรีวิวสำหรับร้านนี้</h6>
                            <p style={{ color: '#9a8a7e', fontSize: '0.95rem' }}>มาเป็นคนแรกที่แบ่งปันประสบการณ์ของคุณกันเถอะ!</p>
                        </div>
                    )}

                    {/* View More Comments Button */}
                    {hasMore && onShowMore && (
                        <div className="text-center mt-4">
                            <button
                                onClick={() => onShowMore()}
                                className="btn btn-outline-gold rounded-pill px-3 px-md-5 py-1 py-md-2 fw-bold d-inline-flex align-items-center gap-2 hover-scale"
                                style={{
                                    color: '#c9943a',
                                    borderColor: '#c9943a',
                                    backgroundColor: 'transparent',
                                    transition: 'all 0.3s ease',
                                    fontSize: 'clamp(0.85rem, 2vw, 1rem)'
                                }}
                                onMouseEnter={(e) => {
                                    (e.target as HTMLElement).style.backgroundColor = 'rgba(201, 148, 58, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                                }}
                            >
                                <span>ดูคอมเมนต์เพิ่มเติม</span>
                                <ChevronDown size={16} className="d-md-none" />
                                <ChevronDown size={18} className="d-none d-md-block" />
                            </button>
                        </div>
                    )}

                    {/* Show Less Comments Button - Shows when expanded beyond 3 comments */}
                    {!hasMore && reviews.length > 3 && onShowMore && (
                        <div className="text-center mt-4">
                            <button
                                onClick={() => onShowMore(false, true)}
                                className="btn btn-outline-gold rounded-pill px-3 px-md-5 py-1 py-md-2 fw-bold d-inline-flex align-items-center gap-2 hover-scale"
                                style={{
                                    color: '#c9943a',
                                    borderColor: '#c9943a',
                                    backgroundColor: 'transparent',
                                    transition: 'all 0.3s ease',
                                    fontSize: 'clamp(0.85rem, 2vw, 1rem)'
                                }}
                                onMouseEnter={(e) => {
                                    (e.target as HTMLElement).style.backgroundColor = 'rgba(201, 148, 58, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                                }}
                            >
                                <span>ซ่อนคอมเมนต์</span>
                                <ChevronDown size={16} className="d-md-none" style={{ transform: 'rotate(180deg)' }} />
                                <ChevronDown size={18} className="d-none d-md-block" style={{ transform: 'rotate(180deg)' }} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
