// src/pages/ShopDetailPage.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useShopReviews } from "../../hooks/useShopReviews";
import { MOCK_SHOPS as shops } from "../../data/mockDatat";
import ShopDetailMobileView from "../shop/ShopDetailMobileView";
import ShopDetailDesktopView from "../shop/ShopDetailDesktop";
import { ReviewModal } from "../shop/ReviewModal";
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

const initialReviews = [
    { id: 1, userId: "u1", email: "student64@kkumail.com", rating: 5, comment: "บรรยากาศดีมาก แอร์เย็นเจี๊ยบ", verified: true, date: "2023-10-25" },
    { id: 2, userId: "u2", email: "engineer_boy@kkumail.com", rating: 4, comment: "กาแฟอร่อยครับ แต่โต๊ะเต็มไวไปหน่อย", verified: true, date: "2023-10-24" },
    { id: 3, userId: "u3", email: "guest001@gmail.com", rating: 3, comment: "เสียงดังไปนิดนึงช่วงสอบ", verified: false, date: "2023-10-23" },
    { id: 4, userId: "u4", email: "med_student@kkumail.com", rating: 5, comment: "ชอบมากครับ เปิดดึกดี", verified: true, date: "2023-10-22" },
];

const ShopDetailPage: React.FC = () => {
    const { isLoggedIn, user } = useAuth();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    // 1. เรียกใช้ Logic จาก Hook
    const { 
        reviews, totalCount, verifiedOnly, setVerifiedOnly, 
        hasMore, handleShowMore, addReview 
    } = useShopReviews(initialReviews);
    
    const shop = shops.find((s) => s.id === id);
    if (!shop) return <div className="text-center mt-5">ไม่พบข้อมูลร้านค้า</div>;

    // 2. Event Handlers
    const handleOpenReviewModal = () => {
        if (!isLoggedIn) {
            alert("กรุณาเข้าสู่ระบบก่อนเขียนรีวิว");
            navigate("/login");
            return;
        }
        setIsReviewModalOpen(true);
    };

    const handleSubmitReview = (rating: number, comment: string) => {
        addReview({
            id: Date.now(),
            userId: user?.id,
            userName: user?.name,
            userImage: user?.image,
            email: user?.email,
            rating,
            comment,
            verified: user?.isVerifiedStudent || false,
            date: new Date().toISOString()
        });
        setIsReviewModalOpen(false);
    };

    // 3. รวบรวม Props
    const viewProps = {
        shop, reviews, verifiedOnly, setVerifiedOnly,
        hasMore, handleShowMore, totalFilteredCount: totalCount,
        onOpenReviewModal: handleOpenReviewModal,
        isVerifiedStudent: user?.isVerifiedStudent || false
    };

    return (
        <>
            <div className="d-lg-none"><ShopDetailMobileView {...viewProps} /></div>
            <div className="d-none d-lg-block"><ShopDetailDesktopView {...viewProps} /></div>

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