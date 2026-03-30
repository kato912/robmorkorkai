import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, Clock, Loader2 } from "lucide-react";
import type { Shop } from "../../types/shop";

interface Props {
    shop: Shop;
}

const DEFAULT_IMAGE_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='130'%3E%3Crect fill='%232d2320' width='160' height='130'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%238a7b72'%3E🍽️%3C/text%3E%3C/svg%3E";

export const SearchShopCard: React.FC<Props> = ({ shop }) => {
    const rating = shop.ratingAvg ? Number(shop.ratingAvg).toFixed(1) : "0.0";
    const reviewCount = shop.reviewCount || 0;
    const [imageSrc, setImageSrc] = useState(shop.coverImage || shop.image || DEFAULT_IMAGE_SVG);
    const [isLoading, setIsLoading] = useState(!!shop.coverImage || !!shop.image);
    const [showPlaceholder, setShowPlaceholder] = useState(false);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const handleImageError = () => {
        setImageSrc(DEFAULT_IMAGE_SVG);
        setShowPlaceholder(true);
        setIsLoading(false);
    };

    return (
        <Link to={`/shop/${shop.id}`} className="text-decoration-none">
            
            <style>{`
                .custom-search-card {
                    background-color: #231c18 !important;
                    border: 1px solid #3d302a !important;
                }
                .custom-search-card:hover {
                    border-color: #c9943a !important;
                    background-color: #2d2320 !important;
                }
                @keyframes spin {
                    100% { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
            `}</style>

            <div className="card shadow-sm rounded-4 overflow-hidden custom-search-card transition h-100">
                <div className="d-flex h-100">
                    {/* รูปภาพ */}
                    <div style={{ width: '35%', maxWidth: '160px', minWidth: '120px' }} className="position-relative d-flex align-items-center justify-content-center">
                        {isLoading && (
                            <div className="position-absolute d-flex align-items-center justify-content-center" style={{ width: '100%', height: '100%', backgroundColor: '#2d2320', zIndex: 10 }}>
                                <Loader2 size={24} className="animate-spin" style={{ color: '#c9943a' }} />
                            </div>
                        )}
                        <img 
                            src={imageSrc} 
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            className="w-100 h-100 object-fit-cover" 
                            alt={shop.name} 
                            style={{ minHeight: '130px', opacity: 0.9 }} 
                        />
                    </div>

                    {/* เนื้อหา */}
                    <div className="p-3 flex-grow-1 d-flex flex-column justify-content-center">
                        <div className="d-flex justify-content-between align-items-start mb-1">
                            <h6 className="fw-bold fs-6 text-truncate" style={{ maxWidth: '80%', color: '#f5ebe4', margin: 0 }}>{shop.name}</h6>
                        </div>

                        <p className="small text-truncate mb-2" style={{ maxWidth: '95%', fontSize: '0.8rem', color: '#9a8a7e', margin: 0 }}>
                            {shop.category}
                        </p>

                        <div className="d-flex align-items-center gap-1 small fw-bold mb-2" style={{ color: '#e8b94a' }}>
                            <Star size={14} className="fill-warning" style={{ color: '#e8b94a' }} /> {rating}
                            <span className="fw-normal" style={{ color: '#8a7b72' }}>({reviewCount})</span>
                        </div>

                        <div className="mt-auto">
                            <div className="d-flex flex-wrap align-items-center gap-2 small" style={{ fontSize: '0.75rem', color: '#9a8a7e' }}>
                                <span className="d-flex align-items-center gap-1"><MapPin size={12} /> {shop.zone}</span>
                                <span className="d-flex align-items-center gap-1"><Clock size={12} /> {shop.openHours}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};