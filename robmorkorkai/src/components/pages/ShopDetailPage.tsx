import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useShopReviews } from "../../hooks/useShopReviews";
import { AlertUtils } from "../../utils/alertUtils";
import api from "../../services/api";
import type { Shop } from "../../types/shop";

import { ShopHero } from "../shop/ShopHero";
import { ReviewModal } from "../shop/ReviewModal";
import { ScrollToTopButton } from "../common/ScrollToTopButton";
import { ShopAboutSection } from "../shop/ShopAboutSection";
import { ShopLocationSection } from "../shop/ShopLocationSection";
import { ShopReviewsSection } from "../shop/ShopReviewsSection";
import "./css/ShopDetailPage.css";

/**
 * ShopDetailPage Component
 * Main page for displaying shop details, reviews, location, and contact information
 */
export const ShopDetailPage: React.FC = () => {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // State management
    const [shop, setShop] = useState<Shop | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [isFavoritesLoading, setIsFavoritesLoading] = useState(false);

    // Get review data from custom hook
    const {
        reviews, totalCount, verifiedOnly, setVerifiedOnly,
        hasMore, handleShowMore, isSubmitting, submitReview
    } = useShopReviews(id);

    // Fetch shop data on mount or when id changes
    useEffect(() => {
        const fetchShopData = async () => {
            if (!id) return;
            setIsLoading(true);
            setError(null);
            try {
                const response = await api.get(`/api/shops/${id}`);
                setShop(response.data);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };
        fetchShopData();
        window.scrollTo(0, 0);
    }, [id]);

    // Check if shop is in favorites
    useEffect(() => {
        if (!isLoggedIn || !id) {
            setIsFavorited(false);
            return;
        }
        const checkFavoriteStatus = async () => {
            try {
                setIsFavoritesLoading(true);
                const response = await api.get("/api/user/favorites");
                const favoriteShops = response.data;
                const isFav = favoriteShops.some((fav: any) => fav.id === id);
                setIsFavorited(isFav);
            } catch (error) {
                console.error("Error checking favorite status:", error);
                setIsFavorited(false);
            } finally {
                setIsFavoritesLoading(false);
            }
        };
        checkFavoriteStatus();
    }, [isLoggedIn, id]);

    // Toggle favorite shop status
    const handleToggleFavorite = async () => {
        if (!isLoggedIn) {
            AlertUtils.error("กรุณาเข้าสู่ระบบเพื่อบันทึกร้านโปรด");
            navigate("/login");
            return;
        }
        if (!id) return;

        try {
            setIsFavoritesLoading(true);
            if (isFavorited) {
                await api.delete(`/api/user/favorites/${id}`);
                setIsFavorited(false);
                AlertUtils.success("ลบออกจากร้านโปรดเรียบร้อยแล้ว");
            } else {
                await api.post(`/api/user/favorites/${id}`);
                setIsFavorited(true);
                AlertUtils.success("เพิ่มเข้าร้านโปรดเรียบร้อยแล้ว");
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
            AlertUtils.error("เกิดข้อผิดพลาดในการบันทึกร้านโปรด");
        } finally {
            setIsFavoritesLoading(false);
        }
    };

    // Open review modal with authentication check
    const handleOpenReviewModal = () => {
        if (!isLoggedIn) {
            AlertUtils.error("กรุณาเข้าสู่ระบบเพื่อเขียนรีวิว");
            navigate("/login");
            return;
        }
        setIsReviewModalOpen(true);
    };

    // Open Google Maps for shop location
    const handleOpenGoogleMaps = () => {
        if (shop?.latitude && shop?.longitude) {
            const mapUrl = `https://google.com/maps?q=${shop.latitude},${shop.longitude}`;
            window.open(mapUrl, "_blank");
        } else {
            alert("ขออภัย ยังไม่มีข้อมูลพิกัดสำหรับร้านนี้ครับ");
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: '#1a1412' }}>
                <Loader2 size={48} className="mb-3 animate-spin" style={{ color: '#e8b94a' }} />
                <h5 className="fw-bold" style={{ color: '#f5ebe4' }}>กำลังโหลดข้อมูลร้าน...</h5>
            </div>
        );
    }

    // Error state
    if (error || !shop) {
        return (
            <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: '#1a1412' }}>
                <div className="text-center p-5 rounded-4 shadow-sm" style={{ backgroundColor: '#231c18', border: '1px solid #3d302a', maxWidth: '400px' }}>
                    <div className="rounded-circle d-inline-flex p-3 mb-4" style={{ backgroundColor: 'rgba(167, 59, 36, 0.1)', color: '#A73B24' }}>
                        <AlertCircle size={40} />
                    </div>
                    <h4 className="fw-bold mb-2" style={{ color: '#f5ebe4' }}>เกิดข้อผิดพลาด</h4>
                    <p className="mb-4" style={{ color: '#9a8a7e' }}>{error || "ไม่พบร้านค้านี้ในระบบ"}</p>
                    <button onClick={() => navigate("/")} className="btn rounded-pill px-4 fw-bold hover-scale" style={{ backgroundColor: '#A73B24', color: '#fff5f0' }}>กลับหน้าแรก</button>
                </div>
            </div>
        );
    }

    // Calculate average rating and rating distribution
    const averageRating = Number(shop.ratingAvg ?? 0).toFixed(1);
    const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
        const count = reviews.filter((r) => r.rating === star).length;
        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
        return { star, count, percentage };
    });

    return (
        <div className="min-vh-100" style={{ backgroundColor: '#1a1412', fontFamily: 'Inter, sans-serif', paddingBottom: '70px', overflowX: 'hidden' }}>

            <ShopHero shop={shop} averageRating={averageRating} reviewsCount={totalCount} isLoggedIn={isLoggedIn} user={user} isFavorited={isFavorited} onToggleFavorite={handleToggleFavorite} />

            <main className="animate-fade-up">
                <ShopAboutSection shop={shop} />
                
                <ShopLocationSection 
                    shop={shop}
                    averageRating={averageRating}
                    reviewsCount={totalCount}
                    isLoggedIn={isLoggedIn}
                    isFavorited={isFavorited}
                    onToggleFavorite={handleToggleFavorite}
                    onOpenReviewModal={handleOpenReviewModal}
                    onOpenGoogleMaps={handleOpenGoogleMaps}
                />
                
                <ShopReviewsSection 
                    reviews={reviews}
                    totalCount={totalCount}
                    averageRating={averageRating}
                    verifiedOnly={verifiedOnly}
                    onSetVerifiedOnly={setVerifiedOnly}
                    ratingDistribution={ratingDistribution}
                />
            </main>

            <ReviewModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                onSubmit={async (rating, comment) => {
                    try {
                        const result = await submitReview(rating, comment);
                        setShop((prev) => {
                            if (!prev) return prev;
                            return { ...prev, ratingAvg: result.shopSummary.newRatingAvg, reviewCount: result.shopSummary.totalReviews };
                        });
                        setIsReviewModalOpen(false);
                        AlertUtils.success("ส่งรีวิวสำเร็จ");
                    } catch (err) {
                        AlertUtils.error("ส่งรีวิวไม่สำเร็จ", err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
                    }
                }}
                shopName={shop.name}
                shopImage={shop.coverImage || shop.image}
                isSubmitting={isSubmitting}
            />

            <ScrollToTopButton />
        </div>
    );
};

export default ShopDetailPage;