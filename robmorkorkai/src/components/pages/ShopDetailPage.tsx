import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, AlertCircle, MapPin, ArrowUpRight } from "lucide-react"; // 👈 เพิ่ม ArrowUpRight
import { useAuth } from "../../context/AuthContext";
import { useShopReviews } from "../../hooks/useShopReviews";
import { AlertUtils } from "../../utils/alertUtils";
import api from "../../services/api";
import type { Shop } from "../../types/shop";

import { ShopHero } from "../shop/ShopHero";
import { ShopSidebar } from "../shop/ShopSidebar";
import { ShopReviewSection } from "../shop/ShopReviewSection";
import { ReviewModal } from "../shop/ReviewModal";
import { ScrollToTopButton } from "../common/ScrollToTopButton";

export const ShopDetailPage: React.FC = () => {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); 

    const [shop, setShop] = useState<Shop | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [isFavoritesLoading, setIsFavoritesLoading] = useState(false);

    const {
        reviews,
        totalCount,
        verifiedOnly,
        setVerifiedOnly,
        hasMore,
        handleShowMore,
        isSubmitting,
        submitReview
    } = useShopReviews(id);

    // ดึงข้อมูลร้านจาก API
    useEffect(() => {
        const fetchShopData = async () => {
            if (!id) return;
            setIsLoading(true); setError(null);
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

    // ตรวจสอบว่าร้านนี้เป็น favorite ของ user หรือไม่
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

    // จัดการการเพิ่ม/ลบ favorite
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
                // ลบออกจาก favorites
                await api.delete(`/api/user/favorites/${id}`);
                setIsFavorited(false);
                AlertUtils.success("ลบออกจากร้านโปรดเรียบร้อยแล้ว");
            } else {
                // เพิ่มเข้า favorites
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

    const handleOpenReviewModal = () => {
        if (!isLoggedIn) { AlertUtils.error("กรุณาเข้าสู่ระบบเพื่อเขียนรีวิว"); navigate("/login"); return; }
        setIsReviewModalOpen(true);
    };

    const handleOpenGoogleMaps = () => {
        if (shop?.latitude && shop?.longitude) {
            const mapUrl = `https://google.com/maps?q=${shop.latitude},${shop.longitude}`;
            window.open(mapUrl, "_blank");
        } else {
            alert("ขออภัย ยังไม่มีข้อมูลพิกัดสำหรับร้านนี้ครับ");
        }
    };

    if (isLoading) return <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: '#1a1412' }}><Loader2 size={48} className="mb-3 animate-spin" style={{ color: '#e8b94a' }} /><h5 className="fw-bold" style={{ color: '#f5ebe4' }}>กำลังโหลดข้อมูลร้าน...</h5><style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .animate-spin { animation: spin 1s linear infinite; }`}</style></div>;
    if (error || !shop) return <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: '#1a1412' }}><div className="text-center p-5 rounded-4 shadow-sm" style={{ backgroundColor: '#231c18', border: '1px solid #3d302a', maxWidth: '400px' }}><div className="rounded-circle d-inline-flex p-3 mb-4" style={{ backgroundColor: 'rgba(167, 59, 36, 0.1)', color: '#A73B24' }}><AlertCircle size={40} /></div><h4 className="fw-bold mb-2" style={{ color: '#f5ebe4' }}>เกิดข้อผิดพลาด</h4><p className="mb-4" style={{ color: '#9a8a7e' }}>{error || "ไม่พบร้านค้านี้ในระบบ"}</p><button onClick={() => navigate("/")} className="btn rounded-pill px-4 fw-bold hover-scale" style={{ backgroundColor: '#A73B24', color: '#fff5f0' }}>กลับหน้าแรก</button></div></div>;

    const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80";
    const averageRating = Number(shop.ratingAvg ?? 0).toFixed(1);
    const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
        const count = reviews.filter((r) => r.rating === star).length;
        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
        return { star, count, percentage };
    });

    return (
        
        <div className="min-vh-100" style={{ backgroundColor: '#1a1412', fontFamily: 'Inter, sans-serif', paddingBottom: '70px', overflowX: 'hidden' }}>
            <style>{`
            @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-up {
                    animation: fadeUp 0.6s ease-out forwards;
                }
            .hero-gradient { background: linear-gradient(to top, #1a1412 0%, rgba(26, 20, 18, 0.6) 50%, rgba(26, 20, 18, 0.2) 100%); } .hero-badge { background: rgba(35, 28, 24, 0.6); backdrop-filter: blur(8px); border: 1px solid rgba(201, 148, 58, 0.3); color: #e8b94a; padding: 6px 16px; font-size: 0.8rem; } .hero-badge-green { background: rgba(16, 185, 129, 0.15); color: #34d399; padding: 6px 16px; font-size: 0.8rem; border: 1px solid rgba(16, 185, 129, 0.3); } .gallery-thumb { transition: all 0.3s ease; border: 2px solid transparent; } .gallery-thumb:hover { opacity: 1 !important; transform: scale(1.05); border-color: #A73B24; } .hover-scale { transition: transform 0.2s; } .hover-scale:hover { transform: scale(1.05); }`}</style>

            <ShopHero shop={shop} averageRating={averageRating} reviewsCount={totalCount} isLoggedIn={isLoggedIn} user={user} isFavorited={isFavorited} onToggleFavorite={handleToggleFavorite} />


<main className="container py-0 py-lg-5 animate-fade-up" style={{ maxWidth: '1100px' }}>                <div className="row g-5">
                    <div className="col-12 col-lg-8">

                        {/* เกี่ยวกับร้าน */}
                        <section className="py-2 mb-4" style={{ borderBottom: '1px solid rgba(201, 148, 58, 0.2)' }}>
                            <h6 className="fw-bold text-uppercase tracking-wider mb-4" style={{ fontSize: '0.85rem', letterSpacing: '2px', color: '#c9943a' }}>เกี่ยวกับร้าน</h6>
                            <p className="lh-lg mb-4" style={{ fontSize: '1rem', color: '#e8ebe4' }}>{shop.description || "ร้านนี้ยังไม่มีคำอธิบายเพิ่มเติม"}</p>
                        </section>
        
                        <div className="card rounded-4 overflow-hidden shadow-sm mb-5 d-lg-none" style={{ backgroundColor: '#231c18', border: '1px solid #3d302a' }}>
                            {shop.latitude && shop.longitude ? (
                                <iframe title="Shop Location Mobile" width="100%" height="160" style={{ border: 0, filter: 'contrast(1.2) opacity(0.8)' }} loading="lazy" allowFullScreen src={`https://google.com/maps?q=${shop.latitude},${shop.longitude}&hl=th&z=15&output=embed`}></iframe>
                            ) : (
                                <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '160px', backgroundColor: '#2d2320', color: '#8a7b72' }}>
                                    <MapPin size={32} className="opacity-50 mb-2" style={{ color: '#c9943a' }} />
                                    <span className="small fw-medium">ไม่มีข้อมูลพิกัด</span>
                                </div>
                            )}
                            <div className="p-3">
                                <p className="fw-bold m-0 small" style={{ color: '#f5ebe4' }}>Zone {shop.zone}</p>
                                <button onClick={handleOpenGoogleMaps} className="btn btn-sm w-100 rounded-pill mt-3 d-flex justify-content-center align-items-center gap-1 hover-scale border-0" style={{ backgroundColor: '#A73B24', color: '#fff5f0' }}>
                                    <MapPin size={12} /> เปิดแผนที่ <ArrowUpRight size={12} />
                                </button>
                            </div>
                        </div>

                        {/* รีวิว */}
                        <ShopReviewSection reviews={reviews} averageRating={averageRating} reviewsCount={totalCount} ratingDistribution={ratingDistribution} verifiedOnly={verifiedOnly} setVerifiedOnly={setVerifiedOnly} hasMore={hasMore} handleShowMore={handleShowMore} isLoggedIn={isLoggedIn} onOpenReviewModal={handleOpenReviewModal} />
                    </div>

                    {/* Sidebar (โชว์เฉพาะจอคอม) */}
                    <ShopSidebar shop={shop} averageRating={averageRating} reviewsCount={totalCount} isLoggedIn={isLoggedIn} isFavorited={isFavorited} setIsFavorited={setIsFavorited} onOpenReviewModal={handleOpenReviewModal} />
                </div>
            </main>

            <ReviewModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                onSubmit={async (rating, comment) => {
                    try {
                        const result = await submitReview(rating, comment);
                        setShop((prev) => {
                            if (!prev) return prev;
                            return {
                                ...prev,
                                ratingAvg: result.shopSummary.newRatingAvg,
                                reviewCount: result.shopSummary.totalReviews
                            };
                        });
                        setIsReviewModalOpen(false);
                        AlertUtils.success("ส่งรีวิวสำเร็จ");
                    } catch (err) {
                        const message = err instanceof Error ? err.message : "ส่งรีวิวไม่สำเร็จ";
                        AlertUtils.error("ส่งรีวิวไม่สำเร็จ", message);
                    }
                }}
                shopName={shop.name}
                shopImage={shop.image}
                isSubmitting={isSubmitting}
            />

            <ScrollToTopButton />    
        </div>
    );
};

export default ShopDetailPage;