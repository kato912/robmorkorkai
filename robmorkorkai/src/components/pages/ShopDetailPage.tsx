import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ShopDetailMobileView from "../shop/ShopDetailMobileView";
import ShopDetailDesktopView from "../shop/ShopDetailDesktop";
import { ReviewModal } from "../shop/ReviewModal";

// ✅ แก้ตรงนี้: Import จากไฟล์ mockData แทน HomePage
import { MOCK_SHOPS as shops } from "../../data/mockDatat"; 

// Mock Data รีวิว (เก็บไว้ที่เดิมได้ หรือจะย้ายไป mockData ก็ได้ แต่เก็บไว้ที่นี่ก่อนเพื่อง่ายต่อการแก้)
const initialReviews = [
    { id: 1, userId: "u1", email: "student64@kkumail.com", rating: 5, comment: "บรรยากาศดีมาก แอร์เย็นเจี๊ยบ", verified: true, date: "2023-10-25" },
    { id: 2, userId: "u2", email: "engineer_boy@kkumail.com", rating: 4, comment: "กาแฟอร่อยครับ แต่โต๊ะเต็มไวไปหน่อย", verified: true, date: "2023-10-24" },
    { id: 3, userId: "u3", email: "guest001@gmail.com", rating: 3, comment: "เสียงดังไปนิดนึงช่วงสอบ", verified: false, date: "2023-10-23" },
    { id: 4, userId: "u4", email: "med_student@kkumail.com", rating: 5, comment: "ชอบมากครับ เปิดดึกดี", verified: true, date: "2023-10-22" },
];

export interface ShopDetailProps {
    shop: any;
    reviews: typeof initialReviews;
    verifiedOnly: boolean;
    setVerifiedOnly: (val: boolean) => void;
    isLoggedIn: boolean;
    hasMore: boolean;
    handleShowMore: (showAll?: boolean, collapse?: boolean) => void;
    totalFilteredCount: number;
    onOpenReviewModal: () => void;
}

const ShopDetailPage: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    // State
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [visibleCount, setVisibleCount] = useState(3);
    const [reviews, setReviews] = useState(initialReviews);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    // หาข้อมูลร้าน (จากข้อมูลกลางที่ import มาใหม่)
    const shop = shops.find((s) => s.id === id);

    if (!shop) {
        return <div className="text-center mt-5">ไม่พบข้อมูลร้านค้า</div>;
    }

    const filteredReviews = verifiedOnly ? reviews.filter(r => r.verified) : reviews;
    const displayedReviews = filteredReviews.slice(0, visibleCount);
    const hasMore = visibleCount < filteredReviews.length;

    const handleShowMore = (showAll = false, collapse = false) => {
        if (collapse) {
            setVisibleCount(3);
        } else if (showAll) {
            setVisibleCount(filteredReviews.length);
        } else {
            setVisibleCount((prev) => prev + 3);
        }
    };

    const handleOpenReviewModal = () => {
        if (!isLoggedIn) {
            alert("กรุณาเข้าสู่ระบบก่อนเขียนรีวิว");
            navigate("/login"); 
            return;
        }
        setIsReviewModalOpen(true);
    };

    const handleSubmitReview = (rating: number, comment: string) => {
        const newReview = {
            id: Date.now(),
            userId: "me",
            email: "myaccount@kkumail.com",
            rating: rating,
            comment: comment,
            verified: true,
            date: new Date().toISOString()
        };
        setReviews([newReview, ...reviews]);
        setIsReviewModalOpen(false);
    };

    const viewProps: ShopDetailProps = {
        shop,
        reviews: displayedReviews,
        verifiedOnly,
        setVerifiedOnly,
        isLoggedIn,
        hasMore,
        handleShowMore,
        totalFilteredCount: filteredReviews.length,
        onOpenReviewModal: handleOpenReviewModal
    };

    return (
        <>
            <div className="d-lg-none">
                <ShopDetailMobileView {...viewProps} />
            </div>
            <div className="d-none d-lg-block">
                <ShopDetailDesktopView {...viewProps} />
            </div>

            <ReviewModal 
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                onSubmit={handleSubmitReview}
                shopName={shop.name}
                shopImage={shop.image}
            />
        </>
    );
};

export default ShopDetailPage;