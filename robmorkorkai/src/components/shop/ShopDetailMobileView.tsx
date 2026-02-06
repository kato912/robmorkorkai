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
        <div className="min-vh-100" style={{ backgroundColor: '#DEE2E6', paddingBottom: '100px' }}>
            
            {/* Header Image */}
            <ShopMobileHeader shop={shop} />

            <div className="container py-3">
                {/* Shop Info & Description */}
                <ShopMobileInfo shop={shop} />

                {/* Review List Section */}
                <ShopMobileReviewList 
                    reviews={reviews}
                    verifiedOnly={verifiedOnly}
                    setVerifiedOnly={setVerifiedOnly}
                    hasMore={hasMore}
                    handleShowMore={handleShowMore}
                    totalFilteredCount={totalFilteredCount}
                />
            </div>

            {/* Bottom Button */}
            <ShopMobileBottomBar onOpenReviewModal={onOpenReviewModal} />

        </div>
    );
};

export default ShopDetailMobileView;