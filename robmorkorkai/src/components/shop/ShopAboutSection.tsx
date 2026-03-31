import React from "react";
import { Quote } from "lucide-react";
import type { Shop } from "../../types/shop";
import "./css/ShopAboutSection.css";

interface ShopAboutSectionProps {
    shop: Shop;
}

/**
 * ShopAboutSection Component
 * 
 * Displays the shop's description/about information in a visually appealing card.
 * Features:
 * - Section title "เกี่ยวกับร้านค้า" (About Shop)
 * - Quote icon for visual interest
 * - Shop description text with fallback message
 * - Styled as a card with rounded corners and shadow
 * 
 * Props:
 * - shop: Shop object containing the description field
 * 
 * CSS Classes Used:
 * - shop-about-section: Main section wrapper
 * - shop-about-card: Card container for content
 * - shop-about-content: Flex container for icon and text
 * - shop-about-icon: Quote icon styling
 * - shop-about-text: Description text styling
 */
export const ShopAboutSection: React.FC<ShopAboutSectionProps> = ({ shop }) => {
    return (
        // About section with standard container padding and responsive spacing
        <section className="shop-about-section w-100">
            <div className="container-fluid px-4 px-xl-5">
                <div className="row">
                    <div className="col-12">
                        {/* Section Title - "About Shop" header */}
                        <h6 className="shop-about-title">เกี่ยวกับร้านค้า</h6>
                        {/* About Info Card - Contains quote icon and description */}
                        <div className="card rounded-4 p-4 p-lg-5 shadow-sm border-0 shop-about-card">
                            <div className="shop-about-content">
                                {/* Quote Icon - Visual indicator that this is description/testimonial section */}
                                <Quote size={40} className="flex-shrink-0 shop-about-icon" />
                                {/* Shop Description - Shows shop details or fallback message if not provided */}
                                <p className="shop-about-text">
                                    {shop.description || "ยังไม่มีข้อมูลรายละเอียดของร้านค้านี้"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
