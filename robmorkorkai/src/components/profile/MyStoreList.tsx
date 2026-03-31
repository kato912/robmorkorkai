/**
 * MyStoreList Component
 *
 * Displays user reviews and favorite shops in tabbed interface.
 * Features:
 * - Tabs for switching between reviews and favorites
 * - Review list with shop image, name, rating, and comment
 * - Helpful count badge on reviews
 * - Favorites grid with shop cards (image, rating, basic info)
 * - Empty states for both tabs
 * - Responsive grid layout for favorites
 *
 * Props:
 * - reviews: Array of user review objects
 * - favorites: Array of favorite shop objects
 *
 * CSS Classes Used:
 * - my-store-list: Main container
 * - store-list-tabs: Tab buttons container
 * - reviews-container: Reviews list section
 * - favorites-grid: Favorites grid layout
 * - review-card: Individual review card
 * - favorite-shop-card: Individual shop card in favorites
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Heart, MapPin, MessageSquare } from "lucide-react";
import "./css/MyStoreList.css";

interface Props {
    reviews: any[];
    favorites: any[];
}

export const MyStoreList: React.FC<Props> = ({ reviews, favorites }) => {
    // State for active tab (reviews or favorites)
    const [activeTab, setActiveTab] = useState<"reviews" | "favorites">("reviews");

    // Helper function to render star rating
    // Returns 5 stars with filled/empty based on rating value
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                size={14}
                className={i < rating ? "fill-warning" : "opacity-25"}
                style={{ color: i < rating ? '#e8b94a' : '#8a7b72' }}
            />
        ));
    };

    return (
        <div className="my-store-list">
            {/* Tab Header - Reviews and Favorites toggle buttons */}
            <div className="store-list-tabs">
                {/* Reviews Tab Button */}
                <button
                    onClick={() => setActiveTab("reviews")}
                    className={`store-list-tab-button ${
                        activeTab === "reviews"
                            ? "store-list-tab-button-active"
                            : "store-list-tab-button-inactive"
                    }`}
                >
                    <MessageSquare size={16} /> รีวิวที่เขียน ({reviews.length})
                </button>

                {/* Favorites Tab Button */}
                <button
                    onClick={() => setActiveTab("favorites")}
                    className={`store-list-tab-button ${
                        activeTab === "favorites"
                            ? "store-list-tab-button-active"
                            : "store-list-tab-button-inactive"
                    }`}
                >
                    <Heart size={16} /> ร้านโปรด ({favorites.length})
                </button>
            </div>

            {/* Reviews Tab - List of user reviews */}
            {activeTab === "reviews" && (
                <div className="reviews-container">
                    {reviews.length > 0 ? (
                        reviews.map((review, i) => (
                            <div
                                key={review.id}
                                className={`review-card ${
                                    i !== reviews.length - 1 ? "review-card-with-divider" : ""
                                }`}
                            >
                                <div className="review-card-layout">
                                    {/* Review Shop Image */}
                                    <Link to={`/shop/${review.id}`} className="review-shop-image-wrapper">
                                        <div className="review-shop-image">
                                            <img
                                                src={review.shopImage}
                                                alt={review.shopName}
                                                className="w-100 h-100 object-fit-cover"
                                            />
                                        </div>
                                    </Link>

                                    {/* Review Content */}
                                    <div className="review-content">
                                        {/* Shop Name and Date */}
                                        <div className="review-header">
                                            <Link
                                                to={`/shop/${review.id}`}
                                                className="text-decoration-none"
                                            >
                                                <h5 className="review-shop-name">{review.shopName}</h5>
                                            </Link>
                                            <small className="review-date">{review.date}</small>
                                        </div>

                                        {/* Star Rating */}
                                        <div className="review-stars">{renderStars(review.rating)}</div>

                                        {/* Review Comment Text */}
                                        <p className="review-comment">{review.comment}</p>

                                        {/* Helpful Count Badge */}
                                        <span className="review-helpful-badge">
                                            <Star size={12} className="fill-warning" /> {review.helpful} คนเห็นว่า
                                            เป็นประโยชน์
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                            <MessageSquare size={32} className="empty-state-icon" />
                            <p>ยังไม่มีรีวิว</p>
                        </div>
                    )}
                </div>
            )}

            {/* Favorites Tab - Grid of favorite shops */}
            {activeTab === "favorites" && (
                <div className="favorites-grid">
                    {favorites.length > 0 ? (
                        favorites.map((shop) => (
                            <Link
                                to={`/shop/${shop.id}`}
                                className="text-decoration-none"
                                key={shop.id}
                            >
                                <div className="favorite-shop-card">
                                    {/* Shop Card Image Section */}
                                    <div className="favorite-shop-image-container">
                                        <img
                                            src={shop.image}
                                            alt={shop.shopName}
                                            className="favorite-shop-image w-100 h-100"
                                        />
                                        {/* Dark gradient overlay at bottom */}
                                        <div className="favorite-shop-overlay"></div>

                                        {/* Heart Icon - Favorite indicator */}
                                        <div className="favorite-heart-icon">
                                            <Heart size={20} />
                                        </div>

                                        {/* Rating Badge */}
                                        <span className="favorite-rating-badge">
                                            <Star size={12} className="fill-warning" /> {shop.rating}
                                        </span>
                                    </div>

                                    {/* Shop Card Content Section */}
                                    <div className="favorite-shop-body">
                                        <h6 className="favorite-shop-title">{shop.shopName}</h6>
                                        <div className="favorite-shop-meta">
                                            <span className="d-flex align-items-center gap-1">
                                                <MapPin size={12} /> {shop.zone}
                                            </span>
                                            • <span>{shop.category}</span> • <span>{shop.reviews} รีวิว</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="empty-state">
                            <Heart size={32} className="empty-state-icon" />
                            <p>ยังไม่มีร้านโปรด</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};