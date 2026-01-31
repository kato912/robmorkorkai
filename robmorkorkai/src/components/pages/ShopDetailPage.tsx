import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ShopDetailMobileView from "../shop/ShopDetailMobileView";
import ShopDetailDesktopView from "../shop/ShopDetailDesktop";
import { shops } from "./HomePage"; 
import { ReviewModal } from "../shop/ReviewModal";

// Mock Data รีวิว (เอามาไว้ตรงนี้เพื่อให้ State จัดการได้)
const initialReviews = [
    { id: 1, userId: "u1", email: "student64@kkumail.com", rating: 5, comment: "บรรยากาศดีมาก แอร์เย็นเจี๊ยบ", verified: true, date: "2023-10-25" },
    { id: 2, userId: "u2", email: "engineer_boy@kkumail.com", rating: 4, comment: "กาแฟอร่อยครับ แต่โต๊ะเต็มไวไปหน่อย", verified: true, date: "2023-10-24" },
    { id: 3, userId: "u3", email: "guest001@gmail.com", rating: 3, comment: "เสียงดังไปนิดนึงช่วงสอบ", verified: false, date: "2023-10-23" },
    { id: 4, userId: "u4", email: "med_student@kkumail.com", rating: 5, comment: "ชอบมากครับ เปิดดึกดี", verified: true, date: "2023-10-22" },
];

// Interface สำหรับส่ง Props
export interface ShopDetailProps {
    shop: any;
    reviews: typeof initialReviews;
    verifiedOnly: boolean;
    setVerifiedOnly: (val: boolean) => void;
    isLoggedIn: boolean;
    hasMore: boolean;
    handleShowMore: (showAll?: boolean, collapse?: boolean) => void;
    totalFilteredCount: number;
    onOpenReviewModal: () => void; // ✅ เพิ่ม Prop นี้
}

const ShopDetailPage: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate(); // ใช้สำหรับ Redirect ถ้ายังไม่ Login
    
    // State
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [visibleCount, setVisibleCount] = useState(3);
    const [reviews, setReviews] = useState(initialReviews); // ใช้ State เก็บรีวิว
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false); // ✅ State เปิด/ปิด Modal

    // หาข้อมูลร้าน
    const shop = shops.find((s) => s.id === id);

    if (!shop) {
        return <div className="text-center mt-5">ไม่พบข้อมูลร้านค้า</div>;
    }

    // Logic กรองและแสดงผลรีวิว
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

    // ✅ ฟังก์ชันเปิด Modal (เช็ค Login ก่อน)
    const handleOpenReviewModal = () => {
        if (!isLoggedIn) {
            // ถ้ายังไม่ Login ให้เด้งไปหน้า Login หรือแจ้งเตือน
            alert("กรุณาเข้าสู่ระบบก่อนเขียนรีวิว");
            navigate("/login"); 
            return;
        }
        setIsReviewModalOpen(true);
    };

    // ✅ ฟังก์ชันเมื่อกดส่งรีวิว
    const handleSubmitReview = (rating: number, comment: string) => {
        const newReview = {
            id: Date.now(), // สร้าง ID มั่วๆ
            userId: "me",
            email: "myaccount@kkumail.com", // Mock User
            rating: rating,
            comment: comment,
            verified: true,
            date: new Date().toISOString()
        };

        // เพิ่มรีวิวใหม่ไปบนสุด
        setReviews([newReview, ...reviews]);
        // ปิด Modal
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
        onOpenReviewModal: handleOpenReviewModal // ✅ ส่งฟังก์ชันลงไป
    };

    return (
        <>
            <div className="d-lg-none">
                <ShopDetailMobileView {...viewProps} />
            </div>
            <div className="d-none d-lg-block">
                <ShopDetailDesktopView {...viewProps} />
            </div>

            {/* ✅ แปะ Modal ไว้ตรงนี้ (มันจะลอยทับทุกอย่างเอง) */}
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