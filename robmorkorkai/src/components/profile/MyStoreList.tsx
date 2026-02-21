import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Heart, MapPin, MessageSquare } from "lucide-react";

interface Props {
    reviews: any[];
    favorites: any[];
}

export const MyStoreList: React.FC<Props> = ({ reviews, favorites }) => {
    const [activeTab, setActiveTab] = useState<"reviews" | "favorites">("reviews");

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={14} className={i < rating ? "fill-warning text-warning" : "text-black-50 opacity-25"} />
        ));
    };

    return (
        <div className="py-4 py-lg-5">

            {/* 🟢 Tabs Navigation */}
            <div className="d-flex align-items-center gap-2 border-bottom border-light-subtle pb-4 mb-4">
                <button
                    onClick={() => setActiveTab("reviews")}
                    className={`btn rounded-pill px-4 py-2 fw-medium d-flex align-items-center gap-2 transition-all ${activeTab === "reviews" ? "btn-dark text-white" : "btn-light text-secondary hover-bg-light"}`}
                >
                    <MessageSquare size={16} /> รีวิวที่เขียน ({reviews.length})
                </button>
                <button
                    onClick={() => setActiveTab("favorites")}
                    className={`btn rounded-pill px-4 py-2 fw-medium d-flex align-items-center gap-2 transition-all ${activeTab === "favorites" ? "btn-dark text-white" : "btn-light text-secondary hover-bg-light"}`}
                >
                    <Heart size={16} /> ร้านโปรด ({favorites.length})
                </button>
            </div>

            {/* 🟢 Content: Reviews */}
            {activeTab === "reviews" && (
                <div className="d-flex flex-column animate-fade-in">
                    {reviews.length > 0 ? reviews.map((review, i) => (
                        <div key={review.id} className={`py-4 ${i !== reviews.length - 1 ? 'border-bottom border-light-subtle' : ''}`}>
                            <div className="d-flex gap-4">
                                <Link to={`/shop/${review.id}`} className="flex-shrink-0">
                                    <div className="rounded-4 overflow-hidden shadow-sm" style={{ width: '80px', height: '80px' }}>
                                        <img src={review.shopImage} alt={review.shopName} className="w-100 h-100 object-fit-cover transition-transform hover-scale" />
                                    </div>
                                </Link>
                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <Link to={`/shop/${review.id}`} className="text-dark text-decoration-none hover-underline"><h5 className="fw-bold m-0" style={{ fontSize: '1.1rem' }}>{review.shopName}</h5></Link>
                                        <small className="text-muted text-nowrap">{review.date}</small>
                                    </div>
                                    <div className="d-flex gap-1 mb-3">{renderStars(review.rating)}</div>
                                    <p className="text-secondary m-0 lh-base" style={{ fontSize: '0.95rem' }}>{review.comment}</p>
                                    <div className="mt-3">
                                        <span className="badge bg-light text-secondary border fw-normal d-inline-flex align-items-center gap-1 px-2 py-1"><Star size={12} className="fill-warning text-warning" /> {review.helpful} คนเห็นว่าเป็นประโยชน์</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-5 text-muted"><MessageSquare size={32} className="opacity-25 mb-3" /><p>ยังไม่มีรีวิว</p></div>
                    )}
                </div>
            )}

            {/* 🟢 Content: Favorites */}
            {activeTab === "favorites" && (
                <div className="row g-4 animate-fade-in">
                    {favorites.length > 0 ? favorites.map((shop) => (
                        <div className="col-12 col-md-6 col-lg-4" key={shop.id}>
                            <Link to={`/shop/${shop.id}`} className="text-decoration-none">
                                <div className="card border border-light-subtle rounded-4 overflow-hidden h-100 hover-shadow transition-all group">
                                    <div className="position-relative" style={{ height: '160px' }}>
                                        <img src={shop.image} alt={shop.name} className="w-100 h-100 object-fit-cover transition-transform group-hover-scale" />
                                        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}></div>
                                        <div className="position-absolute top-0 end-0 m-3"><Heart size={20} className="fill-danger text-danger" /></div>
                                        <div className="position-absolute bottom-0 start-0 m-3">
                                            <span className="badge bg-white text-dark rounded-pill px-2 py-1 fw-bold d-flex align-items-center gap-1 shadow-sm"><Star size={12} className="fill-warning text-warning" /> {shop.rating}</span>
                                        </div>
                                    </div>
                                    <div className="card-body p-4 bg-white">
                                        <h6 className="fw-bold text-dark mb-2 text-truncate" style={{ fontSize: '1rem' }}>{shop.name}</h6>
                                        <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: '0.75rem' }}>
                                            <span className="d-flex align-items-center gap-1"><MapPin size={12} /> {shop.zone}</span> • <span>{shop.category}</span> • <span>{shop.reviews} รีวิว</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )) : (
                        <div className="text-center py-5 text-muted col-12"><Heart size={32} className="opacity-25 mb-3" /><p>ยังไม่มีร้านโปรด</p></div>
                    )}
                </div>
            )}
        </div>
    );
};