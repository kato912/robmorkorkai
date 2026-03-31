import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import type { Shop } from "../../types/shop";
import "./css/ShopCard.css";

const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23231c18;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%233d302a;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='180' height='180' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%239a8a7e'%3ENo Image%3C/text%3E%3C/svg%3E";

const API_BASE = import.meta.env.VITE_API_URL;

// Convert image URL to proxy URL to avoid rate limiting
const getProxyImageUrl = (url: string): string => {
    if (!url) return FALLBACK_IMAGE;
    return `${API_BASE}/api/images/proxy?url=${encodeURIComponent(url)}`;
};

export const ShopCard: React.FC<{ shop: Shop }> = ({ shop }) => {
    const imageUrl = shop.coverImage || shop.image;
    
    // Try direct URL first for speed, only use proxy if direct fails
    const initialSrc = imageUrl || FALLBACK_IMAGE;
    const proxyUrl = imageUrl ? getProxyImageUrl(imageUrl) : FALLBACK_IMAGE;
    
    const [imageSrc, setImageSrc] = useState(initialSrc);
    const [isLoading, setIsLoading] = useState(!!imageUrl);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!imageUrl) {
            setIsLoading(false);
            setImageSrc(FALLBACK_IMAGE);
            return;
        }
        // Reset state when URL changes
        setIsLoading(true);
        setHasError(false);
        setImageSrc(initialSrc); // Try direct URL first
    }, [imageUrl]);

    const handleImageError = () => {
        if (!hasError && imageSrc !== proxyUrl) {
            // Try proxy as fallback
            setImageSrc(proxyUrl);
            setHasError(true);
        } else {
            // Proxy also failed, show placeholder
            setImageSrc(FALLBACK_IMAGE);
            setIsLoading(false);
        }
    };

    return (
        <Link to={`/shop/${shop.id}`} className="text-decoration-none">
            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden" style={{ background: '#231c18'}}>
                <div className="position-relative" style={{ height: "180px" }}>
                    {isLoading && !hasError && (
                        <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: '#3d302a', zIndex: 1 }}>
                            <div className="spinner-border" style={{ color: '#e8b94a', width: '1.5rem', height: '1.5rem' }} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                    <img
                        src={imageSrc}
                        loading="lazy"
                        alt={shop.name}
                        className="w-100 h-100 object-fit-cover"
                        style={{ display: 'block' }}
                        onLoad={() => setIsLoading(false)}
                        onError={handleImageError}
                    />
                </div>

                <div className="card-body">
                    <h5 className="fw-bold mb-3 text-truncate" style={{color: '#f5ebe4'}} title={shop.name}>
                        {shop.name}
                    </h5>
                    <div className="d-flex gap-3 text-muted small mb-2">
                        <span className="text-warning fw-bold d-flex align-items-center gap-1"><Star size={14} className="fill-warning" /> {shop.ratingAvg}</span>
                        <span className="d-flex align-items-center gap-1" style={{ color:'#9a8a7e'}}><MapPin size={14} /> {shop.zone}</span>
                    </div>
                    <p className="card-text text-secondary small mb-0 pt-2 border-top">{shop.category}</p>
                </div>
            </div>
        </Link>
    );
};