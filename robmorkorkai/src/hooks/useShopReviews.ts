import { useEffect, useMemo, useState } from "react";
import type { Review } from "../types/shop";

interface SubmitReviewResult {
    review: Review;
    shopSummary: {
        newRatingAvg: number;
        totalReviews: number;
    };
}

interface BackendReview {
    id: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
    user: {
        name?: string | null;
        image?: string | null;
        email?: string | null;
        isVerifiedStudent?: boolean;
    };
}

const formatReviewDate = (createdAt: string) => {
    const now = Date.now();
    const created = new Date(createdAt).getTime();
    const diffMs = created - now;

    const minutes = Math.round(diffMs / (1000 * 60));
    const hours = Math.round(diffMs / (1000 * 60 * 60));
    const days = Math.round(diffMs / (1000 * 60 * 60 * 24));

    const formatter = new Intl.RelativeTimeFormat("th", { numeric: "auto" });

    if (Math.abs(minutes) < 60) return formatter.format(minutes, "minute");
    if (Math.abs(hours) < 24) return formatter.format(hours, "hour");
    return formatter.format(days, "day");
};

const mapBackendReview = (review: BackendReview): Review => ({
    id: review.id,
    userId: review.userId,
    userName: review.user?.name,
    userImage: review.user?.image,
    email: review.user?.email,
    rating: review.rating,
    comment: review.comment,
    verified: Boolean(review.user?.isVerifiedStudent),
    date: formatReviewDate(review.createdAt),
    createdAt: review.createdAt
});

export const useShopReviews = (shopId?: string) => {
    const [allReviews, setAllReviews] = useState<Review[]>([]);
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [visibleCount, setVisibleCount] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            if (!shopId) {
                setAllReviews([]);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/reviews/shop/${shopId}`);
                if (!response.ok) {
                    throw new Error("โหลดรีวิวไม่สำเร็จ");
                }

                const data = await response.json();
                const mapped = Array.isArray(data.reviews)
                    ? data.reviews.map((review: BackendReview) => mapBackendReview(review))
                    : [];

                setAllReviews(mapped);
                setVisibleCount(3);
            } catch (err) {
                const message = err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการโหลดรีวิว";
                setError(message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviews();
    }, [shopId]);

    const filteredReviews = useMemo(
        () => (verifiedOnly ? allReviews.filter((review) => review.verified) : allReviews),
        [allReviews, verifiedOnly]
    );
    const displayedReviews = filteredReviews.slice(0, visibleCount);
    const hasMore = visibleCount < filteredReviews.length;

    const handleShowMore = (showAll = false, collapse = false) => {
        if (collapse) setVisibleCount(3);
        else if (showAll) setVisibleCount(filteredReviews.length);
        else setVisibleCount(prev => prev + 3);
    };

    const submitReview = async (rating: number, comment: string): Promise<SubmitReviewResult> => {
        if (!shopId) {
            throw new Error("ไม่พบรหัสร้านค้า");
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    shopId,
                    rating,
                    comment
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || "ส่งรีวิวไม่สำเร็จ");
            }

            const review = mapBackendReview(data.review as BackendReview);
            setAllReviews((prev) => [review, ...prev.filter((item) => item.id !== review.id)]);

            return {
                review,
                shopSummary: data.shopSummary
            };
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        reviews: displayedReviews,
        totalCount: allReviews.length,
        verifiedOnly,
        setVerifiedOnly,
        hasMore,
        handleShowMore,
        isLoading,
        isSubmitting,
        error,
        submitReview
    };
};