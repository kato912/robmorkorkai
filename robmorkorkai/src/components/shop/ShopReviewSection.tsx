import React from "react";
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
    const renderStars = (rating: number, size = 16) => (
        Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={size} className={i < Math.round(rating) ? "fill-warning text-warning" : "text-secondary opacity-25"} />
        ))
    );

    return (
        <section className="py-5">
            {/* Header */}
            <div className="d-flex align-items-end justify-content-between mb-5">
                <div>
                    <h6 className="text-muted fw-bold text-uppercase tracking-wider mb-3" style={{ fontSize: '0.75rem', letterSpacing: '2px' }}>รีวิวและความเห็น</h6>
                    <div className="d-flex align-items-baseline gap-3">
                        <span className="fw-bolder text-dark tracking-tight" style={{ fontSize: '3.5rem', lineHeight: '1' }}>{averageRating}</span>
                        <div>
                            <div className="d-flex gap-1">{renderStars(Number(averageRating), 18)}</div>
                            <p className="text-muted m-0 mt-2 small">จาก {reviewsCount} รีวิว</p>
                        </div>
                    </div>
                </div>
                {isLoggedIn && <button onClick={onOpenReviewModal} className="btn btn-dark rounded-pill px-4 py-2 fw-bold d-none d-lg-block">เขียนรีวิว</button>}
            </div>

            {/* Distribution Bars */}
            <div className="mb-5 p-4 rounded-4" style={{ backgroundColor: '#f8fafc' }}>
                <div className="d-flex flex-column gap-2">
                    {ratingDistribution.map((item) => (
                        <div key={item.star} className="d-flex align-items-center gap-3">
                            <div className="d-flex align-items-center justify-content-end gap-1" style={{ width: '40px' }}><span className="fw-bold text-dark small">{item.star}</span><Star size={12} className="fill-warning text-warning" /></div>
                            <div className="flex-grow-1 bg-light rounded-pill border" style={{ height: '8px' }}><div className="bg-dark rounded-pill h-100 transition-all" style={{ width: `${item.percentage}%`, transitionDuration: '500ms' }}></div></div>
                            <span className="text-muted small fw-medium text-end" style={{ width: '30px' }}>{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filter */}
            <div className="d-flex align-items-center justify-content-between mb-4 p-3 rounded-4 border border-light-subtle">
                <div className="d-flex align-items-center gap-3"><BadgeCheck size={20} className="text-dark" /><div><p className="fw-bold text-dark m-0 small">เฉพาะ Verified KKU</p><small className="text-muted" style={{ fontSize: '0.75rem' }}>รีวิวจากนักศึกษา มข. เท่านั้น</small></div></div>
                <div className="form-check form-switch m-0"><input title="filterInput" className="form-check-input cursor-pointer shadow-none" type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} style={{ width: '40px', height: '20px' }} /></div>
            </div>

            {/* Reviews List */}
            <div className="d-flex flex-column gap-0">
                {reviews.map((review, index) => (
                    <article key={review.id} className={`py-4 ${index < reviews.length - 1 ? 'border-bottom border-light-subtle' : ''}`}>
                        <div className="d-flex gap-3 align-items-start">
                            <div className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0 object-fit-cover" style={{ width: '44px', height: '44px', overflow: 'hidden' }}>
                                {review.userImage ? <img src={review.userImage} alt={review.userName} className="w-100 h-100 object-fit-cover"/> : (review.userName?.charAt(0) || "U")}
                            </div>
                            <div className="flex-grow-1 min-w-0">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="d-flex align-items-center gap-2"><span className="fw-bold text-dark">{review.userName || review.email}</span>{review.verified && (<span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2 py-1 d-flex align-items-center gap-1" style={{ fontSize: '0.6rem' }}><BadgeCheck size={12} /> KKU</span>)}</div>
                                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>{review.date}</span>
                                </div>
                                <div className="d-flex gap-1 mb-3">{renderStars(review.rating, 14)}</div>
                                <p className="text-secondary lh-base mb-3" style={{ fontSize: '0.9rem' }}>{review.comment}</p>
                                <div className="d-flex gap-4">
                                    <button className="btn btn-link p-0 text-muted text-decoration-none small d-flex align-items-center gap-2 hover-text-dark"><ThumbsUp size={14} /> <span>เป็นประโยชน์</span></button>
                                    <button className="btn btn-link p-0 text-muted text-decoration-none small hover-text-dark">ตอบกลับ</button>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {hasMore && <div className="text-center mt-4"><button onClick={handleShowMore} className="btn btn-outline-dark rounded-pill px-5 py-2 fw-medium">ดูรีวิวเพิ่มเติม</button></div>}

            {!isLoggedIn && (
                <div onClick={onOpenReviewModal} className="text-decoration-none mt-5 d-block cursor-pointer">
                    <div className="bg-dark text-white rounded-4 p-5 text-center transition-all hover-shadow"><LogIn size={32} className="opacity-75 mb-3 mx-auto" /><h5 className="fw-bold mb-2">เข้าสู่ระบบเพื่อเขียนรีวิว</h5><p className="text-white-50 m-0 small">แชร์ประสบการณ์ของคุณกับเพื่อนๆ นักศึกษา</p></div>
                </div>
            )}
        </section>
    );
};