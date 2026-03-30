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
            <Star key={i} size={14} className={i < rating ? "fill-warning" : "opacity-25"} style={{ color: i < rating ? '#e8b94a' : '#8a7b72' }} />
        ));
    };

    return (
        <div className="py-4 py-lg-5">
            <div className="d-flex align-items-center gap-2 pb-4 mb-4" style={{ borderBottom: '1px solid #3d302a' }}>
                <button
                    onClick={() => setActiveTab("reviews")}
                    className="btn rounded-pill px-4 py-2 fw-medium d-flex align-items-center gap-2 transition-all"
                    style={{ 
                        backgroundColor: activeTab === "reviews" ? "#A73B24" : "#231c18", 
                        color: activeTab === "reviews" ? "#fff5f0" : "#9a8a7e",
                        border: '1px solid #3d302a'
                    }}
                >
                    <MessageSquare size={16} /> รีวิวที่เขียน ({reviews.length})
                </button>
                <button
                    onClick={() => setActiveTab("favorites")}
                    className="btn rounded-pill px-4 py-2 fw-medium d-flex align-items-center gap-2 transition-all"
                    style={{ 
                        backgroundColor: activeTab === "favorites" ? "#A73B24" : "#231c18", 
                        color: activeTab === "favorites" ? "#fff5f0" : "#9a8a7e",
                        border: '1px solid #3d302a'
                    }}
                >
                    <Heart size={16} /> ร้านโปรด ({favorites.length})
                </button>
            </div>

            {activeTab === "reviews" && (
                <div className="d-flex flex-column animate-fade-in">
                    {reviews.length > 0 ? reviews.map((review, i) => (
                        <div key={review.id} className="py-4" style={{ borderBottom: i !== reviews.length - 1 ? '1px solid #3d302a' : 'none' }}>
                            <div className="d-flex gap-4">
                                <Link to={`/shop/${review.id}`} className="flex-shrink-0">
                                    <div className="rounded-4 overflow-hidden shadow-sm" style={{ width: '80px', height: '80px', border: '1px solid #3d302a' }}>
                                        <img src={review.shopImage} alt={review.shopName} className="w-100 h-100 object-fit-cover transition-transform hover-scale" />
                                    </div>
                                </Link>
                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <Link to={`/shop/${review.id}`} className="text-decoration-none hover-underline"><h5 className="fw-bold m-0" style={{ fontSize: '1.1rem', color: '#f5ebe4' }}>{review.shopName}</h5></Link>
                                        <small className="text-nowrap" style={{ color: '#8a7b72' }}>{review.date}</small>
                                    </div>
                                    <div className="d-flex gap-1 mb-3">{renderStars(review.rating)}</div>
                                    <p className="m-0 lh-base" style={{ fontSize: '0.95rem', color: '#e8ebe4' }}>{review.comment}</p>
                                    <div className="mt-3">
                                        <span className="badge fw-normal d-inline-flex align-items-center gap-1 px-2 py-1" style={{ backgroundColor: '#2d2320', color: '#9a8a7e', border: '1px solid #3d302a' }}><Star size={12} className="fill-warning" style={{ color: '#e8b94a' }} /> {review.helpful} คนเห็นว่าเป็นประโยชน์</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-5" style={{ color: '#8a7b72' }}><MessageSquare size={32} className="opacity-25 mb-3" /><p>ยังไม่มีรีวิว</p></div>
                    )}
                </div>
            )}

            {activeTab === "favorites" && (
                <div className="row g-4 animate-fade-in">
                    {favorites.length > 0 ? favorites.map((shop) => (
                        <div className="col-12 col-md-6 col-lg-4" key={shop.id}>
                            <Link to={`/shop/${shop.id}`} className="text-decoration-none">
                                <div className="card rounded-4 overflow-hidden h-100 hover-shadow transition-all group" style={{ backgroundColor: '#231c18', border: '1px solid #3d302a' }}>
                                    <div className="position-relative" style={{ height: '160px' }}>
                                        <img src={shop.image} alt={shop.shopName} className="w-100 h-100 object-fit-cover transition-transform group-hover-scale" />
                                        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to top, rgba(26,20,18,0.8), transparent)' }}></div>
                                        <div className="position-absolute top-0 end-0 m-3"><Heart size={20} className="fill-danger" style={{ color: '#A73B24' }} /></div>
                                        <div className="position-absolute bottom-0 start-0 m-3">
                                            <span className="badge rounded-pill px-2 py-1 fw-bold d-flex align-items-center gap-1 shadow-sm" style={{ backgroundColor: '#2d2320', color: '#e8b94a', border: '1px solid #3d302a' }}><Star size={12} className="fill-warning" style={{ color: '#e8b94a' }} /> {shop.rating}</span>
                                        </div>
                                    </div>
                                    <div className="card-body p-4" style={{ backgroundColor: '#231c18' }}>
                                        <h6 className="fw-bold mb-2 text-truncate" style={{ fontSize: '1rem', color: '#f5ebe4' }}>{shop.shopName}</h6>
                                        <div className="d-flex align-items-center gap-2" style={{ fontSize: '0.75rem', color: '#9a8a7e' }}>
                                            <span className="d-flex align-items-center gap-1"><MapPin size={12} /> {shop.zone}</span> • <span>{shop.category}</span> • <span>{shop.reviews} รีวิว</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )) : (
                        <div className="text-center py-5 col-12" style={{ color: '#8a7b72' }}><Heart size={32} className="opacity-25 mb-3" /><p>ยังไม่มีร้านโปรด</p></div>
                    )}
                </div>
            )}
        </div>
    );
};