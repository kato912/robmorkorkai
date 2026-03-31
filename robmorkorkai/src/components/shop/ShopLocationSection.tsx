import React from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { Shop } from "../../types/shop";
import { ShopSidebar } from "./ShopSidebar";
import "./css/ShopLocationSection.css";

interface ShopLocationSectionProps {
    shop: Shop;
    averageRating: string;
    reviewsCount: number;
    isLoggedIn: boolean;
    isFavorited: boolean;
    onToggleFavorite: () => void;
    onOpenReviewModal: () => void;
    onOpenGoogleMaps: () => void;
}

/**
 * ShopLocationSection Component
 * 
 * Displays shop location via embedded Google Maps and contact information sidebar.
 * Features:
 * - Left column: Google Maps iframe or fallback placeholder
 * - Right column: ShopSidebar with contact info, hours, rating, and action buttons
 * - Responsive layout: side-by-side on desktop, stacked on mobile
 * - "Open in Google Maps" button for mobile navigation
 * 
 * Props:
 * - shop: Shop object with latitude, longitude, zone, address
 * - averageRating: Shop's average rating (passed to ShopSidebar)
 * - reviewsCount: Number of reviews (passed to ShopSidebar)
 * - isLoggedIn: User authentication status
 * - isFavorited: Whether shop is in user's favorites
 * - onToggleFavorite: Callback to toggle favorite status
 * - onOpenReviewModal: Callback to open review submission modal
 * - onOpenGoogleMaps: Callback to open Google Maps (for mobile navigation)
 * 
 * CSS Classes Used:
 * - location-container: Main container with centered layout
 * - location-row: Flexbox row for side-by-side layout
 * - location-map-col: Left column for map (flex: 1 for equal width)
 * - location-sidebar-col: Right column for sidebar (flex: 1 for equal width)
 * - location-section-title: Map section title styling
 * - map-card: Container for map iframe/placeholder
 * - map-iframe: Embedded Google Maps styling
 * - map-placeholder: Fallback when coordinates are missing
 * - map-button: "Open in Google Maps" button styling
 */
export const ShopLocationSection: React.FC<ShopLocationSectionProps> = ({
    shop,
    averageRating,
    reviewsCount,
    isLoggedIn,
    isFavorited,
    onToggleFavorite,
    onOpenReviewModal,
    onOpenGoogleMaps
}) => {
    return (
        // Location section with centered container and flexible row layout
        <section className="shop-location-section w-100">
            <div className="location-container">
                {/* Flex row - side-by-side on desktop, stacked on mobile */}
                <div className="location-row">
                    {/* Map Section - Left Column (50% width on desktop, 100% on mobile) */}
                    <div className="location-map-col">
                        {/* Map Section Title - Shows zone information */}
                        <h6 className="fw-bold text-uppercase tracking-wider location-section-title">
                            พิกัดร้าน (Zone {shop.zone})
                        </h6>
                        {/* Map Container - Holds iframe or placeholder */}
                        <div className="map-card">
                            {/* Google Maps Iframe - Displays map if coordinates exist */}
                            {shop.latitude && shop.longitude ? (
                                <iframe 
                                    title="Shop Location Full" 
                                    width="100%" 
                                    height="280" 
                                    className="map-iframe"
                                    loading="lazy" 
                                    allowFullScreen 
                                    src={`https://google.com/maps?q=${shop.latitude},${shop.longitude}&hl=th&z=15&output=embed`}
                                ></iframe>
                            ) : (
                                // Fallback placeholder when coordinates are not available
                                <div className="map-placeholder rounded-4">
                                    <MapPin size={32} className="opacity-50 map-placeholder-icon" />
                                    <span className="small fw-medium">ไม่มีข้อมูลพิกัด</span>
                                </div>
                            )}
                            {/* "Open in Google Maps" Button - Navigation button for mobile users */}
                            <button 
                                onClick={onOpenGoogleMaps} 
                                className="map-button"
                            >
                                <MapPin size={18} /> เปิดนำทางบน Google Maps <ArrowUpRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Shop Information Sidebar - Right Column (50% width on desktop, 100% on mobile) */}
                    <div className="location-sidebar-col">
                        {/* ShopSidebar Component - Displays contact info, hours, rating, and action buttons */}
                        <ShopSidebar 
                            shop={shop} 
                            averageRating={averageRating} 
                            reviewsCount={reviewsCount} 
                            isLoggedIn={isLoggedIn} 
                            isFavorited={isFavorited} 
                            onToggleFavorite={onToggleFavorite} 
                            onOpenReviewModal={onOpenReviewModal} 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
