import React, { useState } from "react";
import { Star, BadgeCheck, ThumbsUp, LogIn } from "lucide-react";

interface ShopReviewSectionProps {
    reviews: any[];
    averageRating: string | number;
    reviewsCount: number;
    ratingDistribution: any[];
    verifiedOnly: boolean;
    setVerifiedOnly: (val: boolean) => void;
    hasMore: boolean;
    handleShowMore: () => void;
    isLoggedIn: boolean;
    onOpenReviewModal: () => void;
}

export const ShopReviewSection: React.FC<ShopReviewSectionProps> = ({
    reviews, averageRating, reviewsCount, ratingDistribution, verifiedOnly, setVerifiedOnly, hasMore, handleShowMore, isLoggedIn, onOpenReviewModal
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const displayReviews = isExpanded ? reviews : reviews.slice(0, 2);
    const canShowMore = hasMore || (!isExpanded && reviews.length > 2);

    const handleLocalShowMore = () => {
        if (!isExpanded && reviews.length > 2) {
            setIsExpanded(true);
        } else {
            handleShowMore();
            setIsExpanded(true);
        }
    };

    const handleLocalShowLess = () => {
        setIsExpanded(false);
        document.getElementById('review-header-top')?.scrollIntoView({ behavior: 'smooth' });
    };

    const renderStars = (rating: number, size = 16) => (
        Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={size} 
                className={i < Math.round(rating) ? "" : "opacity-25"} 
                style={{ color: i < Math.round(rating) ? '#e8b94a' : '#8a7b72', fill: i < Math.round(rating) ? '#e8b94a' : 'transparent' }} 
            />
        ))
    );

    return (
        <section className="py-0 py-lg-2" id="review-header-top">
            
            <div className="mb-5 row g-4 align-items-center">
                <div className="col-12 col-md-4 d-flex align-items-center gap-3">
                    <span className="fw-bolder tracking-tight" style={{ fontSize: '4.5rem', lineHeight: '1', color: '#f5ebe4' }}>{averageRating}</span>
                    <div className="d-flex flex-column justify-content-center mt-2">
                        <div className="d-flex gap-1 mb-2">{renderStars(Number(averageRating), 18)}</div>
                        <p className="m-0 small" style={{ color: '#9a8a7e' }}>จาก {reviewsCount} รีวิว</p>
                    </div>
                </div>

                <div className="col-12 col-md-5">
                    <div className="p-3 rounded-4 shadow-sm h-100" style={{ backgroundColor: '#231c18', border: '1px solid rgba(201, 148, 58, 0.1)' }}>
                        <div className="d-flex flex-column gap-2">
                            {ratingDistribution.map((item) => (
                                <div key={item.star} className="d-flex align-items-center gap-3">
                                    <div className="d-flex align-items-center justify-content-end gap-1" style={{ width: '40px' }}><span className="fw-bold small" style={{ color: '#f5ebe4' }}>{item.star}</span><Star size={12} style={{ color: '#e8b94a', fill: '#e8b94a' }} /></div>
                                    <div className="flex-grow-1 rounded-pill" style={{ height: '6px', backgroundColor: '#3d302a' }}><div className="rounded-pill h-100 transition-all" style={{ width: `${item.percentage}%`, transitionDuration: '500ms', backgroundColor: '#e8b94a' }}></div></div>
                                    <span className="small fw-medium text-end" style={{ width: '30px', color: '#9a8a7e' }}>{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-3 text-md-end">
                    {isLoggedIn && (
                        <button onClick={onOpenReviewModal} className="btn w-100 rounded-pill px-4 py-3 fw-bold hover-scale shadow-sm" style={{ backgroundColor: '#A73B24', color: '#fff5f0' }}>
                            เขียนรีวิวของคุณ
                        </button>
                    )}
                </div>
            </div>

            <div className="d-flex flex-column gap-0">
                {displayReviews.map((review, index) => (
                    <article key={review.id} className="py-4" style={{ borderBottom: index < displayReviews.length - 1 ? '1px solid #3d302a' : 'none' }}>
                        <div className="d-flex gap-3 align-items-start">
                            <div className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0 shadow-sm" style={{ width: '48px', height: '48px', overflow: 'hidden', backgroundColor: '#A73B24', border: '2px solid #3d302a' }}>{review.userImage && review.userImage.trim() ? <img src={review.userImage} alt={review.userName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }}/> : <span style={{ fontSize: '20px' }}>{review.userName?.charAt(0)?.toUpperCase() || "U"}</span>}</div>
                            <div className="flex-grow-1 min-w-0">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="d-flex align-items-center gap-2"><span className="fw-bold" style={{ color: '#f5ebe4', fontSize: '1.05rem' }}>{review.userName || review.email}</span>{review.verified && (<span className="badge rounded-pill px-2 py-1 d-flex align-items-center gap-1" style={{ fontSize: '0.65rem', backgroundColor: 'rgba(201, 148, 58, 0.15)', color: '#e8b94a', border: '1px solid rgba(201, 148, 58, 0.3)' }}><BadgeCheck size={12} /> KKU</span>)}</div>
                                    <span style={{ fontSize: '0.8rem', color: '#8a7b72' }}>{review.date}</span>
                                </div>
                                <div className="d-flex gap-1 mb-3">{renderStars(review.rating, 14)}</div>
                                <p className="lh-base mb-3" style={{ fontSize: '1rem', color: '#e8ebe4' }}>{review.comment}</p>
                                <div className="d-flex gap-4"><button className="btn btn-link p-0 text-decoration-none small d-flex align-items-center gap-2 hover-scale" style={{ color: '#8a7b72' }}><ThumbsUp size={14} /> <span>เป็นประโยชน์</span></button><button className="btn btn-link p-0 text-decoration-none small hover-scale" style={{ color: '#8a7b72' }}>ตอบกลับ</button></div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
                {canShowMore && (
                    <button onClick={handleLocalShowMore} className="btn rounded-pill px-5 py-2 fw-medium hover-scale" style={{ border: '1px solid #c9943a', color: '#e8b94a', backgroundColor: 'transparent' }}>
                        ดูรีวิวเพิ่มเติม
                    </button>
                )}
                {isExpanded && reviews.length > 2 && (
                    <button onClick={handleLocalShowLess} className="btn rounded-pill px-5 py-2 fw-medium hover-scale" style={{ border: '1px dashed #8a7b72', color: '#9a8a7e', backgroundColor: 'transparent' }}>
                        ซ่อนรีวิว
                    </button>
                )}
            </div>

            {!isLoggedIn && (
                <div onClick={onOpenReviewModal} className="text-decoration-none mt-5 d-block cursor-pointer">
                    <div className="rounded-4 p-5 text-center transition-all hover-scale shadow-sm" style={{ backgroundColor: '#2d2320', border: '1px dashed #c9943a' }}>
                        <LogIn size={32} className="mb-3 mx-auto" style={{ color: '#c9943a' }} />
                        <h5 className="fw-bold mb-2" style={{ color: '#f5ebe4' }}>เข้าสู่ระบบเพื่อเขียนรีวิว</h5>
                        <p className="m-0 small" style={{ color: '#9a8a7e' }}>แชร์ประสบการณ์ของคุณกับเพื่อนๆ นักศึกษา</p>
                    </div>
                </div>
            )}
        </section>
    );
};