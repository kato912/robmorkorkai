import React from "react";
import { ArrowUpRight, X } from "lucide-react";

interface ShopGalleryProps {
    displayImages: string[];
    activeImageIndex: number;
    setActiveImageIndex: (idx: number) => void;
    isGalleryOpen: boolean;
    setIsGalleryOpen: (val: boolean) => void;
}

export const ShopGallery: React.FC<ShopGalleryProps> = ({
    displayImages, activeImageIndex, setActiveImageIndex, isGalleryOpen, setIsGalleryOpen
}) => {
    return (
        <>
            {/* Desktop Gallery Strip */}
            <section className="d-none d-lg-block border-bottom border-light-subtle" style={{ backgroundColor: '#fafaf9' }}>
                <div className="container-fluid py-4 mx-auto" style={{ maxWidth: '1250px' }}>
                    <div className="d-flex gap-3 overflow-hidden px-3 px-lg-0">
                        {displayImages.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => { setActiveImageIndex(idx); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                                className="btn p-0 flex-shrink-0 rounded-4 overflow-hidden position-relative gallery-thumb"
                                style={{ width: '260px', height: '140px', border: activeImageIndex === idx ? '3px solid #0c0a09' : '3px solid transparent', opacity: activeImageIndex === idx ? 1 : 0.5 }}
                            >
                                <img src={img} className="w-100 h-100 object-fit-cover" alt={`Gallery ${idx}`} />
                            </button>
                        ))}
                        <button 
                            onClick={() => setIsGalleryOpen(true)} 
                            className="btn rounded-4 d-flex flex-column align-items-center justify-content-center flex-shrink-0 transition-all hover-shadow" 
                            style={{ width: '140px', height: '140px', backgroundColor: '#f5f5f4', color: '#57534e', border: 'none' }}
                        >
                            <span className="fw-bold small mb-1">ดูทั้งหมด</span>
                            <ArrowUpRight size={20} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Full Gallery Modal */}
            {isGalleryOpen && (
                <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark d-flex align-items-center justify-content-center p-4" style={{ zIndex: 1060, backgroundColor: 'rgba(10,10,10,0.95)' }}>
                    <button onClick={() => setIsGalleryOpen(false)} className="btn btn-link position-absolute top-0 end-0 m-4 text-white p-2 bg-white bg-opacity-10 rounded-circle">
                        <X size={24} />
                    </button>
                    <div className="container" style={{ maxWidth: '900px' }}>
                        <div className="row g-3">
                            {displayImages.map((img, idx) => (
                                <div className="col-6" key={idx}>
                                    <button onClick={() => { setActiveImageIndex(idx); setIsGalleryOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="btn p-0 w-100 border-0 overflow-hidden rounded-4" style={{ aspectRatio: '16/9' }}>
                                        <img src={img} className="w-100 h-100 object-fit-cover transition-all hover-scale" alt={`Gallery ${idx}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};