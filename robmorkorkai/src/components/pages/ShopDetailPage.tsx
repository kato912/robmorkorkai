import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react"; // เพิ่มไอคอน Loading/Error
import { useAuth } from "../../context/AuthContext";
import { useShopReviews } from "../../hooks/useShopReviews"; // Hook รีวิวเดิมของคุณ
import { AlertUtils } from "../../utils/alertUtils";
import type { Shop } from "../../types/shop";

// Components
import { ShopHero } from "../shop/ShopHero";
import { ShopGallery } from "../shop/ShopGallery";
import { ShopSidebar } from "../shop/ShopSidebar";
import { ShopReviewSection } from "../shop/ShopReviewSection";
import { ReviewModal } from "../shop/ReviewModal";

// --- Mock Data รีวิว (ใช้เป็นค่าเริ่มต้นระหว่างรอ Backend รีวิวสมบูรณ์) ---
const initialReviews = [
    { id: 1, userId: "u1", email: "student64@kkumail.com", userName: "กมลชนก", rating: 5, comment: "บรรยากาศดีมากค่ะ", verified: true, date: "2 วันที่แล้ว", helpful: 12 },
    { id: 2, userId: "u2", email: "engineer_boy@kkumail.com", userName: "ธนพล", rating: 4, comment: "กาแฟอร่อย", verified: true, date: "1 สัปดาห์ที่แล้ว", helpful: 8 }
];

