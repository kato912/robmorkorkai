import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ShopDetailMobileView from "../shop/ShopDetailMobileView";
import ShopDetailDesktopView from "../shop/ShopDetailDesktop";

// export to shopdetailDesktop/shopdetailMobile
export interface ShopDetailProps {
    shop: typeof shopInfo;
    reviews: typeof reviewsData;
    verifiedOnly: boolean;
    setVerifiedOnly: (val: boolean) => void;
    isLoggedIn: boolean;
}

// Mock Data (คงเดิม)
const shopInfo = {
    id: "1",
    name: "Library Cafe KKU",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop",
    zone: "กังสดาล",
    category: "คาเฟ่/อ่านหนังสือ",
    openTime: "10:00 - 00:00 น.",
    rating: 4.8,
    reviewCount: 120,
    googleMap: "https://goo.gl/maps/xxxx"
};

const reviewsData = [
    { id: "1", email: "student64@kkumail.com", verified: true, rating: 5, comment: "บรรยากาศดีมากครับ เหมาะมาติวหนังสือ" },
    { id: "2", email: "engineer_std@kkumail.com", verified: true, rating: 4, comment: "กาแฟอร่อย แต่แอร์หนาวไปนิดนึง" },
    { id: "3", email: "guest_user@gmail.com", verified: false, rating: 3, comment: "ร้านดี แต่คนเยอะมากช่วงสอบ" },
];

const ShopDetailPage: React.FC = () => {
    const { id } = useParams();
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    
    // เช็คสถานะ Login จาก LocalStorage
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const authStatus = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(authStatus);
    }, []);

    const filteredReviews = verifiedOnly
        ? reviewsData.filter((r) => r.verified)
        : reviewsData;

    const commonProps: ShopDetailProps = {
        shop: shopInfo,
        reviews: filteredReviews,
        verifiedOnly,
        setVerifiedOnly,
        isLoggedIn
    };

    return (
        <div className="bg-light min-vh-100">
            <div className="d-lg-none">
                <ShopDetailMobileView {...commonProps} />
            </div>
            <div className="d-none d-lg-block">
                <ShopDetailDesktopView {...commonProps} />
            </div>
        </div>
    );
};

export default ShopDetailPage;