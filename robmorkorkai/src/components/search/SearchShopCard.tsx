/**
 * SearchShopCard Component
 *
 * Displays a single shop in the search results as a horizontal card.
 * Features:
 * - Shop thumbnail image (35% width) with loading spinner and error handling
 * - Shop information (65% width) including name, category, rating, location, hours
 * - Responsive hover effects for better UX
 * - Image caching and lazy loading with fallback to SVG placeholder
 * - Link to shop detail page
 *
 * Props:
 * - shop: Shop object containing all necessary shop data
 *
 * CSS Classes Used:
 * - custom-search-card: Main card container with hover effects
 * - search-card-image-container: Image section with loading state
 * - search-card-image: Image element with fade effect
 * - search-card-content: Content section with shop info
 * - search-card-name: Shop name title
 * - search-card-category: Category text
 * - search-card-rating: Rating display with star
 * - search-card-info-row: Location and hours info
 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, Clock, Loader2 } from "lucide-react";
import type { Shop } from "../../types/shop";
import "./css/SearchShopCard.css";

interface Props {
    shop: Shop;
}

const DEFAULT_IMAGE_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='130'%3E%3Crect fill='%232d2320' width='160' height='130'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%238a7b72'%3E🍽️%3C/text%3E%3C/svg%3E";

const API_BASE = import.meta.env.VITE_API_URL;

// Convert image URL to proxy URL to avoid rate limiting
const getProxyImageUrl = (url: string): string => {
    if (!url) return DEFAULT_IMAGE_SVG;
    return `${API_BASE}/api/images/proxy?url=${encodeURIComponent(url)}`;
};

export const SearchShopCard: React.FC<Props> = ({ shop }) => {
    // Format rating to 1 decimal place
    const rating = shop.ratingAvg ? Number(shop.ratingAvg).toFixed(1) : "0.0";
    // Get review count, default to 0 if not available
    const reviewCount = shop.reviewCount || 0;
    
    const imageUrl = shop.coverImage || shop.image;
    
    // Try direct URL first for speed, only use proxy if direct fails
    const initialSrc = imageUrl || DEFAULT_IMAGE_SVG;
    const proxyUrl = imageUrl ? getProxyImageUrl(imageUrl) : DEFAULT_IMAGE_SVG;
    
    // State management for image loading
    const [imageSrc, setImageSrc] = useState(initialSrc);
    const [isLoading, setIsLoading] = useState(!!imageUrl);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!imageUrl) {
            setIsLoading(false);
            setImageSrc(DEFAULT_IMAGE_SVG);
            return;
        }
        // Reset state when URL changes
        setIsLoading(true);
        setHasError(false);
        setImageSrc(initialSrc); // Try direct URL first
    }, [imageUrl]);

    // Callback when image successfully loads - hide loader spinner
    const handleImageLoad = () => {
        setIsLoading(false);
    };

    // Callback when image fails to load - fall back to proxy
    const handleImageError = () => {
        if (!hasError && imageSrc !== proxyUrl) {
            // Try proxy as fallback
            setImageSrc(proxyUrl);
            setHasError(true);
        } else {
            // Proxy also failed, show placeholder
            setImageSrc(DEFAULT_IMAGE_SVG);
            setIsLoading(false);
        }
    };

    return (
        <Link to={`/shop/${shop.id}`} className="text-decoration-none">
            {/* Card container with image and content layout */}
            <div className="card shadow-sm rounded-4 overflow-hidden custom-search-card transition h-100">
                <div className="d-flex h-100">
                    {/* Shop Image Section - Left side (35% width) */}
                    <div className="search-card-image-container position-relative d-flex align-items-center justify-content-center">
                        {/* Loading spinner shown while image loads */}
                        {isLoading && !hasError && (
                            <div className="search-card-image-loading">
                                <Loader2 size={24} className="animate-spin" style={{ color: '#c9943a' }} />
                            </div>
                        )}
                        {/* Shop cover image with fallback */}
                        <img 
                            src={imageSrc} 
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            className="search-card-image w-100 h-100 object-fit-cover" 
                            alt={shop.name} 
                        />
                    </div>

                    {/* Shop Content Section - Right side (65% width) */}
                    <div className="search-card-content">
                        {/* Shop name header with category */}
                        <div className="d-flex justify-content-between align-items-start mb-1">
                            <h6 className="search-card-name">{shop.name}</h6>
                        </div>

                        {/* Category display */}
                        <p className="search-card-category">
                            {shop.category}
                        </p>

                        {/* Rating display with star icon and review count */}
                        <div className="search-card-rating">
                            <Star size={14} className="fill-warning" /> {rating}
                            <span className="search-card-review-count">({reviewCount})</span>
                        </div>

                        {/* Location and hours info */}
                        <div className="search-card-info-row">
                            <span className="search-card-info-item"><MapPin size={12} /> {shop.zone}</span>
                            <span className="search-card-info-item"><Clock size={12} /> {shop.openHours}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};