export const ShopDetailPage: React.FC = () => {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // รับ id จาก URL

    // --- State สำหรับ API ---
    const [shop, setShop] = useState<Shop | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // --- State สำหรับ UI ---
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    // Hook รีวิวเดิม (ในอนาคตคุณอาจต้องปรับ Hook นี้ให้ fetch จาก API ด้วย)
    const { reviews, totalCount, verifiedOnly, setVerifiedOnly, hasMore, handleShowMore, addReview } = useShopReviews(initialReviews);

    // ยิง API ไปหา Backend (Port 3000)xf
    useEffect(() => {
        const fetchShopData = async () => {
            if (!id) return;

            setIsLoading(true);
            setError(null);

            try {
                // ยิงไปที่ Backend
                const response = await fetch(`http://localhost:3000/api/shops/${id}`);

                if (!response.ok) {
                    throw new Error("ไม่พบข้อมูลร้านค้า หรือเกิดข้อผิดพลาด");
                }

                const data = await response.json();

                console.log("🔥 ข้อมูลร้านนี้จาก Backend:", data);

                setShop(data); // เก็บข้อมูลร้านลง State

            } catch (err: any) {
                console.error("Fetch Error:", err);
                setError(err.message || "Something went wrong");
            } finally {
                setIsLoading(false); // ปิดสถานะโหลด
            }
        };

        fetchShopData();
        window.scrollTo(0, 0);
    }, [id]);

    // ส่วนแสดงผล Loading / Error
    if (isLoading) {
        return (
            <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-white">
                <Loader2 size={48} className="text-dark mb-3 animate-spin" /> {/* animate-spin ต้องมี css หรือใช้ style */}
                <h5 className="fw-bold text-dark">กำลังโหลดข้อมูลร้าน...</h5>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .animate-spin { animation: spin 1s linear infinite; }`}</style>
            </div>
        );
    }

    if (error || !shop) {
        return (
            <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
                <div className="text-center p-5 bg-white rounded-4 shadow-sm border" style={{ maxWidth: '400px' }}>
                    <div className="bg-danger bg-opacity-10 text-danger rounded-circle d-inline-flex p-3 mb-4"><AlertCircle size={40} /></div>
                    <h4 className="fw-bold text-dark mb-2">เกิดข้อผิดพลาด</h4>
                    <p className="text-muted mb-4">{error || "ไม่พบร้านค้านี้ในระบบ"}</p>
                    <button onClick={() => navigate("/")} className="btn btn-dark rounded-pill px-4">กลับหน้าแรก</button>
                </div>
            </div>
        );
    }
    const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80";

    
    // จัดการรูปภาพ (Fallback: ถ้า Backend ไม่มี array รูปภาพ ให้ใช้รูปหลักซ้ำๆ)
    const displayImages = shop.images && shop.images.length > 0
        ? shop.images
        : [shop.image || DEFAULT_IMAGE, shop.image || DEFAULT_IMAGE, shop.image || DEFAULT_IMAGE, shop.image || DEFAULT_IMAGE];

    // คำนวณ Rating (ใช้ข้อมูลจริงจาก DB ถ้ามี)
    const averageRating = Number(shop.ratingAvg ?? 0).toFixed(1);

    // กรองรีวิว (ใช้ Logic เดิม)
    const filteredReviews = verifiedOnly ? reviews.filter((r) => r.verified) : reviews;

    // กราฟดาว (คำนวณจากรีวิวที่มี)
    const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
        const count = reviews.filter((r) => r.rating === star).length;
        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
        return { star, count, percentage };
    });

    const handleOpenReviewModal = () => {
        if (!isLoggedIn) { AlertUtils.error("กรุณาเข้าสู่ระบบเพื่อเขียนรีวิว"); navigate("/login"); return; }
        setIsReviewModalOpen(true);
    };

    return (
        <div className="min-vh-100 bg-white" style={{ fontFamily: 'Inter, sans-serif', paddingBottom: '70px', overflowX: 'hidden' }}>

            {/* CSS เฉพาะหน้า */}
            <style>{`
                .hero-gradient { background: linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.2) 100%); }
                .hero-badge { background: rgba(255,255,255,0.1); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 6px 16px; font-size: 0.8rem; }
                .hero-badge-green { background: #059669; color: white; padding: 6px 16px; font-size: 0.8rem; border: 1px solid #059669; }
                .hide-scroll::-webkit-scrollbar { display: none; }
                .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
                .gallery-thumb { transition: all 0.3s ease; }
                .gallery-thumb:hover { opacity: 1 !important; transform: scale(1.02); }
                .nav-link-hover { transition: all 0.2s; }
                .nav-link-hover:hover { background-color: rgba(255, 255, 255, 0.1); opacity: 1 !important; }
            `}</style>

            {/* --- Components ที่แยกไว้ --- */}
            <ShopHero
                shop={shop} displayImages={displayImages} activeImageIndex={activeImageIndex} setActiveImageIndex={setActiveImageIndex}
                averageRating={averageRating} reviewsCount={totalCount} isLoggedIn={isLoggedIn} user={user}
                isFavorited={isFavorited} setIsFavorited={setIsFavorited}
            />

            <ShopGallery
                displayImages={displayImages} activeImageIndex={activeImageIndex} setActiveImageIndex={setActiveImageIndex}
                isGalleryOpen={isGalleryOpen} setIsGalleryOpen={setIsGalleryOpen}
            />

            <main className="container py-4 py-lg-5" style={{ maxWidth: '1100px' }}>
                <div className="row g-5">
                    <div className="col-12 col-lg-8">

                        {/* Section: About & Amenities (Static ไว้ก่อน หรือดึงจาก DB ได้ถ้ามี field) */}
                        <section className="py-1 border-bottom border-light-subtle">
                            <h6 className="text-muted fw-bold text-uppercase tracking-wider mb-4" style={{ fontSize: '0.85rem', letterSpacing: '2px' }}>เกี่ยวกับร้าน</h6>
                            <p className="text-dark lh-lg m-0" style={{ fontSize: '1rem' }}>
                                {shop.description || "ร้านนี้ยังไม่มีคำอธิบายเพิ่มเติม"}
                            </p>
                        </section>

                        <ShopReviewSection
                            reviews={filteredReviews} averageRating={averageRating} reviewsCount={totalCount} ratingDistribution={ratingDistribution}
                            verifiedOnly={verifiedOnly} setVerifiedOnly={setVerifiedOnly} hasMore={hasMore} handleShowMore={handleShowMore}
                            isLoggedIn={isLoggedIn} onOpenReviewModal={handleOpenReviewModal}
                        />
                    </div>

                    <ShopSidebar
                        shop={shop} averageRating={averageRating} reviewsCount={totalCount} isLoggedIn={isLoggedIn}
                        isFavorited={isFavorited} setIsFavorited={setIsFavorited} onOpenReviewModal={handleOpenReviewModal}
                    />
                </div>
            </main>

            <ReviewModal
                isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)}
                onSubmit={(r, c) => { addReview({ id: Date.now(), rating: r, comment: c, verified: user?.isVerifiedStudent, date: "เมื่อสักครู่" }); setIsReviewModalOpen(false); }}
                shopName={shop.name} shopImage={shop.image}
            />
        </div>
    );
};

export default ShopDetailPage;