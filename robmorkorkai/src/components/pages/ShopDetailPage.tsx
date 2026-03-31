import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// เพิ่ม Loader2 เข้าไปรวมกับไอคอนอื่นๆ
import { MapPin, Clock, Star, MessageSquare, Heart, Share2, ArrowUpRight, Store, Quote, Loader2, BadgeCheck, AlertCircle } from "lucide-react";import { useAuth } from "../../context/AuthContext";
import { useShopReviews } from "../../hooks/useShopReviews";
import { AlertUtils } from "../../utils/alertUtils";
import api from "../../services/api";
import type { Shop } from "../../types/shop";


import { ShopHero } from "../shop/ShopHero";
import { ShopSidebar } from "../shop/ShopSidebar";
import { ReviewModal } from "../shop/ReviewModal";
import { ScrollToTopButton } from "../common/ScrollToTopButton";

// Component สำหรับแสดงรูปโปรไฟล์
const ReviewerAvatar: React.FC<{ userImage?: string; userName?: string }> = ({ userImage, userName }) => {
    const [imageLoaded, setImageLoaded] = useState(true);
    
    const initial = userName ? userName.charAt(0).toUpperCase() : 'U';
    
    return (
        <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0" style={{ width: '45px', height: '45px', overflow: 'hidden', backgroundColor: '#2d2320', color: '#e8b94a', border: '1px solid #3d302a', fontSize: '1.1rem' }}>
            {userImage && userImage.trim() && imageLoaded ? (
                <img 
                    src={userImage} 
                    alt={userName} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    onError={() => setImageLoaded(false)}
                />
            ) : (
                <span>{initial}</span>
            )}
        </div>
    );
};

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
        reviews, totalCount, verifiedOnly, setVerifiedOnly,
        hasMore, handleShowMore, isSubmitting, submitReview
    } = useShopReviews(id);

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

    useEffect(() => {
        if (!isLoggedIn || !id) { setIsFavorited(false); return; }
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

    const handleToggleFavorite = async () => {
        if (!isLoggedIn) {
            AlertUtils.error("กรุณาเข้าสู่ระบบเพื่อบันทึกร้านโปรด");
            navigate("/login"); return;
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
                .animate-fade-up { animation: fadeUp 0.6s ease-out forwards; }
                .hero-gradient { background: linear-gradient(to top, #1a1412 0%, rgba(26, 20, 18, 0.6) 50%, rgba(26, 20, 18, 0.2) 100%); } 
                .hero-badge { background: rgba(35, 28, 24, 0.6); backdrop-filter: blur(8px); border: 1px solid rgba(201, 148, 58, 0.3); color: #e8b94a; padding: 6px 16px; font-size: 0.8rem; } 
                .hero-badge-green { background: rgba(16, 185, 129, 0.15); color: #34d399; padding: 6px 16px; font-size: 0.8rem; border: 1px solid rgba(16, 185, 129, 0.3); } 
                .hover-scale { transition: transform 0.2s; } .hover-scale:hover { transform: scale(1.05); }
            `}</style>

            {/* ฮีโร่ (Full Width อยู่แล้ว) */}
            <ShopHero shop={shop} averageRating={averageRating} reviewsCount={totalCount} isLoggedIn={isLoggedIn} user={user} isFavorited={isFavorited} onToggleFavorite={handleToggleFavorite} />

            <main className="animate-fade-up">

                {/* 📌 SECTION: เกี่ยวกับร้านค้า (ดีไซน์เข้าชุดกับฝั่งแผนที่) */}
<section className="w-100 py-5" style={{ backgroundColor: '#1a1412' }}>
    {/* ใช้ container-fluid px-4 px-xl-5 เพื่อให้ขอบซ้าย-ขวา ตรงกับแผนที่ด้านล่างเป๊ะๆ */}
    <div className="container-fluid px-4 px-xl-5">
        <div className="row">
            <div className="col-12">
                
                {/* 1. หัวข้อ: ก๊อปปี้สไตล์มาจากคำว่า "พิกัดร้าน" เลยครับ จะได้เป็นธีมเดียวกัน */}
                <h6 className="fw-bold text-uppercase tracking-wider mb-4" style={{ fontSize: '1rem', letterSpacing: '2px', color: '#c9943a' }}>
                    เกี่ยวกับร้านค้า
                </h6>
                
                {/* 2. กล่องเนื้อหา: ใช้สี #231c18 และขอบมน rounded-4 แบบเดียวกับกล่องด้านล่าง */}
                <div className="card rounded-4 p-4 p-lg-5 shadow-sm border-0" style={{ backgroundColor: '#231c18' }}>
                    <div className="d-flex gap-4 align-items-start">
                        {/* ใส่ไอคอน Quote สีทองจางๆ ไว้ซ้ายมือ ให้กล่องดูไม่โล่งจนเกินไป */}
                        <Quote size={40} className="flex-shrink-0" style={{ color: 'rgba(201, 148, 58, 0.3)' }} />
                        
                        {/* เนื้อหาร้าน */}
                        <p className="lh-lg mb-0" style={{ color: '#d7cec7', fontSize: '1.05rem', whiteSpace: 'pre-line' }}>
                            {shop.description || "ยังไม่มีข้อมูลรายละเอียดของร้านค้านี้"}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>

                {/* 📌 SECTION 2: พิกัด และ ข้อมูลติดต่อ (ดึง Sidebar มาเรียงแบบ Grid พื้นหลังเข้มขึ้น) */}
                <section className="w-100 py-5" style={{ backgroundColor: '#231c18', borderTop: '1px solid #3d302a', borderBottom: '1px solid #3d302a' }}>
<div className="container" style={{ maxWidth: '1140px' }}>                        
    <div className="row justify-content-between align-items-start" style={{ rowGap: '3rem' }}>
                            {/* ฝั่งซ้าย: แผนที่ (โชว์ทั้งมือถือและคอม) */}
                            <div className="col-12 col-lg-5 pe-lg-4">
                                <h6 className="fw-bold text-uppercase tracking-wider mb-4" style={{ fontSize: '1rem', letterSpacing: '2px', color: '#c9943a' }}>พิกัดร้าน (Zone {shop.zone})</h6>
                                <div className="card rounded-4 overflow-hidden shadow-sm border-0 bg-transparent">
                                    {shop.latitude && shop.longitude ? (
                                        <iframe title="Shop Location Full" width="100%" height="280" style={{ border: 0, filter: 'contrast(1.2) opacity(0.8)', borderRadius: '16px' }} loading="lazy" allowFullScreen src={`https://google.com/maps?q=${shop.latitude},${shop.longitude}&hl=th&z=15&output=embed`}></iframe>
                                    ) : (
                                        <div className="d-flex flex-column align-items-center justify-content-center rounded-4" style={{ height: '280px', backgroundColor: '#2d2320', color: '#8a7b72' }}>
                                            <MapPin size={32} className="opacity-50 mb-2" style={{ color: '#c9943a' }} />
                                            <span className="small fw-medium">ไม่มีข้อมูลพิกัด</span>
                                        </div>
                                    )}
                                    <div className="mt-3">
                                        <button onClick={handleOpenGoogleMaps} className="btn w-100 rounded-pill py-3 d-flex justify-content-center align-items-center gap-2 hover-scale border-0 fw-bold shadow-sm" style={{ backgroundColor: '#A73B24', color: '#fff5f0' }}>
                                            <MapPin size={18} /> เปิดนำทางบน Google Maps <ArrowUpRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* ฝั่งขวา: ข้อมูลร้านจาก Sidebar เดิม */}
                            <div className="col-12 col-lg-5 pe-lg-4">
                                <ShopSidebar shop={shop} averageRating={averageRating} reviewsCount={totalCount} isLoggedIn={isLoggedIn} isFavorited={isFavorited} onToggleFavorite={handleToggleFavorite} onOpenReviewModal={handleOpenReviewModal} />
                            </div>

                        </div>
                    </div>
                </section>

                {/* 📌 SECTION 3: รีวิว (กลับมาสีหลัก) */}
                {/* 📌 SECTION 3: รีวิวจากลูกค้า */}
                <section className="w-100 py-5" style={{ backgroundColor: '#1a1412', borderTop: '1px solid #3d302a' }}>
<div className="container" style={{ maxWidth: '1140px' }}>
                        {/* 1. หัวข้อ (ดีไซน์เดียวกับ พิกัดร้าน) */}
                        <div className="d-flex justify-content-between align-items-center gap-2 gap-md-3 mb-5">
                            <div className="d-flex align-items-center gap-2">
                                <MessageSquare size={20} style={{ color: '#c9943a', flexShrink: 0 }} />
                                <h6 className="fw-bold text-uppercase tracking-wider m-0" style={{ fontSize: '1rem', letterSpacing: '2px', color: '#c9943a' }}>
                                    รีวิวจากลูกค้า ({totalCount || 0})
                                </h6>
                            </div>
                            {/* Verified KKU Filter */}
                            <div 
                                className="d-flex align-items-center gap-2 px-2 py-2 px-md-4 py-md-3 rounded-3 shadow-sm"
                                onClick={() => setVerifiedOnly(!verifiedOnly)}
                                style={{ 
                                    backgroundColor: verifiedOnly ? 'rgba(201, 148, 58, 0.1)' : '#231c18', 
                                    border: verifiedOnly ? '2px solid #c9943a' : '1px solid #3d302a',
                                    cursor: 'pointer', 
                                    transition: 'all 0.3s ease',
                                    flexShrink: 0
                                }}
                            >
                                <BadgeCheck size={16} className="d-md-none" style={{ color: '#e8b94a', flexShrink: 0 }} />
                                <BadgeCheck size={20} className="d-none d-md-block" style={{ color: '#e8b94a', flexShrink: 0 }} />
                                <div>
                                    <p className="fw-semibold m-0" style={{ color: '#f5ebe4', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)' }}>Verified KKU</p>
                                    <small className="d-none d-md-block" style={{ color: '#9a8a7e', fontSize: '0.75rem' }}>นักศึกษา มข.</small>
                                </div>
                                <div className="form-check form-switch ms-1 ms-md-3 mb-0">
                                    <input 
                                        className="form-check-input cursor-pointer" 
                                        type="checkbox" 
                                        checked={verifiedOnly} 
                                        onChange={(e) => setVerifiedOnly(e.target.checked)}
                                        style={{ width: '40px', height: '20px' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. กล่องสรุปคะแนน (มีแถบ Progress Bar) */}
                        <div className="card rounded-4 p-4 p-lg-5 mb-5 border-0 shadow-sm" style={{ backgroundColor: '#231c18' }}>
                            <div className="row align-items-center">
                                
                                {/* ฝั่งซ้าย: คะแนนเฉลี่ยตัวใหญ่ */}
                                <div className="col-12 col-md-4 text-center mb-4 mb-md-0 position-relative">
                                    <h2 className="display-3 fw-bold mb-0" style={{ color: '#f5ebe4' }}>{averageRating || "0.0"}</h2>
                                    <div className="d-flex justify-content-center gap-1 my-2">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <Star key={star} size={22} style={{ color: star <= Number(averageRating) ? '#e8b94a' : '#3d302a', fill: star <= Number(averageRating) ? '#e8b94a' : 'none' }} />
                                        ))}
                                    </div>
                                    <p className="m-0" style={{ color: '#9a8a7e', fontSize: '0.95rem' }}>จากทั้งหมด {totalCount || 0} รีวิว</p>
                                    
                                    {/* เส้นคั่นแนวตั้ง (แสดงเฉพาะจอใหญ่) */}
                                    <div className="d-none d-md-block position-absolute end-0 top-50 translate-middle-y" style={{ width: '1px', height: '70%', backgroundColor: '#3d302a' }}></div>
                                </div>

                                {/* ฝั่งขวา: แถบดาว 5-4-3-2-1 */}
                                <div className="col-12 col-md-8 ps-md-5">
                                    {ratingDistribution.map((item) => {
                                        return (
                                            <div key={item.star} className="d-flex align-items-center mb-2 gap-3">
                                                <span className="fw-bold text-end" style={{ color: '#d7cec7', width: '15px' }}>{item.star}</span>
                                                <Star size={16} style={{ color: '#e8b94a', fill: '#e8b94a' }} />
                                                <div className="progress flex-grow-1" style={{ height: '8px', backgroundColor: '#3d302a', borderRadius: '10px' }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: `${item.percentage}%`, backgroundColor: '#e8b94a', borderRadius: '10px' }} aria-valuenow={item.percentage} aria-valuemin={0} aria-valuemax={100}></div>
                                                </div>
                                                <span className="small fw-medium text-end" style={{ width: '30px', color: '#9a8a7e' }}>{item.count}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* 3. รายการคอมเมนต์รีวิว */}
                        <div className="d-flex flex-column gap-3">
                            {reviews && reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <div key={index} className="card rounded-4 p-4 border-0 shadow-sm" style={{ backgroundColor: '#231c18' }}>
                                        <div className="d-flex align-items-start gap-3">
                                            
                                            {/* รูปโปรไฟล์ */}
                                            <ReviewerAvatar userImage={review.userImage} userName={review.userName} />
                                            
                                            {/* ข้อมูลรีวิว */}
                                            <div className="flex-grow-1">
                                                <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center mb-2 gap-1">
                                                    <p className="fw-bold m-0" style={{ color: '#f5ebe4', fontSize: '1.05rem' }}>{review.userName || "ผู้ใช้งาน"}</p>
                                                    <span style={{ color: '#9a8a7e', fontSize: '0.85rem' }}>{review.date || "เพิ่งรีวิว"}</span>
                                                </div>
                                                
                                                <div className="d-flex gap-1 mb-2">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <Star key={star} size={14} style={{ color: star <= review.rating ? '#e8b94a' : '#3d302a', fill: star <= review.rating ? '#e8b94a' : 'none' }} />
                                                    ))}
                                                </div>
                                                
                                                <p className="mb-0" style={{ color: '#d7cec7', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                                    {review.comment}
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-5 rounded-4 border-0" style={{ backgroundColor: '#231c18' }}>
                                    <MessageSquare size={48} className="mb-3 opacity-50 mx-auto" style={{ color: '#c9943a' }} />
                                    <h6 className="fw-bold mb-2" style={{ color: '#f5ebe4' }}>ยังไม่มีรีวิวสำหรับร้านนี้</h6>
                                    <p style={{ color: '#9a8a7e', fontSize: '0.95rem' }}>มาเป็นคนแรกที่แบ่งปันประสบการณ์ของคุณกันเถอะ!</p>
                                </div>
                            )}
                        </div>

                    </div>
                </section>

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