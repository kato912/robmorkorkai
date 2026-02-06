import { useState } from "react";
import type { Review } from "../types/shop"; 

export const useShopReviews = (initialReviews: Review[]) => {
    const [reviews, setReviews] = useState(initialReviews);
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [visibleCount, setVisibleCount] = useState(3);

    const filteredReviews = verifiedOnly ? reviews.filter(r => r.verified) : reviews;
    const displayedReviews = filteredReviews.slice(0, visibleCount);
    const hasMore = visibleCount < filteredReviews.length;

    const handleShowMore = (showAll = false, collapse = false) => {
        if (collapse) setVisibleCount(3);
        else if (showAll) setVisibleCount(filteredReviews.length);
        else setVisibleCount(prev => prev + 3);
    };

    const addReview = (newReview: any) => {
        setReviews(prev => [newReview, ...prev]);
    };

    return {
        reviews: displayedReviews,
        totalCount: filteredReviews.length,
        verifiedOnly,
        setVerifiedOnly,
        hasMore,
        handleShowMore,
        addReview
    };
};