import React from "react";
import type { ShopDetailProps } from "../pages/ShopDetailPage";
import { ShopMobileHeader } from "../shop/mobileComponents/ShopMobileHeader";
import { ShopMobileInfo } from "../shop/mobileComponents/ShopMobileInfo";
import { ShopMobileReviewList } from "../shop/mobileComponents/ShopMobileReviewList";
import { ShopMobileBottomBar } from "../shop/mobileComponents/ShopMobileBottomBar";

const ShopDetailMobileView: React.FC<ShopDetailProps> = ({
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
        <div className="bg-white min-vh-100" style={{ paddingBottom: '100px' }}>
            
            {/* 1. Header Image */}
            <ShopMobileHeader shop={shop} />

            <div className="container py-3">
                {/* 2. Shop Info & Description */}
                <ShopMobileInfo shop={shop} />

                {/* 3. Review List Section */}
                <ShopMobileReviewList 
                    reviews={reviews}
                    verifiedOnly={verifiedOnly}
                    setVerifiedOnly={setVerifiedOnly}
                    hasMore={hasMore}
                    handleShowMore={handleShowMore}
                    totalFilteredCount={totalFilteredCount}
                />
            </div>

            {/* 4. Fixed Bottom Button */}
            <ShopMobileBottomBar onOpenReviewModal={onOpenReviewModal} />

        </div>
    );
};

export default ShopDetailMobileView;