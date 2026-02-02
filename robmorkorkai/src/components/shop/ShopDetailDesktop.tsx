import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import type { ShopDetailProps } from "../pages/ShopDetailPage";
import { TopNavbar } from "../layout/TopNavbar";
import { ShopImageGallery } from "../shop/desktopComponents/ShopImageGallery";
import { ShopInfoCard } from "../shop/desktopComponents/ShopInfoCard";
import { ShopReviewSection } from "../shop/desktopComponents/ShopReviewSection";

const ShopDetailDesktopView: React.FC<ShopDetailProps> = ({
    shop,
    reviews,
    verifiedOnly,
    setVerifiedOnly, 
    hasMore,
    handleShowMore,
    totalFilteredCount,
    onOpenReviewModal
}) => {
    return (
        <div className="bg-light min-vh-100">
            {/* Top Navbar */}
            <TopNavbar activePage="Shopdetail" />

            <div className="container py-5">
                {/* Breadcrumb */}
                <div className="mb-4">
                    <Link to="/" className="text-decoration-none text-secondary d-inline-flex align-items-center gap-1 hover-dark">
                        <ChevronLeft size={16} /> กลับไปหน้าแรก
                    </Link>
                </div>

                <div className="row g-5">
                    {/* Left Column: Images */}
                    <div className="col-lg-6">
                        <ShopImageGallery 
                            image={shop.image} 
                            name={shop.name} 
                        />
                    </div>

                    {/* Right Column: Info & Reviews */}
                    <div className="col-lg-6">
                        <ShopInfoCard 
                            shop={shop} 
                            totalFilteredCount={totalFilteredCount} 
                            onOpenReviewModal={onOpenReviewModal} 
                        />
                        
                        <ShopReviewSection 
                            reviews={reviews}
                            verifiedOnly={verifiedOnly}
                            setVerifiedOnly={setVerifiedOnly}
                            hasMore={hasMore}
                            handleShowMore={handleShowMore}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopDetailDesktopView;