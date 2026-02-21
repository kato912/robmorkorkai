import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Home, Bot, User, LogIn, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useShopReviews } from "../../hooks/useShopReviews";
import { AlertUtils } from "../../utils/alertUtils";
import type { Shop } from "../../types/shop";

// Components
import { ShopHero } from "../shop/ShopHero";
import { ShopGallery } from "../shop/ShopGallery";
import { ShopSidebar } from "../shop/ShopSidebar";
import { ShopReviewSection } from "../shop/ShopReviewSection";
import { ReviewModal } from "../shop/ReviewModal";

// --- Mock Data ---
const initialReviews = [
    { id: 1, userId: "u1", email: "student64@kkumail.com", userName: "กมลชนก", rating: 5, comment: "บรรยากาศดีมากค่ะ เหมาะมาติวหนังสือ มีปลั๊กไฟทุกโต๊ะ WiFi แรง", verified: true, date: "2 วันที่แล้ว", helpful: 12 },
    { id: 2, userId: "u2", email: "engineer_boy@kkumail.com", userName: "ธนพล", rating: 4, comment: "กาแฟอร่อย แต่แอร์หนาวไปนิดนึง ควรเอาเสื้อกันหนาวไปด้วย", verified: true, date: "1 สัปดาห์ที่แล้ว", helpful: 8 }
];

type ShopDetailProps = { shops: Shop[]; };

export const ShopDetailPage: React.FC<ShopDetailProps> = ({ shops }) => {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { reviews, totalCount, verifiedOnly, setVerifiedOnly, hasMore, handleShowMore, addReview } = useShopReviews(initialReviews);
    
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const shop = shops.find((s) => s.id === id);
    if (!shop) return <div className="text-center mt-5 py-5 text-muted">ไม่พบข้อมูลร้านค้า</div>;

    const displayImages = [shop.image, shop.image, shop.image, shop.image];
    const filteredReviews = verifiedOnly ? reviews.filter((r) => r.verified) : reviews;
    const averageRating = shop.rating || (reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : "0.0");
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

            <ShopHero 
                shop={shop} 
                displayImages={displayImages} 
                activeImageIndex={activeImageIndex} 
                setActiveImageIndex={setActiveImageIndex}
                averageRating={averageRating} 
                reviewsCount={totalCount} isLoggedIn={isLoggedIn} user={user}
                isFavorited={isFavorited} setIsFavorited={setIsFavorited}
            />

            <ShopGallery 
                displayImages={displayImages} 
                activeImageIndex={activeImageIndex} setActiveImageIndex={setActiveImageIndex}
                isGalleryOpen={isGalleryOpen} setIsGalleryOpen={setIsGalleryOpen}
            />

            <main className="container py-4 py-lg-5" style={{ maxWidth: '1100px' }}>
                <div className="row g-5">
                    <div className="col-12 col-lg-8">

                        {/* คำอธิบายร้าน */}
                        <section className="py-5 border-bottom border-light-subtle">
                            <h6 className="text-muted fw-bold text-uppercase tracking-wider mb-4" style={{ fontSize: '0.75rem', letterSpacing: '2px' }}>เกี่ยวกับร้าน</h6>
                            <p className="text-dark lh-lg m-0" style={{ fontSize: '1rem' }}>
                                {shop.description || `${shop.name} เปิดให้บริการตั้งแต่ ${shop.openHours} เหมาะสำหรับการอ่านหนังสือและทำงาน มีปลั๊กไฟและ WiFi บริการ`}
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

            {/* Mobile Bottom Nav */}
            <nav className="d-lg-none position-fixed bottom-0 start-0 w-100 bg-white border-top py-2 px-3" style={{ zIndex: 1040, backdropFilter: 'blur(12px)', backgroundColor: 'rgba(255,255,255,0.95)' }}>
                <div className="d-flex justify-content-around align-items-center">
                    <Link to="/" className="btn btn-link text-decoration-none text-muted d-flex flex-column align-items-center gap-1 p-1"><Home size={20} /><span style={{ fontSize: '10px', fontWeight: 500 }}>Home</span></Link>
                    <Link to="/search" className="btn btn-link text-decoration-none text-muted d-flex flex-column align-items-center gap-1 p-1"><Search size={20} /><span style={{ fontSize: '10px', fontWeight: 500 }}>Search</span></Link>
                    <Link to="/ai" className="btn btn-link text-decoration-none text-muted d-flex flex-column align-items-center gap-1 p-1"><Bot size={20} /><span style={{ fontSize: '10px', fontWeight: 500 }}>AI</span></Link>
                    {isLoggedIn ? (
                        <Link to="/profile" className="btn btn-link text-decoration-none text-dark d-flex flex-column align-items-center gap-1 p-1"><User size={20} /><span style={{ fontSize: '10px', fontWeight: 600 }}>Profile</span></Link>
                    ) : (
                        <Link to="/login" className="btn btn-link text-decoration-none text-muted d-flex flex-column align-items-center gap-1 p-1"><LogIn size={20} /><span style={{ fontSize: '10px', fontWeight: 500 }}>Login</span></Link>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default ShopDetailPage;